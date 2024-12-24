package com.example.chirag.codequest.repository;

import com.example.chirag.codequest.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmissionRepository extends JpaRepository<Submission,Long> {
}
