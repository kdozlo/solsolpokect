package team21.solsolpokect.transfer.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import team21.solsolpokect.common.response.ApiResponseDto;
import team21.solsolpokect.common.response.MsgType;
import team21.solsolpokect.common.response.ResponseUtils;
import team21.solsolpokect.transfer.dto.request.AutoTransferCreateRequestDto;
import team21.solsolpokect.transfer.dto.request.AutoTransferUpdateRequestDto;
import team21.solsolpokect.transfer.dto.response.AutoTransferResponseDto;
import team21.solsolpokect.transfer.service.AutoTransferService;

import java.util.List;

@RestController
@RequestMapping("api/auto-transfer")
@RequiredArgsConstructor
public class AutoTransferController {

    private final AutoTransferService autoTransferService;

    @PostMapping("/create")
    public ApiResponseDto<AutoTransferResponseDto> autoTransferCreate(@RequestBody AutoTransferCreateRequestDto autoTransferCreateRequestDto) {
        return ResponseUtils.ok(autoTransferService.autoTransferCreate(autoTransferCreateRequestDto), MsgType.AUTO_TRANSFER_CREATE_SUCCESSFULLY);
    }

    @GetMapping("/list/{user-id}")
    public ApiResponseDto<List<AutoTransferResponseDto>> autoTransferList(@PathVariable("user-id") Long userId) {

        return ResponseUtils.ok(autoTransferService.autoTransferList(userId), MsgType.AUTO_TRANSFER_LIST_SUCCESSFULLY);
    }

    @PutMapping("/{transfer-id}")
    public ApiResponseDto<Void> autoTransferUpdate(@PathVariable("transfer-id") Long transferId,
                                                   @RequestBody AutoTransferUpdateRequestDto autoTransferUpdateRequestDto) {
        autoTransferService.autoTransferUpdate(transferId, autoTransferUpdateRequestDto);
        return ResponseUtils.ok(MsgType.AUTO_TRANSFER_UPDATE_SUCCESSFULLY);
    }

    @DeleteMapping("/{transfer-id}")
    public ApiResponseDto<Void> autoTransferDelete(@PathVariable("transfer-id") Long transferId) {
        autoTransferService.autoTransferDelete(transferId);
        return ResponseUtils.ok(MsgType.AUTO_TRANSFER_DELETE_SUCCESSFULLY);
    }

}
