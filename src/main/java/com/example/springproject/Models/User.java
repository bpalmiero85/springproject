package com.example.springproject.Models;

import lombok.Data;

@Data
public class User {
  private String firstName;
  private String lastName;
  private String username;
  private String email; 
  private String password;
}
