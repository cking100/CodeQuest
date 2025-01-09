package com.example.chirag.codequest.service;

import com.example.chirag.codequest.model.User;
import com.example.chirag.codequest.repository.UserRepository;
import
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Retrieves a user by their ID.
     *
     *
     * @param userData the user data to be registered
     * @return the saved user
     */
    @Override
    public User register(User userData) {
        if (userRepository.findByUsername(userData.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        // Encode the password before saving
        userData.setPassword(passwordEncoder.encode(userData.getPassword()));
        return userRepository.save(userData);
    }

    /**
     * Authenticates a user by matching the raw password with the stored encoded password.
     *
     * @param username the username
     * @param password the raw password
     * @return the authenticated user
     */
    @Override
    public User authenticate(String username, String password) {
        User user = (User) userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Match the raw password with the stored encoded password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        return user;
    }

    /**
     * Retrieves a user by their ID.
     *
     * @param userId the user ID
     * @return the user
     */
    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    /**
     * Updates a user's profile with new data.
     *
     * @param userId      the user ID
     * @param updatedData the new user data
     */
    @Override
    public void updateUserProfile(Long userId, User updatedData) {
        User user = getUserById(userId);

        // Update the user's fields if new values are provided
        if (updatedData.getUsername() != null) {
            user.setUsername(updatedData.getUsername());
        }
        if (updatedData.getEmail() != null) {
            user.setEmail(updatedData.getEmail());
        }

        userRepository.save(user);
    }
}
