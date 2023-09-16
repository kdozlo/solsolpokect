package team21.solsolpokect.transfer.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import team21.solsolpokect.common.entity.BaseTime;
import team21.solsolpokect.transfer.dto.request.AutoTransferCreateRequestDto;
import team21.solsolpokect.transfer.dto.request.AutoTransferUpdateRequestDto;
import team21.solsolpokect.user.entity.Users;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE auto_transfer set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
public class AutoTransfer extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = true)
    private LocalDateTime autoDate;

    @Column(nullable = false)
    private int money;

    @Column(nullable = false)
    private String childAccount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false)
    private Users user;

    @Builder
    private AutoTransfer(LocalDateTime autoDate, int money, String childAccount, Users user) {
        this.autoDate = autoDate;
        this.money = money;
        this.childAccount = childAccount;
        this.user = user;
    }

    public static AutoTransfer of(AutoTransferCreateRequestDto autoTransferCreateRequestDto,
                                  Users user) {
        return builder()
                .autoDate(autoTransferCreateRequestDto.getAutoDate())
                .money(autoTransferCreateRequestDto.getMoney())
                .childAccount(autoTransferCreateRequestDto.getChildAccount())
                .user(user)
                .build();
    }

    public void update(AutoTransferUpdateRequestDto autoTransferUpdateRequestDto) {
        this.autoDate = autoTransferUpdateRequestDto.getAutoDate();
        this.money = autoTransferUpdateRequestDto.getMoney();
    }
}
