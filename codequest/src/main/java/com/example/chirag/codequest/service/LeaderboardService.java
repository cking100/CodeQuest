package com.example.chirag.codequest.service;
public interface LeaderboardService {
    void updateLeaderboard(Long userId, Long challengeId, int score);
    List<UserLeaderboardEntry> getGlobalLeaderboard();
    List<UserLeaderboardEntry> getChallengeLeaderboard(Long challengeId);
}
