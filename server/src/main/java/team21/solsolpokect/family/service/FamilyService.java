package team21.solsolpokect.family.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import team21.solsolpokect.common.exception.CustomException;
import team21.solsolpokect.common.exception.ErrorType;
import team21.solsolpokect.family.dto.request.FamilyCreateRequestDto;
import team21.solsolpokect.family.entity.Family;
import team21.solsolpokect.family.repository.FamilyRepository;
import team21.solsolpokect.user.entity.Users;
import team21.solsolpokect.user.repository.UsersRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FamilyService {

    private final FamilyRepository familyRepository;
    private final UsersRepository usersRepository;

    public void familyCreate(FamilyCreateRequestDto familyCreateRequestDto) {
        Family family = Family.from(familyCreateRequestDto.getFamilyName());

        familyRepository.save(family);

        //유저 아이디를 통해 유저 정보를 가져와서 family 정보 업데이트 해주기
        for (String userId : familyCreateRequestDto.getUserId()) {
            Optional<Users> user = usersRepository.findByUserId(userId);
            if(user.isEmpty())
                throw new CustomException(ErrorType.NOT_FOUND_USER);

            user.get().updateFamily(family);
        }

    }
}
