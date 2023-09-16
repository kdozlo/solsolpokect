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
    private int category;

    @Builder
    private MissionInfoDetailResponseDto(String missionName, int reward, boolean complete, String goal,
                                        String picture, boolean allow, LocalDateTime createdAt, int category) {
        this.missionName = missionName;
        this.reward = reward;
        this.complete = complete;
        this.goal = goal;
        this.picture = picture;
        this.allow = allow;
        this.createdAt = createdAt;
        this.category=category;
    }

    public static MissionInfoDetailResponseDto of(String missionName, int reward, boolean complete, String goal,
                                             String picture, boolean allow, LocalDateTime createdAt, int category) {
        return builder()
                .missionName(missionName)
                .reward(reward)
                .complete(complete)
                .goal(goal)
                .picture(picture)
                .allow(allow)
                .createdAt(createdAt)
                .category(category)
                .build();
    }
}
