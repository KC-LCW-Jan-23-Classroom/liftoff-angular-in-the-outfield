package com.flickfinder.flickfinderbackend.services;
import com.flickfinder.flickfinderbackend.controllers.UserAuthenticationController;
import com.flickfinder.flickfinderbackend.models.*;
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

    private final UserMovieListService userMovieListService;

    public MovieService(WebClient.Builder webClientBuilder, ApiKeyService apiKeyService, UserMovieListService userMovieListService) {
        this.webClient = webClientBuilder.baseUrl("https://api.themoviedb.org/3").build();
        this.API_KEY = apiKeyService.getApiKey();
        this.userMovieListService = userMovieListService;
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

                                List<String> streamingSources = new ArrayList<>();

                                Map<String, Object> providers = (Map<String, Object>) movieResponse.get("watch/providers");
                                if (providers != null) {
                                    Map<String, Object> results = (Map<String, Object>) providers.get("results");
                                    if (results != null) {
                                        Map<String, Object> usProviders = (Map<String, Object>) results.get("US");
                                        if (usProviders != null) {
                                            List<Map<String, Object>> flatrate = (List<Map<String, Object>>) usProviders.get("flatrate");
                                            if (flatrate != null) {
                                                for (Map<String, Object> source : flatrate) {
                                                    String logoPath = (String) source.get("logo_path");
                                                    String logoUrl = getLogoPath(logoPath);
                                                    streamingSources.add(logoUrl);
                                                }
                                            }
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

                                Movie returnedMovie = new Movie(
                                        (String) movieResponse.get("title"),
                                        (int) movieResponse.get("id"),
                                        List.of(genre),
                                        releaseYear,
                                        (int) movieResponse.get("runtime"),
                                        posterPath,
                                        (String) movieResponse.get("overview"),
                                        streamingSources.isEmpty() ? null : streamingSources,
                                        directorAndCast.getDirector(),
                                        directorAndCast.getCast()
                                );
                                if (UserAuthenticationController.logInService.isLoggedIn() == true) {
                                    int currentUserId = UserAuthenticationController.logInService.getCurrentUser().getId();
                                    List<WatchedMovie> watchedMovies = userMovieListService.getWatchedMoviesByUser(currentUserId);
                                    List<SavedMovie> savedMovies = userMovieListService.getSavedMoviesByUser(currentUserId);
                                    for (WatchedMovie movie : watchedMovies) {
                                        if (movie.getApiMovieId() == returnedMovie.getId()) {
                                            returnedMovie.setWatched(true);
                                        }
                                    }
                                    for (SavedMovie movie : savedMovies) {
                                        if (movie.getApiMovieId() == returnedMovie.getId()) {
                                            returnedMovie.setSaved(true);
                                        }
                                    }
                                }

                                return returnedMovie;
                            });
                });
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

    private List<Integer> extractMovieIdsFromResponse(Object response) {
        List<Integer> movieIds = new ArrayList<>();

        if (response instanceof List) {
            List<Map<String, Object>> movieList = (List<Map<String, Object>>) response;
            for (Map<String, Object> movie : movieList) {
                if (movie.containsKey("id")) {
                    Integer movieId = (Integer) movie.get("id");
                    movieIds.add(movieId);
                }
            }
        }

        return movieIds;
    }

    public Flux<Movie> getMoviesByGenre(int genreId, int page) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/discover/movie")
                        .queryParam("api_key", API_KEY)
                        .queryParam("with_genres", genreId)
                        .queryParam("language", "en-US")
                        .queryParam("page", page)
                        .build())
                .retrieve()
                .bodyToMono(Object.class) // Assumes response in JSON format
                .flatMapMany(response -> {
                    List<Integer> movieIds = extractMovieIdsFromResponse(response); // Extract movie IDs from the response

                    // Fetch movie details based on movie IDs for the given genre
                    return getMovieDetails(movieIds);
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



