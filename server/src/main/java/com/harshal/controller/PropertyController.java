package com.harshal.controller;
import com.harshal.dto.UpdatePropertyRequest;
import com.harshal.dto.PropertyRequest;
import com.harshal.model.Property;
import com.harshal.repository.PropertyRepository;
import com.harshal.service.PropertyService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {



    private final PropertyService propertyService;
    private final PropertyRepository propertyRepository;

    public PropertyController(PropertyService propertyService, PropertyRepository propertyRepository) {
        this.propertyService = propertyService;
        this.propertyRepository = propertyRepository;
    }

    @PostMapping
    public ResponseEntity<Property> addProperty(
            @RequestBody PropertyRequest request,
            Authentication authentication // Spring injects this automatically from SecurityContext
    ) {
        String ownerEmail = authentication.getName(); // Extracted from JWT
        Property savedProperty = propertyService.addProperty(request, ownerEmail);
        return ResponseEntity.ok(savedProperty);
    }

    @GetMapping
    public ResponseEntity<List<Property>> getAllProperties(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Integer minRent,
            @RequestParam(required = false) Integer maxRent
    ) {
        List<Property> properties = propertyService.getFilteredProperties(city, type, minRent, maxRent);
        return ResponseEntity.ok(properties);
    }


    @GetMapping("/my")
    public ResponseEntity<List<Property>> getMyProperties(Authentication authentication) {
        String email = authentication.getName();  // Extracted from JWT
        List<Property> properties = propertyRepository.findByOwnerEmail(email);
        return ResponseEntity.ok(properties);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProperty(
            @PathVariable String id,
            @RequestBody UpdatePropertyRequest request
    ) {
        try {
            Property updated = propertyService.updateProperty(id, request);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProperty(
            @PathVariable String id
    ) {
        try {
            propertyService.deleteProperty(id);
            return ResponseEntity.ok("Property deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

}
