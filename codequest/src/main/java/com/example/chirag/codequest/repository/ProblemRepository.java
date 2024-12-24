package com.example.chirag.codequest.repository;

import com.example.chirag.codequest.model.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemRepository extends JpaRepository<Problem,Long> {
}
