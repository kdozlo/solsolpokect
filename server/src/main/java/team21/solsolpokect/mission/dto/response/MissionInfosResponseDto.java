package team21.solsolpokect.mission.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class MissionInfosResponseDto {

    private long missionId;
    private String missionName;
    private boolean complete;
    private boolean allow;
    private LocalDateTime createdAt;
    private LocalDateTime updateAt;
    private int category;

    @Builder
    private MissionInfosResponseDto(long missionId, String missionName, boolean complete, boolean allow,
                                    LocalDateTime createdAt, LocalDateTime updateAt, int category) {
        this.missionId = missionId;
        this.missionName = missionName;
        this.complete = complete;
        this.allow = allow;
        this.createdAt = createdAt;
        this.updateAt = updateAt;
        this.category=category;
    }

    public static MissionInfosResponseDto of(long missionId, String missionName, boolean complete, boolean allow,
                                             LocalDateTime createdAt, LocalDateTime updateAt, int category) {
        return builder()
                .missionId(missionId)
                .missionName(missionName)
                .complete(complete)
                .allow(allow)
                .createdAt(createdAt)
                .updateAt(updateAt)
                .category(category)
                .build();
    }
}
