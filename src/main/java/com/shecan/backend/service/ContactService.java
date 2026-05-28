package com.shecan.backend.service;

import com.shecan.backend.entity.ContactMessage;

import com.shecan.backend.repository.ContactRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    @Autowired
    private ContactRepository repository;

    public String saveMessage(ContactMessage message){

        repository.save(message);

        return "Form Submitted Successfully";
    }
    public List<ContactMessage> getAllMessages(){

        return repository.findAll();
    }
}