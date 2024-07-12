package com.example.springproject.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springproject.Models.UserSession;

public interface UserSessionRepository extends JpaRepository<UserSession, String> {
  
}
