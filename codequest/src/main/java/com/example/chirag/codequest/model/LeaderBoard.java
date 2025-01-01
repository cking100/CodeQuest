package com.example.chirag.codequest.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "leaderboard")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LeaderBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private int score;

    private int challengeCount;

    private LocalDateTime lastUpdated;
}
