package com.flickfinder.flickfinderbackend.services;

import com.flickfinder.flickfinderbackend.models.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@Service
public class MovieFilterService {


    private final WebClient webClient;
    private final ApiKeyService apiKeyService;


    @Autowired
    public MovieFilterService(WebClient.Builder webClientBuilder, ApiKeyService apiKeyService) {
        this.webClient = webClientBuilder.baseUrl("https://api.watchmode.com/v1").build();
        this.apiKeyService = apiKeyService;
    }

    public Flux<Movie> getMoviesByGenre(String genre) {
        String apiKey = apiKeyService.getApiKey();
        return webClient.get()
                .uri("/movies?genres={genre}&apiKey={apiKey}", genre, apiKey)
                .retrieve()
                .bodyToFlux(Movie.class);
    }

    public Flux<Movie> getMoviesByYear(int year) {
        String apiKey = apiKeyService.getApiKey();
        return webClient.get()
                .uri("/movies?release_year={year}&apiKey={apiKey}", year, apiKey)
                .retrieve()
                .bodyToFlux(Movie.class);
    }

    public Flux<Movie> getMoviesByStreamingService(String streamingService) {
        String apiKey = apiKeyService.getApiKey();
        return webClient.get()
                .uri("/movies?streaming_service={streamingService}&apiKey={apiKey}", streamingService, apiKey)
                .retrieve()
                .bodyToFlux(Movie.class);
    }


}