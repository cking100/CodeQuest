package com.example.chirag.codequest.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "discusiom")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Discussion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private  User user;
    @ManyToOne
    @JoinColumn(name = "problem_id",nullable = false)
    private Problem problem;
    @Column
    private String comment;
}
