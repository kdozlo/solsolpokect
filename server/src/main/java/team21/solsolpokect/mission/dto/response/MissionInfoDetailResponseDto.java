package team21.solsolpokect.mission.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class MissionInfoDetailResponseDto {

    private String missionName;
    private int reward;
    private boolean complete;
    private String goal;
    private String picture;
    private boolean allow;
    private LocalDateTime createdAt;

    @Builder
    public MissionInfoDetailResponseDto(String missionName, int reward, boolean complete, String goal,
                                        String picture, boolean allow, LocalDateTime createdAt) {
        this.missionName = missionName;
        this.reward = reward;
        this.complete = complete;
        this.goal = goal;
        this.picture = picture;
        this.allow = allow;
        this.createdAt = createdAt;
    }

    public static MissionInfoDetailResponseDto of(String missionName, int reward, boolean complete, String goal,
                                             String picture, boolean allow, LocalDateTime createdAt) {
        return builder()
                .missionName(missionName)
                .reward(reward)
                .complete(complete)
                .goal(goal)
                .picture(picture)
                .allow(allow)
                .createdAt(createdAt)
                .build();
    }
}
