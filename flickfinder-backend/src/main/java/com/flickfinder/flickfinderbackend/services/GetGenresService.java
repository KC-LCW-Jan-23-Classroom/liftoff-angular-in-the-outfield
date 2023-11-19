
package com.flickfinder.flickfinderbackend.services;

import com.flickfinder.flickfinderbackend.models.data.GenreRepository;
import com.flickfinder.flickfinderbackend.models.dtos.dto.Genre;

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

    public GetGenresService(GenreRepository genreRepository, RestTemplate restTemplate) {
        this.genreRepository = genreRepository;
        this.restTemplate = restTemplate;
    }


    public static List<Genre> fetchGenres() {
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(BASE_URL + "/genre/movie/list?language=en", String.class);

        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            String responseBody = responseEntity.getBody();
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                // Map the JSON array in the response body to an array of Genre objects
                Genre[] genres = objectMapper.readValue(responseBody, Genre[].class);
                List<Genre> genreList = Arrays.asList(genres);
                genreRepository.saveAll(genreList);
                return genreList;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return Collections.emptyList(); // Return an empty list in case of failure
    }
}