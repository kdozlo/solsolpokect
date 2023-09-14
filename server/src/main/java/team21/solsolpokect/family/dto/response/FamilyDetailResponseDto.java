package team21.solsolpokect.family.dto.response;

import lombok.Builder;
import lombok.Getter;
import team21.solsolpokect.family.entity.Family;

import java.util.List;

@Getter
public class FamilyDetailResponseDto {

    Long id;
    List<String> usersId;
    List<String> usersName;
    List<String> roles;
    String familyName;

    @Builder
    private FamilyDetailResponseDto(Long id, List<String> usersId, List<String> usersName, List<String> roles, String familyName) {
        this.id = id;
        this.usersId = usersId;
        this.usersName = usersName;
        this.roles = roles;
        this.familyName = familyName;
    }

    public static FamilyDetailResponseDto of(List<String> usersId, List<String> usersName, List<String> roles, Family family) {
        return builder()
                .id(family.getId())
                .usersId(usersId)
                .usersName(usersName)
                .roles(roles)
                .familyName(family.getFamilyName())
                .build();
    }
}
