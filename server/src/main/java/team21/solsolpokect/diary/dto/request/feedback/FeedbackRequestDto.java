package team21.solsolpokect.diary.dto.request.feedback;

import lombok.Getter;

@Getter
public class FeedbackRequestDto {

    private Long userId; //피드백 작성자의 유저 키값
    private Long dairyId;
    private String contents;
}
