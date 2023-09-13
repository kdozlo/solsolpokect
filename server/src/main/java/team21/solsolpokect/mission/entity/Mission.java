package team21.solsolpokect.mission.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team21.solsolpokect.common.entity.BaseTime;
import team21.solsolpokect.user.entity.Users;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Mission extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false)
    private Users user;

    //도전 과제 수락 여부
    private boolean allow;

    @Builder
    public Mission(String missionName, int reward, boolean complete, String goal, String picture, Users user, boolean allow) {
        this.missionName = missionName;
        this.reward = reward;
        this.complete = complete;
        this.goal = goal;
        this.picture = picture;
        this.user = user;
        this.allow = allow;
    }

    public static Mission of(Users user, String missionName, int reward, boolean complete, String goal) {
        return builder()
                .user(user)
                .missionName(missionName)
                .reward(reward)
                .complete(complete)
                .goal(goal)
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
