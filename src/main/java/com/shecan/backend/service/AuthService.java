package com.shecan.backend.service;

import com.shecan.backend.dto.LoginRequest;
import com.shecan.backend.dto.RegisterRequest;
import com.shecan.backend.entity.User;
import com.shecan.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.shecan.backend.dto.LoginResponse;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder encoder =
            new BCryptPasswordEncoder();

    public String register(RegisterRequest request) {

        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }

        User user = new User();

        user.setName(request.getName());

        user.setEmail(request.getEmail());

        user.setPassword(
                encoder.encode(request.getPassword())
        );
        user.setRole(request.getRole());

        userRepository.save(user);

        return "User Registered Successfully";
    }

    public LoginResponse login(
            LoginRequest request
    ){

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        if(user == null){

            return new LoginResponse(
                    "User not found",
                    null
            );
        }

        boolean matched =
                encoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if(matched){

            return new LoginResponse(
                    "Login Successful",
                    user.getRole()
            );
        }

        return new LoginResponse(
                "Invalid Password",
                null
        );
    }
}