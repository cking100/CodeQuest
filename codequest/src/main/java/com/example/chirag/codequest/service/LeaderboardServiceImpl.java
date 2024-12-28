package com.example.chirag.codequest.service;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LeaderboardServiceImpl implements LeaderboardService {

    private final LeaderboardRepository leaderboardRepository;

    public LeaderboardServiceImpl(LeaderboardRepository leaderboardRepository) {
        this.leaderboardRepository = leaderboardRepository;
    }

    @Override
    public void updateLeaderboard(Long userId, Long challengeId, int score) {
        LeaderboardEntry entry = leaderboardRepository.findByUserIdAndChallengeId(userId, challengeId)
                .orElse(new LeaderboardEntry(userId, challengeId));

        entry.setScore(Math.max(entry.getScore(), score)); // Keep the highest score
        leaderboardRepository.save(entry);
    }

    @Override
    public List<UserLeaderboardEntry> getGlobalLeaderboard() {
        return leaderboardRepository.findTopGlobalUsers();
    }

    @Override
    public List<UserLeaderboardEntry> getChallengeLeaderboard(Long challengeId) {
        return leaderboardRepository.findTopUsersByChallengeId(challengeId);
    }
}
