package team21.solsolpokect.diary.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team21.solsolpokect.user.entity.Users;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MonthlyGoalMoney {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private int dailyScore;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users users;

    @Builder
    private MonthlyGoalMoney(Long id, LocalDate date, int dailyScore, Users users) {
        this.id = id;
        this.date = date;
        this.dailyScore = dailyScore;
        this.users = users;
    }

    public static MonthlyGoalMoney of(LocalDate date, int goalMoney, Users users) {
        return builder()
                .date(date)
                .dailyScore(goalMoney)
                .users(users)
                .build();
    }
}
