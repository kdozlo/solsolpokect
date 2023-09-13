package team21.solsolpokect.mission.dto.request;

import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class MissionPictureRequestDto {

    private long userId;
    private MultipartFile picture;
}
