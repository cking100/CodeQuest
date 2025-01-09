package com.example.chirag.codequest.repository;

import com.example.chirag.codequest.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<Object> findByUsername(String username);
}
