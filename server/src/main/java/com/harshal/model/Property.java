package com.harshal.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "properties")
public class Property {

    @Id
    private String id;

    private String title;
    private String city;
    private int rent;
    private String type; // e.g., 1BHK, 2BHK, etc.
    private String description;

    private String ownerEmail; // Extracted from token

    // Constructors
    public Property() {}

    public Property(String title, String city, int rent, String type, String description, String ownerEmail) {
        this.title = title;
        this.city = city;
        this.rent = rent;
        this.type = type;
        this.description = description;
        this.ownerEmail = ownerEmail;
    }

    // Getters & Setters

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getRent() {
        return rent;
    }

    public void setRent(int rent) {
        this.rent = rent;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOwnerEmail() {
        return ownerEmail;
    }

    public void setOwnerEmail(String ownerEmail) {
        this.ownerEmail = ownerEmail;
    }
}
