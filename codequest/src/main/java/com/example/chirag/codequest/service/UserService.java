package com.example.chirag.codequest.service;

import com.example.chirag.codequest.model.User;

public interface UserService {

    User register(User userData);

    User authenticate(String username, String password);

    User getUserById(Long userId);

    void updateUserProfile(Long userId, User updatedData);
}