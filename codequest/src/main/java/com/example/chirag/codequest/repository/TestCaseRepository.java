package com.example.chirag.codequest.repository;

import com.example.chirag.codequest.model.TestCase;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestCaseRepository extends JpaRepository <TestCase,Long> {
}
