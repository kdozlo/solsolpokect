package team21.solsolpokect.diary.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import team21.solsolpokect.common.response.ApiResponseDto;
import team21.solsolpokect.common.response.MsgType;
import team21.solsolpokect.common.response.ResponseUtils;
import team21.solsolpokect.diary.dto.request.feedback.FeedbackRequestDto;
import team21.solsolpokect.diary.dto.response.feedback.FeedbackInfosResponseDto;
import team21.solsolpokect.diary.service.FeedbackService;

import java.util.List;

@RestController
@RequestMapping("api/diary/feedback")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping("/create")
    public ApiResponseDto<Void> feedbackCreate(@RequestBody FeedbackRequestDto requestDto) {

        feedbackService.feedbackCreate(requestDto);
        return ResponseUtils.ok(MsgType.FEEDBACK_CREATE_SUCCESSFULLY);
    }

    @PutMapping("/{feedback-id}")
    public ApiResponseDto<Void> feedbackUpdate(@PathVariable("feedback-id") Long feedbackId,
                                               @RequestBody FeedbackRequestDto requestDto) {

        feedbackService.feedbackUpdate(feedbackId, requestDto);
        return ResponseUtils.ok(MsgType.FEEDBACK_UPDATE_SUCCESSFULLY);
    }

    @GetMapping("/infos")
    public ApiResponseDto<List<FeedbackInfosResponseDto>> feedbackInfos
            (@RequestParam("user-id") Long userId, String year, String month){

        return ResponseUtils.ok(feedbackService.feedbackInfos(userId,year,month),MsgType.FEEDBACK_CHECK_SUCCESSFULLY);
    }
}
