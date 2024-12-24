package com.example.chirag.codequest.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.chirag.codequest.model.Contest;

public interface ContestRepository extends JpaRepository<Contest, Long> {

}
