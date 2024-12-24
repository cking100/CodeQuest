package com.example.chirag.codequest.repository;

import com.example.chirag.codequest.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {

}
