package team21.solsolpokect.transfer.dto.response;

import lombok.Builder;
import lombok.Getter;
import team21.solsolpokect.transfer.entity.AutoTransfer;

import java.time.LocalDateTime;

@Getter
public class AutoTransferResponseDto {

    private long autoTransferId;
    private int money;
    private LocalDateTime autoDate;
    private String childAccount;

    @Builder
    public AutoTransferResponseDto(long autoTransferId, int money, LocalDateTime autoDate, String childAccount) {
        this.autoTransferId = autoTransferId;
        this.money = money;
        this.autoDate = autoDate;
        this.childAccount = childAccount;
    }

    public static AutoTransferResponseDto from(AutoTransfer autoTransfer) {
        return builder()
                .autoTransferId(autoTransfer.getId())
                .money(autoTransfer.getMoney())
                .autoDate(autoTransfer.getAutoDate())
                .childAccount(autoTransfer.getChildAccount())
                .build();
    }
}
