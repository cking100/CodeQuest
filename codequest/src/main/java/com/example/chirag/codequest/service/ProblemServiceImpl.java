package com.example.chirag.codequest.service;

import com.example.chirag.codequest.dto.SubmissionResult;
import com.example.chirag.codequest.model.Challenge;
import com.example.chirag.codequest.model.Submission;
import com.example.chirag.codequest.model.TestCase;
import com.example.chirag.codequest.repository.ProblemRepository;
import com.example.chirag.codequest.repository.SubmissionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProblemServiceImpl implements ProblemService {

    private final ProblemRepository problemRepository;
    private final SubmissionRepository submissionRepository;
    private final TestCaseExecutor testCaseExecutor;

    public ProblemServiceImpl(
            ProblemRepository problemRepository,
            SubmissionRepository submissionRepository,
            TestCaseExecutor testCaseExecutor) {
        this.problemRepository = problemRepository;
        this.submissionRepository = submissionRepository;
        this.testCaseExecutor = testCaseExecutor;
    }

    @Override
    public SubmissionResult validateAndSubmitSolution(Long challengeId, Long userId, String solutionCode) {
        // Fetch the challenge using the challenge ID
        Challenge challenge = problemRepository.findById(challengeId)
                .orElseThrow(() -> new IllegalArgumentException("Challenge not found"));

        // Get test cases associated with the challenge
        List<TestCase> testCases = challenge.getTestCases();

        // Execute the solution code against the test cases
        SubmissionResult result = testCaseExecutor.execute(solutionCode, testCases);

        // Save the submission details
        Submission submission = new Submission();
        submission.setChallenge(challenge);
        submission.setUserId(userId);
        submission.setSolutionCode(solutionCode);
        submission.setScore(result.getScore());
        submission.setSuccess(result.isSuccess());
        submissionRepository.save(submission);

        // Perform additional actions for successful submissions (if needed)
        if (result.isSuccess()) {
            // Additional logic can be added here
        }

        return result;
    }
}
