package com.shecan.backend.controller;

import com.shecan.backend.entity.ContactMessage;

import com.shecan.backend.service.ContactService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/contact")

@CrossOrigin("*")

public class ContactController {

    @Autowired
    private ContactService service;

    @PostMapping("/submit")

    public String submitForm(
            @RequestBody ContactMessage message
    ){

        return service.saveMessage(message);
    }
    @GetMapping("/all")

    public List<ContactMessage> getAllMessages(){

        return service.getAllMessages();
    }
}