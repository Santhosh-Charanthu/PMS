package com.pms.backend.service;

import com.pms.backend.entity.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    String generateToken(User user);
    String extractUserName(String token);
    boolean isTokenValid(String token, UserDetails user);
}
