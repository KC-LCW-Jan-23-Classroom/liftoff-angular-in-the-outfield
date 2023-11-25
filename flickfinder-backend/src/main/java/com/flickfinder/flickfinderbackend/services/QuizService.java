package com.flickfinder.flickfinderbackend.services;

import com.flickfinder.flickfinderbackend.models.Movie;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriBuilder;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuizService {
    private final WebClient webClient;
    private final String API_KEY;
    private final MovieService movieService;
    private Integer withRuntimeGte;
    private Integer withRuntimeLte;
    private String primaryReleaseDateGte;
    private String primaryReleaseDateLte;

    public QuizService(WebClient.Builder webClientBuilder, ApiKeyService apiKeyService, MovieService movieService) {
        this.webClient = webClientBuilder.baseUrl("https://api.themoviedb.org/3").build();
        this.API_KEY = apiKeyService.getApiKey();
        this.movieService = movieService;
    }

    public Flux<Movie> getRecommendedMovie(List<String> watchProviders, String genre, String runtime, String timePeriod) {
        return getQuizMovieIds(watchProviders, genre, runtime, timePeriod)
                .flatMapMany(movieIds -> {
                    int randomIndex = generateRandomIndex(movieIds);
                    int randomMovieId = movieIds.get(randomIndex);
                    return movieService.getMovieDetails(Collections.singletonList(randomMovieId));
                });
    }



    private Mono<Boolean> checkMonetizationType(int movieId, List<Integer> watchProviders) {
        ParameterizedTypeReference<Map<String, Object>> responseType = new ParameterizedTypeReference<>() {};

        String movieUrl = String.format("/movie/%d/watch/providers?api_key=%s", movieId, API_KEY);

        return webClient.get()
                .uri(movieUrl)
                .retrieve()
                .bodyToMono(responseType)
                .map(response -> {
                    Map<String, Object> results = (Map<String, Object>) response.get("results");
                    if (results != null) {
                        Map<String, Object> usProviders = (Map<String, Object>) results.get("US");
                        if (usProviders != null) {
                            List<Integer> streamingSources = extractProviderIds(usProviders, "flatrate", "ads", "free");
                            return watchProviders.stream().anyMatch(streamingSources::contains);
                        }
                    }
                    return false;
                });
    }

    private List<Integer> extractProviderIds(Map<String, Object> usProviders, String... categories) {
        List<Integer> streamingSources = new ArrayList<>();
        for (String category : categories) {
            List<Map<String, Object>> providers = (List<Map<String, Object>>) usProviders.get(category);
            if (providers != null) {
                streamingSources.addAll(providers.stream()
                        .map(provider -> (Integer) provider.get("provider_id"))
                        .collect(Collectors.toList()));
            }
        }
        return streamingSources;
    }


    private Mono<List<Integer>> getQuizMovieIds(List<String> watchProviders, String genre, String runtime, String timePeriod) {
        ParameterizedTypeReference<Map<String, Object>> responseType = new ParameterizedTypeReference<>() {};

        String watchProvidersString = this.makeWatchProvidersString(watchProviders);
        this.setRuntimes(runtime);
        this.setReleaseDates(timePeriod);

        return webClient.get()
                .uri(uriBuilder -> {
                    UriBuilder builder = uriBuilder
                            .path("/discover/movie")
                            .queryParam("api_key", API_KEY)
                            .queryParam("include_video", "false")
                            .queryParam("language", "en-US")
                            .queryParam("sort_by", "popularity")
                            .queryParam("include_adult", "false")
                            .queryParam("with_genres", genre)
                            .queryParam("with_watch_providers", watchProvidersString)
                            .queryParam("with_runtime.gte", this.withRuntimeGte)
                            .queryParam("primary_release_date.gte", this.primaryReleaseDateGte)
                            .queryParam("watch_region", "US");

                    if (this.withRuntimeLte != null) {
                        builder.queryParam("with_runtime.lte", this.withRuntimeLte);
                    }

                    if (this.primaryReleaseDateLte != null) {
                        builder.queryParam("primary_release_date.lte", this.primaryReleaseDateLte);
                    }
                    return builder.build();
                })
                .retrieve()
                .bodyToMono(responseType)
                .map(response -> {
                    List<Integer> movieIds = new ArrayList<>();
                    List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");
                    for (Map<String, Object> movie : results) {
                        Integer id = (Integer) movie.get("id");
                        movieIds.add(id);
                    }

                    return movieIds;
                });
    }


    private void setRuntimes(String quizRuntime) {
        if (quizRuntime.equals("90")) {
            this.withRuntimeGte = 0;
            this.withRuntimeLte = 89;
        } else if (quizRuntime.equals("100")) {
            this.withRuntimeGte = 90;
            this.withRuntimeLte = 120;
        } else {
            this.withRuntimeGte = 121;
            this.withRuntimeLte = null;
        }
    }

    private void setReleaseDates(String quizDates) {
        switch (quizDates) {
            case "2020" -> {
                this.primaryReleaseDateGte = "2020-01-01";
                this.primaryReleaseDateLte = null;
            }
            case "2000" -> {
                this.primaryReleaseDateGte = "2000-01-01";
                this.primaryReleaseDateLte = "2019-12-31";
            }
            case "1980" -> {
                this.primaryReleaseDateGte = "1980-01-01";
                this.primaryReleaseDateLte = "1999-12-31";
            }
            case "1960" -> {
                this.primaryReleaseDateGte = "1960-01-01";
                this.primaryReleaseDateLte = "1979-12-31";
            }
            case "1940" -> {
                this.primaryReleaseDateGte = "1940-01-01";
                this.primaryReleaseDateLte = "1959-12-31";
            }
            default -> {
                this.primaryReleaseDateGte = "1920-01-01";
                this.primaryReleaseDateLte = "1939-12-31";
            }
        }
    }

    private String makeWatchProvidersString(List<String> watchProviders) {
        StringBuilder returnString = new StringBuilder();

        for (String provider : watchProviders) {
            if (provider.equals(watchProviders.get(watchProviders.size() - 1))) {
                returnString.append(provider);
            } else {
                returnString.append(provider).append("|");
            }
        }
        return returnString.toString();
    }

    private int generateRandomIndex(List<?> list) {
        if (list == null || list.isEmpty()) {
            throw new IllegalArgumentException("List must be non-null and non-empty");
        }

        Random random = new Random();
        return random.nextInt(list.size());
    }
}
