package com.example.springproject.Models;

import java.time.LocalDateTime;

import javax.persistence.Entity;
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
  private String sessionId;
  private String username;
  private LocalDateTime lastAccessed;
}
