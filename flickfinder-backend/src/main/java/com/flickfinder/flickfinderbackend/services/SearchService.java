package com.flickfinder.flickfinderbackend.services;

import com.flickfinder.flickfinderbackend.models.Movie;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class SearchService {
    private final WebClient webClient;
    private final String API_KEY;
    private final MovieService movieService;
    private Integer[] peopleMovieIds;

    private int totalPages = 0;

    public SearchService(WebClient.Builder webClientBuilder, ApiKeyService apiKeyService, MovieService movieService) {
        this.webClient = webClientBuilder.baseUrl("https://api.themoviedb.org/3").build();
        this.API_KEY = apiKeyService.getApiKey();
        this.movieService = movieService;
    }

    public Flux<Movie> searchMoviesByTitle(String searchTerm, int page) {
        if (this.totalPages != 0 && page > this.totalPages) {
            return null;
        }
        return getMovieIds(searchTerm, page)
                .flatMapMany(movieIds -> this.movieService.getMovieDetails(Arrays.asList(movieIds)));
    }

    private Mono<Integer[]> getMovieIds(String searchTerm, int page) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search/movie")
                        .queryParam("api_key", API_KEY)
                        .queryParam("query", searchTerm)
                        .queryParam("language", "en-US")
                        .queryParam("page", Integer.toString(page))
                        .queryParam("include_adult", "false")
                        .build()
                )
                .retrieve()
                .bodyToMono(Object.class) // Parse as a generic JSON object
                .flatMap(response -> {
                    if (response instanceof Map) {
                        Map<String, Object> responseMap = (Map<String, Object>) response;
                        if (responseMap.containsKey("total_pages")) {
                            totalPages = (Integer) responseMap.get("total_pages");
                        }
                        if (responseMap.containsKey("results")) {
                            List<Object> results = (List<Object>) responseMap.get("results");
                            return Flux.fromIterable(results)
                                    .filter(result -> result instanceof Map)
                                    .map(result -> (Map<String, Object>) result)
                                    .filter(resultMap -> resultMap.containsKey("id"))
                                    .map(resultMap -> (Integer) resultMap.get("id"))
                                    .collectList()
                                    .map(idsList -> idsList.toArray(new Integer[0]));
                        }
                    }
                    return Mono.error(new RuntimeException("Failed to parse movie IDs from response."));
                });
    }

    private Mono<Integer[]> getAllPeopleIds(String searchTerm) {
        AtomicInteger page = new AtomicInteger(1); // Start from page 1
        List<Integer> allPeopleIds = new ArrayList<>();

        return getPeopleIdsRecursive(searchTerm, page, allPeopleIds);
    }

    private Mono<Integer[]> getPeopleIdsRecursive(String searchTerm, AtomicInteger page, List<Integer> allPeopleIds) {
        return getPeopleIdsSinglePage(searchTerm, page.get())
                .flatMap(ids -> {
                    allPeopleIds.addAll(Arrays.asList(ids));

                    if (page.incrementAndGet() <= totalPages) {
                        // If there are more pages, continue fetching
                        return getPeopleIdsRecursive(searchTerm, page, allPeopleIds);
                    } else {
                        // All pages have been processed, return the combined result
                        return Mono.just(allPeopleIds.toArray(new Integer[0]));
                    }
                });
    }

    private Mono<Integer[]> getPeopleIdsSinglePage(String searchTerm, int page) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search/person")
                        .queryParam("api_key", API_KEY)
                        .queryParam("query", searchTerm)
                        .queryParam("Language", "en-US")
                        .queryParam("page", Integer.toString(page))
                        .queryParam("include_adult", "false")
                        .build()
                )
                .retrieve()
                .bodyToMono(Object.class)
                .flatMap(response -> {
                    if (response instanceof Map) {
                        Map<String, Object> responseMap = (Map<String, Object>) response;

                        if (responseMap.containsKey("total_pages")) {
                            totalPages = (Integer) responseMap.get("total_pages");
                        }
                        if (responseMap.containsKey("results")) {
                            List<Object> results = (List<Object>) responseMap.get("results");
                            return Flux.fromIterable(results)
                                    .filter(result -> result instanceof Map)
                                    .map(result -> (Map<String, Object>) result)
                                    .filter(resultMap -> resultMap.containsKey("id"))
                                    .map(resultMap -> (Integer) resultMap.get("id"))
                                    .collectList()
                                    .map(idsList -> idsList.toArray(new Integer[0]));
                        }
                    }
                    return Mono.error(new RuntimeException("Failed to parse movie IDs from response."));
                });
    }

    private Mono<Integer[]> getMovieIdsForPerson(int personId) {
        return webClient.get()
                .uri("/person/{personId}/movie_credits?api_key={apiKey}", personId, this.API_KEY)
                .retrieve()
                .bodyToMono(Object.class)
                .flatMap(response -> {
                    if (response instanceof Map) {
                        Map<String, Object> responseMap = (Map<String, Object>) response;
                        List<Map<String, Object>> cast = (List<Map<String, Object>>) responseMap.get("cast");
                        List<Map<String, Object>> crew = (List<Map<String, Object>>) responseMap.get("crew");

                        List<Integer> castMovieIds = cast.stream()
                                .map(entry -> (int) entry.get("id"))
                                .collect(Collectors.toList());

                        List<Integer> crewMovieIds = crew.stream()
                                .map(entry -> (int) entry.get("id"))
                                .collect(Collectors.toList());

                        List<Integer> allMovieIds = new ArrayList<>(castMovieIds);
                        allMovieIds.addAll(crewMovieIds);

                        Integer[] movieIdsArray = allMovieIds.toArray(new Integer[0]);
                        return Mono.just(movieIdsArray);
                    }
                    return Mono.error(new RuntimeException("Failed to parse movie IDs for the person."));
                });
    }

    private Mono<Integer[]> getAllMovieIdsForPeople(Mono<Integer[]> peopleIdsMono) {
        return peopleIdsMono
                .flatMapMany(Flux::fromArray) // Convert the Integer[] into a Flux of person IDs
                .flatMap(this::getMovieIdsForPerson) // Retrieve movie IDs for each person
                .collectList()
                .map(list -> {
                    List<Integer> allMovieIds = list
                            .stream()
                            .map(Arrays::asList)
                            .flatMap(List::stream) // Flatten the list of lists
                            .collect(Collectors.toList());

                    return allMovieIds.toArray(new Integer[0]);
                });
    }




    private Mono<Integer[]> loadMovieIdsInBatches(String searchTerm) {
        return getAllPeopleIds(searchTerm)
                .flatMapMany(Flux::fromArray)
                .buffer(20) // Buffer the person IDs into batches of 20
                .flatMap(batch -> {
                    Integer[] batchArray = batch.toArray(new Integer[0]);
                    return getAllMovieIdsForPeople(Mono.just(batchArray));
                })
                .collectList()
                .flatMap(list -> {
                    Integer[] result = list.stream()
                            .flatMap(Arrays::stream)
                            .toArray(Integer[]::new);
                    return Mono.just(result);
                });
    }


    public Flux<Movie> searchMoviesByPerson(String searchTerm) {
        return loadMovieIdsInBatches(searchTerm)
                .flatMapMany(movieIds -> {
                    peopleMovieIds = movieIds;
                    return displayMore(0);
                });
    }


    public Flux<Movie> displayMore(int index) {
        if (index > peopleMovieIds.length) {
            return null;
        }
        int end = index + 20;

        if (end > peopleMovieIds.length) {
            end = peopleMovieIds.length;
        }

        Integer[] nextMovieIds = Arrays.copyOfRange(peopleMovieIds, index, end);

        return this.movieService.getMovieDetails(Arrays.asList(nextMovieIds));
    }

}
