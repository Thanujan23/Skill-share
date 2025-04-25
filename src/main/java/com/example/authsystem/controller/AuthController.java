package com.example.authsystem.controller;

import com.example.authsystem.model.User;
import com.example.authsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Validate input
            if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Username is required");
                return ResponseEntity.badRequest().body(response);
            }

            if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Email is required");
                return ResponseEntity.badRequest().body(response);
            }

            if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Password is required");
                return ResponseEntity.badRequest().body(response);
            }

            // Check if username exists
            if (userRepository.existsByUsername(user.getUsername())) {
                response.put("success", false);
                response.put("message", "Username is already taken!");
                return ResponseEntity.badRequest().body(response);
            }

            // Check if email exists
            if (userRepository.existsByEmail(user.getEmail())) {
                response.put("success", false);
                response.put("message", "Email is already in use!");
                return ResponseEntity.badRequest().body(response);
            }

            // Encode password and save user
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(user);
            
            // Remove password from response
            savedUser.setPassword(null);
            
            response.put("success", true);
            response.put("message", "User registered successfully!");
            response.put("user", savedUser);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "An error occurred during registration");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody User loginRequest) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            if (loginRequest.getUsername() == null || loginRequest.getPassword() == null) {
                response.put("success", false);
                response.put("message", "Username and password are required");
                return ResponseEntity.badRequest().body(response);
            }

            User user = userRepository.findByUsername(loginRequest.getUsername())
                    .orElse(null);

            if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                response.put("success", false);
                response.put("message", "Invalid username or password");
                return ResponseEntity.badRequest().body(response);
            }

            // Remove password from response
            user.setPassword(null);
            
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("user", user);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "An error occurred during login");
            return ResponseEntity.internalServerError().body(response);
        }
    }
} 