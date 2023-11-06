//import java.util.List;
//
//
//import org.springframework.stereotype.Controller;
//
//
//@Controller
//
//public class MovieController {
//    private List<Movie> movies;
//
//    public MovieController(List<Movie> movies) {
//        this.movies = movies;
//    }
//
//    public List<Movie> filterMovies(String genre, int startYear, int endYear, String streamingService) {
//        List<Movie> filteredMovies = MovieFilter.filterByGenre(movies, genre);
//        filteredMovies = MovieFilter.filterByDecade(filteredMovies, startYear, endYear);
//        filteredMovies = MovieFilter.filterByStreamingService(filteredMovies, streamingService);
//        return filteredMovies;
//    }
//}