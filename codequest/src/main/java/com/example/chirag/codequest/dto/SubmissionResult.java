package com.example.chirag.codequest.dto;

public class SubmissionResult {
    private boolean success;
    private int score;
    private int passedTestCases;

    public SubmissionResult(boolean success, int score, int passedTestCases) {
        this.success = success;
        this.score = score;
        this.passedTestCases = passedTestCases;
    }

    // Getters and Setters
}
