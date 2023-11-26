package com.flickfinder.flickfinderbackend.models.data;

import com.flickfinder.flickfinderbackend.models.UserReview;
import com.flickfinder.flickfinderbackend.models.WatchedMovie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserReviewRepository extends JpaRepository<UserReview, Integer> {
}
