package com.example.chirag.codequest.controller;

import com.example.chirag.codequest.model.User;
import com.example.chirag.codequest.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Register a new user.
     *
     * @param user User data.
     * @return Registered user.
     */
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.register(user);
    }

    /**
     * Authenticate a user.
     *
     * @param username Username of the user.
     * @param password Password of the user.
     * @return Authenticated user.
     */
    @PostMapping("/login")
    public User authenticateUser(@RequestParam String username, @RequestParam String password) {
        return userService.authenticate(username, password);
    }

    /**
     * Get user details by ID.
     *
     * @param userId User ID.
     * @return User details.
     */
    @GetMapping("/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }
}
