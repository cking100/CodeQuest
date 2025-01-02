package com.example.chirag.codequest.service;

import com.example.chirag.codequest.model.Badge;
import com.example.chirag.codequest.model.User;
import com.example.chirag.codequest.repository.BadgeRepository;
import com.example.chirag.codequest.repository.UserRepository;
import com.example.chirag.codequest.service.BadgeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BadgeServiceImpl implements BadgeService {

    private final BadgeRepository badgeRepository;
    private final UserRepository userRepository;

    public BadgeServiceImpl(BadgeRepository badgeRepository, UserRepository userRepository) {
        this.badgeRepository = badgeRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Badge> getBadgesByUserId(Long userId) {
        return badgeRepository.findByUserId(userId);
    }

    @Override
    public void awardBadge(Long userId, String badgeName, String description, String iconUrl) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Badge badge = new Badge();
        badge.setName(badgeName);
        badge.setDescription(description);
        badge.setIconUrl(iconUrl);
        badge.setUser(user);

        badgeRepository.save(badge);
    }
}
