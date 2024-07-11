package com.example.springproject.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.springproject.Models.User;
import com.example.springproject.UserService.UserServiceImpl;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> signup(@RequestBody User user) {
        if (user.getUsername() == null || user.getUsername().isEmpty() || 
            user.getPassword() == null || user.getPassword().isEmpty() ||
            user.getEmail() == null || user.getEmail().isEmpty() ||
            user.getFirstName() == null || user.getFirstName().isEmpty() ||
            user.getLastName() == null || user.getLastName().isEmpty()) {
            return ResponseEntity.badRequest().body("All fields must be provided");
        }
        
        if(userServiceImpl.findByUsername(user.getUsername()) != null){
            return ResponseEntity.badRequest().body("Username already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userServiceImpl.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginUser) {
        if (loginUser.getUsername() == null || loginUser.getUsername().isEmpty() ||
            loginUser.getPassword() == null || loginUser.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Username and password must be provided");
        }

        if (userServiceImpl.verifyUserCredentials(loginUser.getUsername(), loginUser.getPassword())) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    

    @GetMapping("/userinfo")
    public ResponseEntity<?> userInfo(@RequestParam(required = false) String username) {
        if (username == null || username.isEmpty()) {
            return ResponseEntity.badRequest().body("Username parameter is missing");
        }
        User user = userServiceImpl.findByUsername(username);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable Long id) {
        User user = userServiceImpl.findUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        userServiceImpl.deleteUserById(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}
