package team21.solsolpokect.user.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import team21.solsolpokect.common.entity.BaseTime;
import team21.solsolpokect.family.entity.Family;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE Auto_Transfer set deleted_at = CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul') where id = ?")
public class Users extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 10)
    private String role;

    @Column(nullable = false, length = 20)
    private String userName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FAMILY_ID")
    private Family family;

    @Column(nullable = false)
    private String account;

    @Column(nullable = false, length = 30)
    private String userId;

    @Column(nullable = false, length = 100)
    private String password;

    @Column(nullable = false)
    private int creditScore;

    @Builder
    private Users(String role, String userName, Family family, String account, String userId, String password) {
        this.role = role;
        this.userName = userName;
        this.family = family;
        this.account = account;
        this.userId = userId;
        this.password = password;
        this.creditScore = 0;
    }

    public static Users of(String userId, String encodePw, String role, String account, String username) {
        return builder()
                .userId(userId)
                .password(encodePw)
                .role(role)
                .account(account)
                .userName(username)
                .build();
    }

    public void updateFamily(Family family) {
        this.family = family;
    }

    public void plusCreditScore(int score) {
        this.creditScore += score;
    }

    public void minusCreditScore(int score) {
        this.creditScore -= score;
    }
}
