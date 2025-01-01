package com.example.chirag.codequest.service;

import com.example.chirag.codequest.model.LeaderBoard;
import com.example.chirag.codequest.model.User;
import com.example.chirag.codequest.repository.LeaderboardRepository;
import com.example.chirag.codequest.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LeaderboardServiceImpl implements LeaderboardService {

    private final LeaderboardRepository leaderboardRepository;
    private final UserRepository userRepository;

    public LeaderboardServiceImpl(LeaderboardRepository leaderboardRepository, UserRepository userRepository) {
        this.leaderboardRepository = leaderboardRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<LeaderBoard> getLeaderboard() {

        return leaderboardRepository.findAll(Sort.by(Sort.Direction.DESC, "score"));
    }

    @Override
    public void updateLeaderboard(Long userId, int additionalScore) {
        LeaderBoard leaderboardEntry = leaderboardRepository.findByUserId(userId)
                .orElseGet(() -> {

                    LeaderBoard newEntry = new LeaderBoard();
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new RuntimeException("User not found"));
                    newEntry.setUser(user);
                    newEntry.setScore(0);
                    newEntry.setChallengeCount(0);
                    newEntry.setLastUpdated(LocalDateTime.now());
                    return newEntry;
                });

        // Update the leaderboard entry with the new score and challenge count
        leaderboardEntry.setScore(leaderboardEntry.getScore() + additionalScore);
        leaderboardEntry.setChallengeCount(leaderboardEntry.getChallengeCount() + 1);
        leaderboardEntry.setLastUpdated(LocalDateTime.now());
        leaderboardRepository.save(leaderboardEntry);
    }

    @Override
    public LeaderBoard getUserLeaderboard(Long userId) {
        // Fetch a specific user's leaderboard entry
        return leaderboardRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found in leaderboard"));
    }
}
