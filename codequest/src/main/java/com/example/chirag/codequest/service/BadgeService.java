package com.example.chirag.codequest.service;
import com.example.chirag.codequest.model.Badge;

import java.util.List;

public interface BadgeService {
    List<Badge> getBadgesByUserId(Long userId);
    void awardBadge(Long userId, String badgeName, String description, String iconUrl);
}
