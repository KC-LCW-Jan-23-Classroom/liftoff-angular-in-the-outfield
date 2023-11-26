
package com.flickfinder.flickfinderbackend.services;

import com.flickfinder.flickfinderbackend.models.GenreResponse;
import com.flickfinder.flickfinderbackend.models.Movie;
import com.flickfinder.flickfinderbackend.models.MovieResponse;
import com.flickfinder.flickfinderbackend.models.data.GenreRepository;
import com.flickfinder.flickfinderbackend.models.dtos.dto.Genre;
import com.flickfinder.flickfinderbackend.services.ApiKeyService;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

// ... (other imports and annotations)

@Service
public class GetGenresService {

    private static GenreRepository genreRepository;
    private static RestTemplate restTemplate;
    private static final String BASE_URL = "https://api.themoviedb.org/3";

    private final ObjectMapper objectMapper; // Declare ObjectMapper

    private String apiKey;




    public GetGenresService(GenreRepository genreRepository, RestTemplate restTemplate, ApiKeyService apiKeyService, ObjectMapper objectMapper) {
        this.genreRepository = genreRepository;
        this.restTemplate = restTemplate;
        this.apiKey = apiKeyService.getApiKey();
        this.objectMapper = objectMapper;
    }


    public List<Genre> fetchGenres() {

        String url = BASE_URL + "/genre/movie/list?language=en&api_key=" + apiKey;

        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);

        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            String responseBody = responseEntity.getBody();
            try {
                GenreResponse genreResponse = objectMapper.readValue(responseBody, GenreResponse.class);
                List<Genre> genreList = genreResponse.getGenres();
                genreRepository.saveAll(genreList);
                return genreList;
            } catch (IOException e) {
                e.printStackTrace();
                // Handle the exception accordingly
            }
        }
        return Collections.emptyList();
    }

    public Genre findGenreByName(String genreName) {
        return genreRepository.findByName(genreName.toString()); // Assuming you have a method like this in GenreRepository
    }
}