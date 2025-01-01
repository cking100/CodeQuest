package com.example.chirag.codequest.service;


import com.example.chirag.codequest.model.LeaderBoard;

import java.util.List;

public interface LeaderboardService {
    List<LeaderBoard> getLeaderboard(); // Fetch the leaderboard sorted by score
    void updateLeaderboard(Long userId, int additionalScore); // Update score for a user
    LeaderBoard getUserLeaderboard(Long userId); // Get leaderboard entry for a specific user
}

