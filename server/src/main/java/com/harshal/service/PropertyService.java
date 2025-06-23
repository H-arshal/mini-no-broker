package com.harshal.service;

import com.harshal.dto.PropertyRequest;
import com.harshal.model.Property;
import com.harshal.repository.PropertyRepository;
import org.springframework.stereotype.Service;
import com.harshal.dto.UpdatePropertyRequest;
import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;

    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public Property addProperty(PropertyRequest request, String ownerEmail) {
        Property property = new Property(
                request.getTitle(),
                request.getCity(),
                request.getRent(),
                request.getType(),
                request.getDescription(),
                request.getImageUrls(),
                ownerEmail
        );
//        property.setImageUrls(request.getImageUrls());
        return propertyRepository.save(property);
    }


    public List<Property> getFilteredProperties(String city, String type, Integer minRent, Integer maxRent) {
        List<Property> all = propertyRepository.findAll();

        return all.stream()
                .filter(p -> city == null || p.getCity().toLowerCase().contains(city.toLowerCase()))
                .filter(p -> type == null || p.getType().toLowerCase().contains(type.toLowerCase()))
                .filter(p -> minRent == null || p.getRent() >= minRent)
                .filter(p -> maxRent == null || p.getRent() <= maxRent)
                .collect(Collectors.toList());
    }
    public Property updateProperty(String id, UpdatePropertyRequest request) throws Exception {
        Optional<Property> optionalProperty = propertyRepository.findById(id);

        if (optionalProperty.isEmpty()) {
            throw new Exception("Property not found");
        }

        Property property = optionalProperty.get();

        // 👇 Allow updates regardless of ownerEmail
        if (request.getTitle() != null) property.setTitle(request.getTitle());
        if (request.getCity() != null) property.setCity(request.getCity());
        if (request.getRent() != null) property.setRent(request.getRent());
        if (request.getType() != null) property.setType(request.getType());
        if (request.getDescription() != null) property.setDescription(request.getDescription());

        return propertyRepository.save(property);
    }
    public void deleteProperty(String id) throws Exception {
        Optional<Property> optionalProperty = propertyRepository.findById(id);

        if (optionalProperty.isEmpty()) {
            throw new Exception("Property not found");
        }

        Property property = optionalProperty.get();

        // 👇 Skip ownership check
        propertyRepository.deleteById(id);
    }
}
