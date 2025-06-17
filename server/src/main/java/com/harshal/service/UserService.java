package com.harshal.service;

import com.harshal.config.JwtUtil;
import com.harshal.dto.RegisterRequest;
import com.harshal.model.User;
import com.harshal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.harshal.dto.LoginRequest;
@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder(); // You can also @Bean this later if needed
    }

    public String registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return "User already exists with this email";
        }

        String hashedPassword = passwordEncoder.encode(request.getPassword());

        User user = new User(request.getName(), request.getEmail(), hashedPassword);
        userRepository.save(user);

        return "User registered successfully";
    }

    public String loginUser(LoginRequest request) {
        // 1. Check if user exists
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null) {
            return "Invalid email or password";
        }

        // 2. Match password
        boolean isPasswordMatch = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (!isPasswordMatch) {
            return "Invalid email or password";
        }

        String token = jwtUtil.generateToken(user.getEmail());

        // 3. Placeholder for JWT (next step)
        return token;
    }

}
