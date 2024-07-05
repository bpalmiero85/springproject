package com.example.springproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.springproject.Models.User;    

@SpringBootApplication
@RestController
public class SpringprojectApplication {
    public static void main(String[] args) {
      SpringApplication.run(SpringprojectApplication.class, args);
    }
    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
      User user = new User();
      user.setFirstName("Frederson");
      user.setLastName("Jimson");
      user.setUsername("Frederson85");
      user.setEmail("FredersonIsCool@gmail.com");
      user.setPassword("fred123");

      return String.format("Hello %s %s! Your email is: %s | Your username is: %s | Your password is: %s", user.getFirstName(), user.getLastName(), user.getEmail(), user.getUsername(), user.getPassword());
    }
}
