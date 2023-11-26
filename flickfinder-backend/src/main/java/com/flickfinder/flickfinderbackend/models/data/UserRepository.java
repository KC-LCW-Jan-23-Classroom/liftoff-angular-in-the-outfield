package com.flickfinder.flickfinderbackend.models.data;

import com.flickfinder.flickfinderbackend.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    User findByEmail(String email);

    Optional<User> findById(Long userId);
}
