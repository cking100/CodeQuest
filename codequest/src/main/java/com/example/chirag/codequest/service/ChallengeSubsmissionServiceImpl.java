package com.example.chirag.codequest.service;

import com.example.chirag.codequest.model.TestCase;
import com.example.chirag.codequest.repository.ProblemRepository;
import com.example.chirag.codequest.repository.SubmissionRepository;
import org.springframework.stereotype.Service;
import
@Service
public class ChallengeSubmissionServiceImpl implements ChallengeSubmissionService {

    private final ProblemRepository problemRepository;
    private final SubmissionRepository submissionRepository;
    private final TestCase testCaseExecutor;

    public ChallengeSubmissionServiceImpl(
            ProblemRepository problemRepository, ProblemRepository problemRepository1,
            SubmissionRepository submissionRepository,
            TestCase testCaseExecutor) {
        this.problemRepository = problemRepository1;
        this.submissionRepository = submissionRepository;
        this.testCaseExecutor = testCaseExecutor;
    }

    @Override
    public SubmissionResult validateAndSubmitSolution(Long challengeId, Long userId, String solutionCode) {
        // Step 1: Validate Challenge
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new IllegalArgumentException("Challenge not found"));

        // Step 2: Execute Test Cases
        List<TestCase> testCases = challenge.getTestCases();
        SubmissionResult result = testCaseExecutor.execute(solutionCode, testCases);

        // Step 3: Record Submission
        Submission submission = new Submission();
        submission.setChallenge(challenge);
        submission.setUserId(userId);
        submission.setSolutionCode(solutionCode);
        submission.setScore(result.getScore());
        submission.setSuccess(result.isSuccess());
        submissionRepository.save(submission);

        // Step 4: Update Leaderboard or Badges if applicable
        if (result.isSuccess()) {
            // Award points, badges, or drops here (separate service if needed)
        }

        return result;
    }
}
