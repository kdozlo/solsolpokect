package team21.solsolpokect.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UsersInfoResponseDto {

    private String role;
    private String username;
    private Long familyId;
    private String account;
    private int creditScore;

    @Builder
    private UsersInfoResponseDto(String role, String username, Long familyId, String account, int creditScore) {
        this.role = role;
        this.username = username;
        this.familyId = familyId;
        this.account = account;
        this.creditScore = creditScore;
    }

    public static UsersInfoResponseDto of(String role, String username, Long familyId, String account, int creditScore) {
        return builder()
                .role(role)
                .username(username)
                .familyId(familyId)
                .account(account)
                .creditScore(creditScore)
                .build();
    }
}
