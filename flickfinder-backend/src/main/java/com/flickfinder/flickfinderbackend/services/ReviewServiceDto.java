package com.flickfinder.flickfinderbackend.services;

import com.flickfinder.flickfinderbackend.models.UserReview;
import com.flickfinder.flickfinderbackend.models.data.UserReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flickfinder.flickfinderbackend.models.dtos.dto.ReviewDto;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceDto {

    private final UserReviewRepository userReviewRepository;

    @Autowired
    public ReviewServiceDto(UserReviewRepository userReviewRepository) {
        this.userReviewRepository = userReviewRepository;
    }


    public List<UserReview> getAllUserReviews() {
        return (List<UserReview>) userReviewRepository.findAll();
    }

    private UserReview convertToEntity(ReviewDto reviewDto) {
        UserReview userReview = new UserReview();
        userReview.setMovieName(reviewDto.getMovieName());
        userReview.setReviewText(reviewDto.getReviewText());
        userReview.setId(1L);
        // Set other properties as needed
        return userReview;
    }

    public ReviewDto addReview(ReviewDto reviewDto) {
        UserReview userReview = convertToEntity(reviewDto);
        UserReview savedReview = userReviewRepository.save(userReview);

        return convertToDto(savedReview);
    }

    private ReviewDto convertToDto(UserReview savedReview) {
        ReviewDto reviewDto = new ReviewDto();
        reviewDto.setMovieName(savedReview.getMovieName());
        reviewDto.setReviewText(savedReview.getReviewText());
        return reviewDto;
    }

    public List<ReviewDto> getAllReviews() {
        List<UserReview> userReviews = (List<UserReview>) userReviewRepository.findAll();
        return userReviews.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
}

