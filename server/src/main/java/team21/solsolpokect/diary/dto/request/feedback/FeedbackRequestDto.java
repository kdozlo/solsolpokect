package team21.solsolpokect.diary.dto.request.feedback;

import lombok.Getter;

@Getter
public class FeedbackRequestDto {

    private Long userId;
    private Long dairyId;
    private String contents;
}
