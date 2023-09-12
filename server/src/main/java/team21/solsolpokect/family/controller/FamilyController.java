package team21.solsolpokect.family.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team21.solsolpokect.common.response.ApiResponseDto;
import team21.solsolpokect.common.response.MsgType;
import team21.solsolpokect.common.response.ResponseUtils;
import team21.solsolpokect.family.dto.request.FamilyCreateRequestDto;
import team21.solsolpokect.family.service.FamilyService;

@RestController
@RequestMapping("api/mission")
@RequiredArgsConstructor
public class FamilyController {

    private final FamilyService familyService;

    @PostMapping("/create")
    public ApiResponseDto<Void> familyCreate(@RequestBody FamilyCreateRequestDto familyCreateRequestDto) {
        familyService.missionCreate(familyCreateRequestDto);
        return ResponseUtils.ok(MsgType.FAMILY_CREATE_SUCCESSFULLY);
    }
}
