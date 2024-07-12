package com.example.springproject.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class SessionTrackingService {

    private static final Logger logger = LoggerFactory.getLogger(SessionTrackingService.class);

    private ConcurrentHashMap<String, String> activeSessions = new ConcurrentHashMap<>();
    private AtomicInteger activeUserCount = new AtomicInteger(0);

    public void addSession(String sessionId, String username) {
        activeSessions.put(sessionId, username);
        int currentCount = activeUserCount.incrementAndGet();
        logger.info("Session added: {} | Username: {} | Active User Count: {}", sessionId, username, currentCount);
    }

    public void removeSession(String sessionId) {
        String username = activeSessions.remove(sessionId);
        if (username != null) {
            int currentCount = activeUserCount.decrementAndGet();
            logger.info("Session removed: {} | Username: {} | Active User Count: {}", sessionId, username, currentCount);
        }
    }

    public int getActiveSessions() {
        int currentCount = activeUserCount.get();
        logger.info("Getting Active User Count: {}", currentCount);
        return currentCount;
    }
}
