package team21.solsolpokect.family.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import team21.solsolpokect.common.response.ApiResponseDto;
import team21.solsolpokect.common.response.MsgType;
import team21.solsolpokect.common.response.ResponseUtils;
import team21.solsolpokect.family.dto.request.FamilyCreateRequestDto;
import team21.solsolpokect.family.dto.response.FamilyDetailResponseDto;
import team21.solsolpokect.family.service.FamilyService;

@RestController
@RequestMapping("api/mission")
@RequiredArgsConstructor
public class FamilyController {

    private final FamilyService familyService;

    @PostMapping("/create")
    public ApiResponseDto<Void> familyCreate(@RequestBody FamilyCreateRequestDto familyCreateRequestDto) {
        familyService.familyCreate(familyCreateRequestDto);
        return ResponseUtils.ok(MsgType.FAMILY_CREATE_SUCCESSFULLY);
    }

    @GetMapping("/info/{user-id}")
    public ApiResponseDto<FamilyDetailResponseDto> familyDetail(@PathVariable("user-id") Long userId) {
        return ResponseUtils.ok(familyService.familyDetail(userId), MsgType.FAMILY_DETAIL_SUCCESSFULLY);
    }
}
