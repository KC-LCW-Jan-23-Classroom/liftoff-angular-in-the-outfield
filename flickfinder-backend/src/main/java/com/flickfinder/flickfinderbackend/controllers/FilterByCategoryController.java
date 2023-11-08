//import java.util.List;
//
//
//import com.flickfinder.flickfinderbackend.models.Movie;
//import com.flickfinder.flickfinderbackend.services.MovieFilterService;
//import org.springframework.stereotype.Controller;
//
//
//
//@Controller
//
//public class FilterByCategoryController {
//    private List<Movie> movies;
//
//    public FilterByCategoryController(List<Movie> movies) {
//        this.movies = movies;
//    }
//
//    public List<Movie> filterMovies(String genre, int startYear, int endYear, String streamingService) {
//        List<Movie> filteredMovies = MovieFilterService.filterByGenre(movies, genre);
//        filteredMovies = MovieFilterService.filterByDecade(filteredMovies, startYear, endYear);
//        filteredMovies = MovieFilterService.filterByStreamingService(filteredMovies, streamingService);
//        return filteredMovies;
//    }
//}