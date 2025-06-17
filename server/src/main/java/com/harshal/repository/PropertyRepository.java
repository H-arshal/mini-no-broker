package com.harshal.repository;

import com.harshal.model.Property;
import com.harshal.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends MongoRepository<Property, String> {
    // Optional methods for filtering (we’ll use later)
    List<Property> findByCity(String city);

    List<Property> findByRentBetween(int minRent, int maxRent);

    List<Property> findByType(String type);

    List<Property> findByOwnerEmail(String ownerEmail);


}
