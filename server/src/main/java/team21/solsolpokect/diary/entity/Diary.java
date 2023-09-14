package team21.solsolpokect.diary.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team21.solsolpokect.user.entity.Users;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Diary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime dailyDate;

    @Column
    private int dailyScore;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users users;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feedback_id")
    private Feedback feedback;

    @Builder
    private Diary(Long id, LocalDateTime dailyDate, int dailyScore, Users users, Feedback feedback) {
        this.id = id;
        this.dailyDate = dailyDate;
        this.dailyScore = dailyScore;
        this.users = users;
        this.feedback = feedback;
    }

    public static Diary of(Users user, LocalDateTime now, int dailyScore) {
        return builder()
                .users(user)
                .dailyDate(now)
                .dailyScore(dailyScore)
                .build();
    }

    public void scoreUpdate(int dailyScore) {
        this.dailyScore += dailyScore;
    }
}
