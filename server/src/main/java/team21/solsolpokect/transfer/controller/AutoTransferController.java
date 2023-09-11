package team21.solsolpokect.transfer.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team21.solsolpokect.common.response.ApiResponseDto;
import team21.solsolpokect.common.response.MsgType;
import team21.solsolpokect.common.response.ResponseUtils;
import team21.solsolpokect.transfer.dto.request.AutoTransferCreateRequestDto;
import team21.solsolpokect.transfer.service.AutoTransferService;

@RestController
@RequestMapping("api/auto-transfer")
@RequiredArgsConstructor
public class AutoTransferController {

    AutoTransferService autoTransferService;

    @PostMapping("/create")
    public ApiResponseDto<Void> autoTransferCreate(@RequestBody AutoTransferCreateRequestDto autoTransferCreateRequestDto) {
        autoTransferService.autoTransferCreate(autoTransferCreateRequestDto);
        return ResponseUtils.ok(MsgType.AUTOTRANSFER_CREATE_SUCCESSFULLY);
    }
}
