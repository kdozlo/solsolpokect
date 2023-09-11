package team21.solsolpokect.diary.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import team21.solsolpokect.common.entity.BaseTime;
import team21.solsolpokect.user.entity.Users;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE post set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where post_id = ?")
public class Feedback extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String contents;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users users;

    @Builder
    private Feedback(String contents, Users users) {
        this.contents = contents;
        this.users = users;
    }

    public static Feedback of(String contents, Users users) {
        return builder()
                .contents(contents)
                .users(users)
                .build();
    }

    public void update(String contents) {
        this.contents = contents;
    }
}
