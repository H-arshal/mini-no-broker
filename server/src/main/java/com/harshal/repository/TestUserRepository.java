package com.harshal.repository;

import com.harshal.model.TestUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TestUserRepository extends MongoRepository<TestUser, String> {
}
