package team21.solsolpokect.transfer.dto.request;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class AutoTransferCreateRequestDto {

    private LocalDateTime autoDate;
    private int money;
    private long userId;
    private String childAccount;
}
