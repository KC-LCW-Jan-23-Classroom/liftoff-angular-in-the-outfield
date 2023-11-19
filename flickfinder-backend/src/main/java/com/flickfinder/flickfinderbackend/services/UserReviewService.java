package com.flickfinder.flickfinderbackend.services;

        import com.flickfinder.flickfinderbackend.models.dtos.dto.ReviewDto;
        import com.flickfinder.flickfinderbackend.models.UserReview;
        import com.flickfinder.flickfinderbackend.models.data.UserReviewRepository;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.stereotype.Service;

        import java.util.List;
        import java.util.stream.Collectors;

@Service
public class UserReviewService {

    private final UserReviewRepository userReviewRepository;

    @Autowired
    public UserReviewService(UserReviewRepository userReviewRepository) {
        this.userReviewRepository = userReviewRepository;
    }

    public List<ReviewDto> getAllUserReviews() {
        List<UserReview> userReviews = (List<UserReview>) userReviewRepository.findAll();
        return userReviews.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public ReviewDto addUserReview(ReviewDto reviewDto) {
        UserReview userReview = convertToEntity(reviewDto);
        UserReview savedReview = userReviewRepository.save(userReview);
        return convertToDto(savedReview);
    }
    private ReviewDto convertToDto(UserReview userReview) {
        ReviewDto reviewDto = new ReviewDto();
        reviewDto.setMovieName(userReview.getMovieName());
        reviewDto.setReviewText(userReview.getReviewText());
        // Set other properties as needed
        return reviewDto;
    }

    private UserReview convertToEntity(ReviewDto reviewDto) {
        UserReview userReview = new UserReview();
        userReview.setMovieName(reviewDto.getMovieName());
        userReview.setReviewText(reviewDto.getReviewText());
        // Set other properties as needed
        return userReview;
    }
}