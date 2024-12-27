package com.example.chirag.codequest.service;

import com.example.chirag.codequest.dto.SubmissionResult;

public interface ChallengeSubmissionService {
    SubmissionResult validateAndSubmitSolution(Long challengeId, Long userId, String solutionCode);
}

