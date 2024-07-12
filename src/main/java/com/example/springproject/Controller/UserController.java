package com.example.springproject.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.springproject.Models.User;
import com.example.springproject.UserService.SessionTrackingService;
import com.example.springproject.UserService.UserServiceImpl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SessionTrackingService sessionTrackingService;

    @PostMapping("/register")
    public ResponseEntity<String> signup(HttpServletRequest request, @RequestBody User user) {
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

       
        HttpSession session = request.getSession(true);
        session.setAttribute("username", user.getUsername());
        sessionTrackingService.addSession(session.getId(), user.getUsername());
        logger.info("User registered and logged in: {}", user.getUsername());

        return ResponseEntity.ok("User registered and logged in successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(HttpServletRequest request, @RequestBody User loginUser) {
        if (loginUser.getUsername() == null || loginUser.getUsername().isEmpty() ||
            loginUser.getPassword() == null || loginUser.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Username and password must be provided");
        }

        if (userServiceImpl.verifyUserCredentials(loginUser.getUsername(), loginUser.getPassword())) {
            HttpSession session = request.getSession(true);
            session.setAttribute("username", loginUser.getUsername());
            sessionTrackingService.addSession(session.getId(), loginUser.getUsername());
            logger.info("User logged in: {}", loginUser.getUsername());
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            String username = (String) session.getAttribute("username");
            sessionTrackingService.removeSession(session.getId());
            session.invalidate();
            logger.info("User logged out: {}", username);
        }
        return ResponseEntity.ok("Logged out");
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

    @GetMapping("/active-users")
    public ResponseEntity<Integer> getActiveUsers(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            String username = (String) session.getAttribute("username");
            logger.info("Fetch active user: username = {}", username);
        }
        int activeUsers = sessionTrackingService.getActiveSessions();
        logger.info("Active users count: {}", activeUsers);
        return ResponseEntity.ok(activeUsers);
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
