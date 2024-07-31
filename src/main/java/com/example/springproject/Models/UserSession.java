package com.example.springproject.Models;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entity
public class UserSession {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private String sessionId;

  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userId;
  
  private LocalDateTime lastAccessed;
}
