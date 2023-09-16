package team21.solsolpokect.mission.dto.request;

import lombok.Getter;

@Getter
public class MissionCreateRequestDto {

    private long userId;
    private String missionName;
    private int reward;
    private String goal;
    private int category;
}
