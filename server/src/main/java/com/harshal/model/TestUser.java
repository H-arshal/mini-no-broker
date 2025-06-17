package com.harshal.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "test_users")
public class TestUser {

    @Id
    private String id;
    private String name;
    private String email;

    // Default constructor
    public TestUser() {}

    // Parameterized constructor
    public TestUser(String name, String email) {
        this.name = name;
        this.email = email;
    }

    // Getters & setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
