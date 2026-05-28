package com.shecan.backend.controller;

import com.shecan.backend.dto.LoginRequest;
import com.shecan.backend.dto.LoginResponse;
import com.shecan.backend.dto.RegisterRequest;
import com.shecan.backend.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/auth")

@CrossOrigin("*")

public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")

    public String register(
            @RequestBody RegisterRequest request
    ) {

        return authService.register(request);
    }

    @PostMapping("/login")

    public LoginResponse login(
            @RequestBody LoginRequest request
    ){

        return authService.login(request);
    }
}