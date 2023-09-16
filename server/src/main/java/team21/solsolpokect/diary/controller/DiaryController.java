package team21.solsolpokect.diary.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import team21.solsolpokect.common.response.ApiResponseDto;
import team21.solsolpokect.common.response.MsgType;
import team21.solsolpokect.common.response.ResponseUtils;
import team21.solsolpokect.diary.dto.request.diary.DiaryScoreRequestDto;
import team21.solsolpokect.diary.dto.response.diary.DiaryInfoDetailResponseDto;
import team21.solsolpokect.diary.service.DiaryService;
import team21.solsolpokect.user.repository.UsersRepository;

import java.util.List;

@RestController
@RequestMapping("api/diary")
@RequiredArgsConstructor
public class DiaryController {
    private final DiaryService diaryService;
    private final UsersRepository usersRepository;

    @GetMapping("/family-info/detail")
    public ApiResponseDto<List<DiaryInfoDetailResponseDto>> diaryCheck(@RequestParam Long userId,
                                                                      @RequestParam("diary-date") String diaryDate) throws JsonProcessingException {

        return ResponseUtils.ok(diaryService.diaryCheck(userId, diaryDate), MsgType.DIARY_CHECK_SUCCESSFULLY);
    }

    @PostMapping("/score/create")
    public ApiResponseDto<Void> scoreCreate(@RequestBody DiaryScoreRequestDto requestDto){
        diaryService.scoreCreate(requestDto);
        return ResponseUtils.ok(MsgType.DAILY_SCORE_CREATE_SUCCESSFULLY);
    }

    @PostMapping("/score/update/{diary-id}")
    public ApiResponseDto<Void> scoreUpdate(@PathVariable("diary-id") Long diaryId, @RequestBody DiaryScoreRequestDto requestDto){
        diaryService.scoreUpdate(diaryId, requestDto);
        return ResponseUtils.ok(MsgType.DAILY_SCORE_UPDATE_SUCCESSFULLY);
    }

    @GetMapping("/score")
    public ApiResponseDto<Integer> diaryScoreDetail(@RequestParam("user-id") Long userId, @RequestParam("diary-date") String diaryDate) {
        return ResponseUtils.ok(diaryService.diaryScoreDetail(userId, diaryDate), MsgType.DAILY_SCORE_DETAIL_SUCCESSFULLY);
    }
}
