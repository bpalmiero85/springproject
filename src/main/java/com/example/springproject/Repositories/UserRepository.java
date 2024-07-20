package com.example.springproject.Repositories;

import com.example.springproject.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  User findByUsername(String username);

  User findByEmail(String email);

  User findByVerificationCode(String code);
}
