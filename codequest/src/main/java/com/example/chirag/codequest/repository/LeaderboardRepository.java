package com.example.chirag.codequest.repository;

import com.example.chirag.codequest.model.LeaderBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LeaderboardRepository extends JpaRepository<LeaderBoard, Long> {
    Optional<LeaderBoard> findByUserId(Long userId);
}
