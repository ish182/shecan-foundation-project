package com.shecan.backend.repository;

import com.shecan.backend.entity.ContactMessage;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository
        extends JpaRepository<ContactMessage, Long> {
}