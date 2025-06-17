package com.harshal.controller;

import com.harshal.dto.LoginRequest;
import com.harshal.dto.RegisterRequest;
import com.harshal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        String result = userService.registerUser(request);

        if (result.equals("User already exists with this email")) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", result));
        }

        return ResponseEntity
                .ok(Map.of("message", result));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String result = userService.loginUser(request);

        if (result.equals("Invalid email or password")) {
            return ResponseEntity
                    .status(401)
                    .body(Map.of("message", result));
        }

        // if result is JWT token
        Map<String, String> response = new HashMap<>();
        response.put("token", result);
        return ResponseEntity.ok(response);
    }
}
