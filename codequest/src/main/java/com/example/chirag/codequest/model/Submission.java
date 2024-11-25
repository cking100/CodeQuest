package com.example.chirag.codequest.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Duration;

@Entity
@Table(name = "submissions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "problem_id", nullable = false)
    private Long problemId;

    @Column(name = "code_submission", columnDefinition = "TEXT", nullable = false)
    private String codeSubmission;

    @Column(name = "status", length = 50, nullable = false)
    private String status;

    @Column(name = "time_taken", nullable = false)
    private Duration timeTaken;
}