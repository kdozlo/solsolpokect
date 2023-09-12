package team21.solsolpokect.user.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team21.solsolpokect.common.entity.BaseTime;
import team21.solsolpokect.family.entity.Family;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Users extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

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

    @Column(nullable = false, length = 30)
    private String password;

    @Column(nullable = false)
    private int creditScore;

    @Builder
    public Users(String role, String userName, Family family, String account, String userId, String password, int creditScore) {
        this.role = role;
        this.userName = userName;
        this.family = family;
        this.account = account;
        this.userId = userId;
        this.password = password;
        this.creditScore = creditScore;
    }

    public void updateFamily(Family family) {
        this.family = family;
    }
}
