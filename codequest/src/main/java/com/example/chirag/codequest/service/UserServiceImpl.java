package com.example.chirag.codequest.service;
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User register(User userData) {
        if (userRepository.findByUsername(userData.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        userData.setPassword(passwordEncoder.encode(userData.getPassword()));
        return userRepository.save(userData);
    }

    @Override
    public User authenticate(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return user;
    }

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public void updateUserProfile(Long userId, User updatedData) {
        User user = getUserById(userId);
        user.setUsername(updatedData.getUsername() != null ? updatedData.getUsername() : user.getUsername());
        user.setEmail(updatedData.getEmail() != null ? updatedData.getEmail() : user.getEmail());
        userRepository.save(user);
    }
}
