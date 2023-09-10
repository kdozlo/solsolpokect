package team21.solsolpokect.transfer.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team21.solsolpokect.common.entity.BaseTime;
import team21.solsolpokect.user.entity.Users;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AutoTransfer extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private LocalDateTime autoDate;

    @Column(nullable = false)
    private int money;

    @Column(nullable = false)
    private String childAccount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", nullable = false)
    private Users user;

    @Builder
    public AutoTransfer(LocalDateTime autoDate, int money, String childAccount, Users user) {
        this.autoDate = autoDate;
        this.money = money;
        this.childAccount = childAccount;
        this.user = user;
    }
}
