package com.example.chirag.codequest.controller;

import com.example.chirag.codequest.model.Leaderboard;
import com.example.chirag.codequest.service.LeaderboardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    /**
     * Get the top users on the leaderboard.
     *
     * @return List of leaderboard entries.
     */
    @GetMapping
    public List<Leaderboard> getTopUsers() {
        return leaderboardService.getTopUsers();
    }

    /**
     * Get the leaderboard position of a specific user.
     *
     * @param userId ID of the user.
     * @return Leaderboard entry of the user.
     */
    @GetMapping("/{userId}")
    public Leaderboard getUserPosition(@PathVariable Long userId) {
        return leaderboardService.getUserPosition(userId);
    }
}
