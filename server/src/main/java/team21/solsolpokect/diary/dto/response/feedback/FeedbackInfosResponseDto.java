package team21.solsolpokect.diary.dto.response.feedback;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class FeedbackInfosResponseDto {

    private Long feedbackId;
    private String contents;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    @Builder
    private FeedbackInfosResponseDto(Long feedbackId, String contents, LocalDateTime createAt, LocalDateTime updateAt) {
        this.feedbackId = feedbackId;
        this.contents = contents;
        this.createAt = createAt;
        this.updateAt = updateAt;
    }

    public static FeedbackInfosResponseDto of(Long feedbackId, String contents, LocalDateTime createdAt, LocalDateTime updateAt) {
        return builder()
                .feedbackId(feedbackId)
                .contents(contents)
                .createAt(createdAt)
                .updateAt(updateAt)
                .build();
    }
}
