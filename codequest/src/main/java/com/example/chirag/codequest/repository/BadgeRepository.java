package com.example.chirag.codequest.repository;

import com.example.chirag.codequest.model.Badge;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface BadgeRepository extends JpaRepository<Badge,Long> {
    List<Badge> findByUserId(Long userId);
}
