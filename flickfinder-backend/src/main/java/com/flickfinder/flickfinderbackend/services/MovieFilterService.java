package com.flickfinder.flickfinderbackend.services;

import com.flickfinder.flickfinderbackend.models.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@Service
public class MovieFilterService {


    private final WebClient webClient;
    private final String APIKEY;



    public MovieFilterService(WebClient.Builder webClientBuilder, ApiKeyService apiKeyService) {
        this.webClient = webClientBuilder.baseUrl("https://api.themoviedb.org/3").build();
        this.APIKEY = apiKeyService.getApiKey();
    }

    public Flux<Movie> getMoviesByGenre(String genre) {
        System.out.println(genre);
        return webClient.get()
                .uri("/discover/movie?with_genres={genre}&api_key={apiKey}", genre, APIKEY)
                .retrieve()
                .bodyToFlux(Movie.class);
    }

    public Flux<Movie> getMoviesByDecade(int decade) {
        int startYear = decade * 10;
        int endYear = startYear + 9;
        return webClient.get()
                .uri("/discover/movie?primary_release_date.gte={startYear}-01-01&primary_release_date.lte={endYear}-12-31&api_key={apiKey}",
                        startYear, endYear, APIKEY)
                .retrieve()
                .bodyToFlux(Movie.class);
    }

    public Flux<Movie> getMoviesByStreamingService(String streamingService) {
        // Assuming the streaming service is a query parameter in the API endpoint
        return webClient.get()
                .uri("/discover/movie?with_watch_providers={streamingService}&api_key={apiKey}",
                        streamingService, APIKEY)
                .retrieve()
                .bodyToFlux(Movie.class);
    }

}