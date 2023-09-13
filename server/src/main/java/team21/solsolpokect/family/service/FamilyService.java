package team21.solsolpokect.family.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import team21.solsolpokect.common.exception.CustomException;
import team21.solsolpokect.common.exception.ErrorType;
import team21.solsolpokect.family.dto.request.FamilyCreateRequestDto;
import team21.solsolpokect.family.dto.response.FamilyDetailResponseDto;
import team21.solsolpokect.family.entity.Family;
import team21.solsolpokect.family.repository.FamilyRepository;
import team21.solsolpokect.user.entity.Users;
import team21.solsolpokect.user.repository.UsersRepository;

import java.util.ArrayList;
import java.util.List;
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
            Optional<Users> user = usersRepository.findByUserIdAndDeletedAtIsNull(userId);
            if(user.isEmpty())
                throw new CustomException(ErrorType.NOT_FOUND_USER);

            user.get().updateFamily(family);
        }

    }

    public FamilyDetailResponseDto familyDetail(Long userId) {
        Optional<Users> user = usersRepository.findById(userId);

        if(user.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_USER);

        Family family = user.get().getFamily();

        if(family == null)
            throw new CustomException(ErrorType.NOT_FOUND_FAMILY);

        //가족으로 묶인 유저 리스트 구하기
        List<Users> usersList = usersRepository.findAllByFamilyIdAndDeletedAtIsNull(family.getId());

        //가족으로 묶인 유저 아이디 리스트 구하기
        List<String> usersIdList = new ArrayList<>();
        for (int i = 0; i < usersList.size(); i++) {
            usersIdList.add(usersList.get(i).getUserId());
        }

        return FamilyDetailResponseDto.of(usersIdList, family);
    }
}
