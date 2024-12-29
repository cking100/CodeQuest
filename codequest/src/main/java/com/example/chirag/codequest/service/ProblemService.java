package com.example.chirag.codequest.service;



import com.example.chirag.codequest.dto.SubmissionResult;

public interface ProblemService {
    SubmissionResult validateAndSubmitSolution(Long challengeId, Long userId, String solutionCode);
}

