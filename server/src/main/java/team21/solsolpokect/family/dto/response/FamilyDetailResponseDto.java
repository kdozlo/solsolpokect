package team21.solsolpokect.family.dto.response;

import lombok.Builder;
import lombok.Getter;
import team21.solsolpokect.family.entity.Family;
import team21.solsolpokect.user.entity.Users;

import java.util.List;

@Getter
public class FamilyDetailResponseDto {

    Long id;
    List<String> userId;
    String familyName;

    @Builder
    public FamilyDetailResponseDto(Long id, List<String> userId, String familyName) {
        this.id = id;
        this.userId = userId;
        this.familyName = familyName;
    }

    public static FamilyDetailResponseDto of(List<String> usersIdList, Family family) {
        return builder()
                .id(family.getId())
                .userId(usersIdList)
                .familyName(family.getFamilyName())
                .build();
    }
}
