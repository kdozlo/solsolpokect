package team21.solsolpokect.mission.entity;

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
@SQLDelete(sql = "UPDATE mission set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
public class Mission extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String missionName;

    @Column(nullable = false)
    private int reward;

    //도전 과제 성공 여부
    @Column(nullable = false)
    private boolean complete;

    @Column(nullable = false)
    private String goal;

    private String picture;

    @Column(nullable = false)
    private int category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false)
    private Users user;

    //도전 과제 수락 여부
    private boolean allow;

    @Builder
    public Mission(String missionName, int reward, boolean complete, String goal, String picture, Users user, boolean allow, int category) {
        this.missionName = missionName;
        this.reward = reward;
        this.complete = complete;
        this.goal = goal;
        this.picture = picture;
        this.user = user;
        this.allow = allow;
        this.category= category;
    }

    public static Mission of(Users user, String missionName, int reward, boolean allow, boolean complete, String goal, int category) {
        return builder()
                .user(user)
                .missionName(missionName)
                .reward(reward)
                .allow(allow)
                .complete(complete)
                .goal(goal)
                .category(category)
                .build();
    }

    public void updateAllow(boolean allow) {
        this.allow = allow;
    }

    public void updatePicture(String picture) {
        this.picture = picture;
    }

    public void updateComplete(boolean complete) {
        this.complete = complete;
    }
}
