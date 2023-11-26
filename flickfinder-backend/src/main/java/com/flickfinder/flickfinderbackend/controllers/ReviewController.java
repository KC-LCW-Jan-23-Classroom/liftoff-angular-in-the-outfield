package com.flickfinder.flickfinderbackend.controllers;



import com.flickfinder.flickfinderbackend.models.dtos.dto.ReviewDto;

import com.flickfinder.flickfinderbackend.services.ReviewServiceDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/reviews")
public class ReviewController {


    private final ReviewServiceDto reviewService;

    public ReviewController(ReviewServiceDto reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("user-reviews")
    public ResponseEntity<List<ReviewDto>> getAllReviews() {
        List<ReviewDto> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }

    @PostMapping
    public ResponseEntity<ReviewDto> addReview(@RequestBody ReviewDto review) {
        ReviewDto savedReview = reviewService.addReview(review);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedReview);
    }
}
