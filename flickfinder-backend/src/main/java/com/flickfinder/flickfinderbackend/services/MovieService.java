package com.flickfinder.flickfinderbackend.services;
import com.flickfinder.flickfinderbackend.models.DirectorAndCastResponse;
import com.flickfinder.flickfinderbackend.models.Movie;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MovieService {

    private final WebClient webClient;
    private final String API_KEY;

    public MovieService(WebClient.Builder webClientBuilder, ApiKeyService apiKeyService) {
        this.webClient = webClientBuilder.baseUrl("https://api.themoviedb.org/3").build();
        this.API_KEY = apiKeyService.getApiKey();
    }

    public Flux<Movie> getTrendingMovies() {
        return getTrendingMoviesIds()
                .flatMapMany(movieIds -> getMovieDetails(Arrays.asList(movieIds)));
    }


    public Flux<Movie> getMovieDetails(List<Integer> movieIds) {
        ParameterizedTypeReference<Map<String, Object>> responseType = new ParameterizedTypeReference<>() {};

        return Flux.fromIterable(movieIds)
                .flatMap(movieId -> {
                    Mono<DirectorAndCastResponse> directorAndCastMono = getDirectorAndCast(movieId);

                    String movieUrl = String.format("/movie/%d?append_to_response=watch/providers&language=en-US&api_key=%s&include_adult=false", movieId, API_KEY);

                    return webClient.get()
                            .uri(movieUrl)
                            .retrieve()
                            .bodyToMono(responseType)
                            .zipWith(directorAndCastMono)
                            .map(tuple -> {
                                Map<String, Object> movieResponse = tuple.getT1();
                                DirectorAndCastResponse directorAndCast = tuple.getT2();

                                List<String> subscription = new ArrayList<>();
                                List<String> free = new ArrayList<>();
                                List<String> ads = new ArrayList<>();
                                List<String> rent = new ArrayList<>();
                                List<String> buy = new ArrayList<>();

                                Map<String, Object> providers = (Map<String, Object>) movieResponse.get("watch/providers");
                                if (providers != null) {
                                    Map<String, Object> results = (Map<String, Object>) providers.get("results");
                                    if (results != null) {
                                        Map<String, Object> usProviders = (Map<String, Object>) results.get("US");
                                        if (usProviders != null) {
                                            subscription = extractProviderInfo(usProviders, "flatrate");
                                            ads = extractProviderInfo(usProviders, "ads");
                                            free = extractProviderInfo(usProviders, "free");
                                            rent = extractProviderInfo(usProviders, "rent");
                                            buy = extractProviderInfo(usProviders, "buy");
                                        }
                                    }
                                }

                                String posterPath = this.getPosterPath((String) movieResponse.get("poster_path"));

                                List<Map<String, Object>> genres = (List<Map<String, Object>>) movieResponse.get("genres");
                                String genre = genres.stream().map(g -> (String) g.get("name")).collect(Collectors.joining(", "));
                                int releaseYear = 0; // Default value if release_date is missing or empty
                                Object releaseDateObj = movieResponse.get("release_date");
                                if (releaseDateObj != null && releaseDateObj instanceof String) {
                                    String releaseDate = (String) releaseDateObj;
                                    if (!releaseDate.isEmpty()) {
                                        // Ensure that releaseDate is not empty before extracting the year
                                        releaseYear = Integer.parseInt(releaseDate.substring(0, 4));
                                    }
                                }

                                return new Movie(
                                        (String) movieResponse.get("title"),
                                        (int) movieResponse.get("id"),
                                        List.of(genre),
                                        releaseYear,
                                        (int) movieResponse.get("runtime"),
                                        posterPath,
                                        (String) movieResponse.get("overview"),
                                        subscription.isEmpty() ? null : subscription,
                                        free.isEmpty() ? null : free,
                                        ads.isEmpty() ? null : ads,
                                        rent.isEmpty() ? null : rent,
                                        buy.isEmpty() ? null : buy,
                                        directorAndCast.getDirector(),
                                        directorAndCast.getCast()
                                );
                            });
                });
    }

    private List<String> extractProviderInfo(Map<String, Object> usProviders, String providerType) {
        List<String> providerInfo = new ArrayList<>();

        List<Map<String, Object>> providerIds = (List<Map<String, Object>>) usProviders.get(providerType);
        if (providerIds != null) {
            for (Map<String, Object> source : providerIds) {
                String logoPath = (String) source.get("logo_path");
                String logoUrl = getLogoPath(logoPath);
                providerInfo.add(logoUrl);
            }
        }

        return providerInfo;
    }

    private Mono<Integer[]> getTrendingMoviesIds() {
        ParameterizedTypeReference<Map<String, Object>> responseType = new ParameterizedTypeReference<>() {};
        return webClient.get()
                .uri("/trending/movie/day?language=en-US&page=1&total_results=20&api_key={apiKey}&include_adult=false", this.API_KEY)
                .retrieve()
                .bodyToMono(responseType)
                .map(response -> {
                    List<Integer> movieIds = new ArrayList<>();
                    List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");
                    for (Map<String, Object> movie : results) {
                        Integer id = (Integer) movie.get("id");
                        movieIds.add(id);
                    }

                    return movieIds.toArray(new Integer[0]);
                });

    }

    private String getPosterPath (String posterPath) {
        if (posterPath != null) {
            return "https://image.tmdb.org/t/p/w500" + posterPath;
        }

        return null;
    }

    private String getLogoPath (String logoPath) {
        if (logoPath != null) {
            return "https://image.tmdb.org/t/p/original" + logoPath;
        }

        return null;
    }

    private Mono<DirectorAndCastResponse> getDirectorAndCast(int movieId) {
        return webClient
                .get()
                .uri("/movie/{movieId}/credits?api_key={apiKey}", movieId, this.API_KEY)
                .retrieve()
                .bodyToMono(Object.class)
                .map(response -> {
                    String director = "";
                    List<String> cast = new ArrayList<>();

                    if (response instanceof Map) {
                        Map<String, Object> responseData = (Map<String, Object>) response;

                        // Extract director
                        List<Map<String, Object>> crew = (List<Map<String, Object>>) responseData.get("crew");
                        for (Map<String, Object> member : crew) {
                            if ("Director".equals(member.get("job"))) {
                                director = (String) member.get("name");
                                break;
                            }
                        }

                        // Extract cast
                        List<Map<String, Object>> castData = (List<Map<String, Object>>) responseData.get("cast");
                        for (int i = 0; i < Math.min(5, castData.size()); i++) {
                            cast.add((String) castData.get(i).get("name"));
                        }
                    }

                    return new DirectorAndCastResponse(director, cast);
                });
    }
}



