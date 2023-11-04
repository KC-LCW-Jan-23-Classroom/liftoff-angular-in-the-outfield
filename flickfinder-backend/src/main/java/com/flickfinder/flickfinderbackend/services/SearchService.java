package com.flickfinder.flickfinderbackend.services;

import com.flickfinder.flickfinderbackend.models.Movie;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class SearchService {
    private final WebClient webClient;
    private final String API_KEY;
    private final MovieService movieService;

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
}
