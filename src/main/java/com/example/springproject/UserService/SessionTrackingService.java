package com.example.springproject.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springproject.Models.UserSession;
import com.example.springproject.Repositories.UserSessionRepository;

import javax.transaction.Transactional;
import java.time.LocalDateTime;


@Service
public class SessionTrackingService {
    @Autowired
    private UserSessionRepository userSessionRepository;

    @Transactional
    public void addSession(String sessionId, String username) {
        UserSession session = new UserSession();
        session.setSessionId(sessionId);
        session.setUsername(username);
        session.setLastAccessed(LocalDateTime.now());
        userSessionRepository.save(session);
    }

    @Transactional
    public void removeSession(String sessionId) {
        userSessionRepository.deleteById(sessionId);
    }

    @Transactional
    public int getActiveSessions() {
        return (int) userSessionRepository.count();
    }
}
