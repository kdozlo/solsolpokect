package team21.solsolpokect.mission.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import team21.solsolpokect.common.response.ApiResponseDto;
import team21.solsolpokect.common.response.MsgType;
import team21.solsolpokect.common.response.ResponseUtils;
import team21.solsolpokect.mission.dto.request.MissionAllowRequestDto;
import team21.solsolpokect.mission.dto.request.MissionCompleteRequestDto;
import team21.solsolpokect.mission.dto.request.MissionCreateRequestDto;
import team21.solsolpokect.mission.dto.response.MissionInfoDetailResponseDto;
import team21.solsolpokect.mission.dto.response.MissionInfosResponseDto;
import team21.solsolpokect.mission.service.MissionService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/mission")
@RequiredArgsConstructor
public class MissionController {

    private final MissionService missionService;

    @PostMapping("/create/{user-id}")
    public ApiResponseDto<Void> missionCreate(@PathVariable("user-id") Long userId, @RequestBody MissionCreateRequestDto missionCreateRequestDto) {
        missionService.missionCreate(userId, missionCreateRequestDto);
        return ResponseUtils.ok(MsgType.MISSION_CREATE_SUCCESSFULLY);
    }

    @PutMapping("/allow/{mission-id}")
    public ApiResponseDto<Void> missionAllow(@PathVariable("mission-id") Long missionId, @RequestBody MissionAllowRequestDto missionAllowRequestDto) {
        missionService.missionAllow(missionId, missionAllowRequestDto);
        return ResponseUtils.ok(missionAllowRequestDto.isAllow() ? MsgType.MISSION_ALLOW_SUCCESSFULLY : MsgType.MISSION_REJECT_SUCCESSFULLY);
    }

    @GetMapping("/list")
    public ApiResponseDto<List<MissionInfosResponseDto>> missionList(@RequestParam Long userId) {

        return ResponseUtils.ok(missionService.missionList(userId), MsgType.MISSION_LIST_SUCCESSFULLY);
    }

    @GetMapping("/detail/{mission-id}")
    public ApiResponseDto<MissionInfoDetailResponseDto> missionDetail(@PathVariable("mission-id") Long missionId) {

        return ResponseUtils.ok(missionService.missionDetail(missionId), MsgType.MISSION_DETAIL_SUCCESSFULLY);
    }

    @DeleteMapping("/{mission-id}")
    public ApiResponseDto<Void> missionDelete(@PathVariable("mission-id") Long missionId) {
        missionService.missionDelete(missionId);
        return ResponseUtils.ok(MsgType.MISSION_DELETE_SUCCESSFULLY);
    }

    @PutMapping("/allow-picture/{mission-id}/{user-id}")
    public ApiResponseDto<Void> missionAllowPicture(@PathVariable("mission-id") Long missionId, @PathVariable("user-id") long userId,
                                                    @RequestPart MultipartFile picture) throws IOException {
        System.out.println("mission id : " + missionId + "user id : " + userId);
        missionService.missionAllowPicture(missionId, userId, picture);
        return ResponseUtils.ok(MsgType.MISSION_ALLOW_PICTURE_SUCCESSFULLY);
    }

    @PutMapping("/complete/{mission-id}")
    public ApiResponseDto<Void> missionComplete(@PathVariable("mission-id") Long missionId, @RequestBody MissionCompleteRequestDto missionCompleteRequestDto) {
        missionService.missionComplete(missionId, missionCompleteRequestDto);
        return ResponseUtils.ok(MsgType.MISSION_COMPLETE_SUCCESSFULLY);
    }
}
