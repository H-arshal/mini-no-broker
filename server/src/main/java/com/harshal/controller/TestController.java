package com.harshal.controller;

import com.harshal.model.TestUser;
import com.harshal.repository.TestUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private TestUserRepository testUserRepository;

    @GetMapping
    public TestUser testInsert() {
        TestUser user = new TestUser("Harshal Moon", "harshal@example.com");
        return testUserRepository.save(user);
    }
}
