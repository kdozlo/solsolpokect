package team21.solsolpokect.family.dto.request;

import lombok.Getter;

import java.util.List;

@Getter
public class FamilyCreateRequestDto {
    List<Long> userId;
    String familyName;
}
