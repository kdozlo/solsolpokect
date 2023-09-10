package team21.solsolpokect.mission.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import team21.solsolpokect.common.response.ApiResponseDto;
import team21.solsolpokect.common.response.MsgType;
import team21.solsolpokect.common.response.ResponseUtils;
import team21.solsolpokect.mission.dto.request.MissionAllowRequestDto;
import team21.solsolpokect.mission.dto.request.MissionCompleteRequestDto;
import team21.solsolpokect.mission.dto.request.MissionCreateRequestDto;
import team21.solsolpokect.mission.dto.request.MissionPictureRequestDto;
import team21.solsolpokect.mission.dto.response.MissionInfoDetailResponseDto;
import team21.solsolpokect.mission.dto.response.MissionInfosResponseDto;
import team21.solsolpokect.mission.service.MissionService;

import java.util.List;

@RestController
@RequestMapping("api/mission")
@RequiredArgsConstructor
public class MissionController {

    private final MissionService missionService;

    @PostMapping("/create")
    public ApiResponseDto<Void> missionCreate(@RequestBody MissionCreateRequestDto missionCreateRequestDto) {
        missionService.missionCreate(missionCreateRequestDto);
        return ResponseUtils.ok(MsgType.MISSION_CREATE_SUCCESSFULLY);
    }

    @PutMapping("/allow/{mission-id}")
    public ApiResponseDto<Void> missionAllow(@PathVariable("mission-id") long missionId, @RequestBody MissionAllowRequestDto missionAllowRequestDto) {
        missionService.missionAllow(missionId, missionAllowRequestDto);
        return ResponseUtils.ok(missionAllowRequestDto.isAllow() ? MsgType.MISSION_ALLOW_SUCCESSFULLY : MsgType.MISSION_REJECT_SUCCESSFULLY);
    }

    @GetMapping("/list")
    public ApiResponseDto<List<MissionInfosResponseDto>> missionList(@RequestParam long userId) {

        return ResponseUtils.ok(missionService.missionList(userId), MsgType.MISSION_LIST_SUCCESSFULLY);
    }

    @GetMapping("/detail/{mission-id}")
    public ApiResponseDto<MissionInfoDetailResponseDto> missionDetail(@PathVariable("mission-id") long missionId) {

        return ResponseUtils.ok(missionService.missionDetail(missionId), MsgType.MISSION_DETAIL_SUCCESSFULLY);
    }

    @DeleteMapping("/{mission-id}")
    public ApiResponseDto<Long> missionDelete(@PathVariable("mission-id") long missionId) {

        return ResponseUtils.ok(missionService.missionDelete(missionId), MsgType.MISSION_DELETE_SUCCESSFULLY);
    }

    @PutMapping("/allow-picture/{mission-id}")
    public ApiResponseDto<Long> missionAllowPicture(@PathVariable("mission-id") long missionId, @RequestBody MissionPictureRequestDto missionPictureRequestDto) {

        return ResponseUtils.ok(missionService.missionAllowPicture(missionId, missionPictureRequestDto), MsgType.MISSION_ALLOW_PICTURE_SUCCESSFULLY);
    }

    @PutMapping("/complete/{mission-id}")
    public ApiResponseDto<Long> missionComplete(@PathVariable("mission-id") long missionId, @RequestBody MissionCompleteRequestDto missionCompleteRequestDto) {

        return ResponseUtils.ok(missionService.missionComplete(missionId, missionCompleteRequestDto), MsgType.MISSION_COMPLETE_SUCCESSFULLY);
    }
}
