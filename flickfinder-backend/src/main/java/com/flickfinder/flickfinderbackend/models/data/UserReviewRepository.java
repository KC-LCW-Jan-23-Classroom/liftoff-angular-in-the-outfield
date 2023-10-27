package com.flickfinder.flickfinderbackend.models.data;

import com.flickfinder.flickfinderbackend.models.UserReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface UserReviewRepository extends JpaRepository<UserReview, Integer> {
}
