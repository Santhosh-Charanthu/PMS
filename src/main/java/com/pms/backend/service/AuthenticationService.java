package com.pms.backend.service;

import com.pms.backend.dto.AuthenticationResponse;
import com.pms.backend.dto.LoginRequest;
import com.pms.backend.dto.RegisterRequest;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request);
    AuthenticationResponse login(LoginRequest request);
}
