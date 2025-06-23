package com.harshal.dto;

import java.util.List;

public class PropertyRequest {

    private String title;
        private String city;
    private int rent;
    private String type;
    private String description;
    private List<String> imageUrls;
    public PropertyRequest() {}

    public PropertyRequest(String title, String city, int rent, String type, String description, List<String> imageUrls) {
        this.title = title;
        this.city = city;
        this.rent = rent;
        this.type = type;
        this.description = description;
        this.imageUrls = imageUrls;
    }


// Getters and Setters

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
    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }
}
