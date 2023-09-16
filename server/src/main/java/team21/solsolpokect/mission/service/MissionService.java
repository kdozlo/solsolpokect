package team21.solsolpokect.mission.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import team21.solsolpokect.common.exception.CustomException;
import team21.solsolpokect.common.exception.ErrorType;
import team21.solsolpokect.common.service.S3Uploader;
import team21.solsolpokect.mission.dto.request.MissionAllowRequestDto;
import team21.solsolpokect.mission.dto.request.MissionCompleteRequestDto;
import team21.solsolpokect.mission.dto.request.MissionCreateRequestDto;
import team21.solsolpokect.mission.dto.response.MissionInfoDetailResponseDto;
import team21.solsolpokect.mission.dto.response.MissionInfosResponseDto;
import team21.solsolpokect.mission.entity.Mission;
import team21.solsolpokect.mission.repository.MissionRepository;
import team21.solsolpokect.user.entity.Users;
import team21.solsolpokect.user.repository.UsersRepository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MissionService {

    private final MissionRepository missionRepository;
    private final UsersRepository usersRepository;
    private final S3Uploader s3Uploader;

    public void missionCreate(Long userId, MissionCreateRequestDto missionCreateRequestDto) {
        //미션 종류 에러 처리
        if(missionCreateRequestDto.getCategory() > 1)
            throw new CustomException(ErrorType.NOT_CREATE_MISSION);

        Optional<Users> child = usersRepository.findByIdAndDeletedAtIsNull(missionCreateRequestDto.getUserId()); //자녀
        Optional<Users> user = usersRepository.findByIdAndDeletedAtIsNull(userId); //현재 로그인 사용자, 미션 작성자

        //미션 하는 사람의 유저 정보 확인, 미션 작성자의 유저 정보 확인
        if(child.isEmpty() || user.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_USER);

        //미션 하는 사람의 유저가 자녀가 아닌 경우
        if(!child.get().getRole().equals("자녀"))
            throw new CustomException(ErrorType.NOT_MATCHING_ROLE);

        boolean allow = false;
        if(user.get().getRole().equals("부모")) {
                if(!child.get().getFamily().getId().equals(user.get().getFamily().getId()))
                    throw new CustomException(ErrorType.NOT_FOUND_FAMILY);
            allow = true;
        } else if(user.get().getRole().equals("자녀")) {
            if (!user.get().getId().equals(child.get().getId()))
                throw new CustomException(ErrorType.NOT_MATCHING_INFO);
        } else {
            throw new CustomException(ErrorType.NOT_VALID_USER);
        }

        missionRepository.save(Mission.of(child.get(), missionCreateRequestDto.getMissionName(), missionCreateRequestDto.getReward(), allow, false, missionCreateRequestDto.getGoal(), missionCreateRequestDto.getCategory()));
    }

    public void missionAllow(Long missionId, MissionAllowRequestDto missionAllowRequestDto) {
        Optional<Mission> mission = missionRepository.findByIdAndDeletedAtIsNull(missionId);

        if(mission.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_MISSION);

        //부모인지 확인
        Optional<Users> parent = usersRepository.findByIdAndDeletedAtIsNull(missionAllowRequestDto.getUserId());
        if(parent.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_USER);

        if(parent.get().getRole().equals("자녀"))
            throw new CustomException(ErrorType.NOT_MATCHING_ROLE);

        //부모가 자녀가 가족인지 확인
        if(!parent.get().getFamily().getId().equals(mission.get().getUser().getFamily().getId()))
            throw new CustomException(ErrorType.NOT_MATCHING_FAMILY);

        if(missionAllowRequestDto.isAllow())
            mission.get().updateAllow(true);
        else
            missionRepository.delete(mission.get());
    }

    public List<MissionInfosResponseDto> missionList(Long userId) {
        Optional<Users> user = usersRepository.findByIdAndDeletedAtIsNull(userId);

        if(user.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_USER);

        List<MissionInfosResponseDto> missionInfosResponseDtos = new ArrayList<>();

        if(user.get().getRole().equals("자녀")) {
            List<Mission> missions = missionRepository.findAllByUserIdAndDeletedAtIsNull(userId);
            System.out.println("자녀");
            for (Mission m : missions) {
                missionInfosResponseDtos.add(MissionInfosResponseDto.of(m.getId(), m.getMissionName(), m.isComplete(),
                        m.isAllow(), m.getCreatedAt(), m.getUpdatedAt(), m.getCategory(),
                        m.getReward(), m.getGoal(), m.getPicture()));
            }
        } else if(user.get().getRole().equals("부모")) {
            List<Users> familyList = usersRepository.findAllByFamilyIdAndDeletedAtIsNull(user.get().getFamily().getId());
            System.out.println("부모");
            for(Users u : familyList) {
                if(u.getRole().equals("자녀")) {
                    List<Mission> missions = missionRepository.findAllByUserIdAndDeletedAtIsNull(u.getId());

                    for (Mission m : missions) {
                        missionInfosResponseDtos.add(MissionInfosResponseDto.of(m.getId(), m.getMissionName(), m.isComplete(),
                                m.isAllow(), m.getCreatedAt(), m.getUpdatedAt(),m.getCategory(),
                                m.getReward(), m.getGoal(), m.getPicture()));
                    }
                }
            }
        }

        return missionInfosResponseDtos;
    }

    public MissionInfoDetailResponseDto missionDetail(Long missionId) {
        Optional<Mission> mission = missionRepository.findByIdAndDeletedAtIsNull(missionId);

        if(mission.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_MISSION);

        return MissionInfoDetailResponseDto.of(mission.get().getMissionName(), mission.get().getReward() , mission.get().isComplete(),
                mission.get().getGoal(), mission.get().getPicture(), mission.get().isAllow(), mission.get().getCreatedAt(), mission.get().getCategory());
    }

    public void missionDelete(Long userId, Long missionId) {
        Optional<Mission> mission = missionRepository.findByIdAndDeletedAtIsNull(missionId);
        if(mission.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_MISSION);

        //현재 로그인한 사용자
        Optional<Users> user = usersRepository.findByIdAndDeletedAtIsNull(userId);
        if(user.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_USER);

        //미션을 할 사용자
        Users child = mission.get().getUser();
        if(child == null)
            throw new CustomException(ErrorType.NOT_FOUND_USER);

//        다른 가족인 경우
        if(user.get().getFamily().getId().equals(child.getFamily().getId()))
            throw new CustomException(ErrorType.NOT_MATCHING_FAMILY);

//        자신이 자식이고, 같은 가족이나 자신이 아닌 자식인 경우
        if(user.get().getRole().equals("자녀") && !user.get().getId().equals(child.getId()))
            throw new CustomException(ErrorType.NOT_MATCHING_INFO);

        missionRepository.delete(mission.get());
    }

    public void missionAllowPicture(Long missionId, Long userId, MultipartFile file) throws IOException {
        Optional<Mission> mission = missionRepository.findByIdAndDeletedAtIsNull(missionId);

        //없는 미션인 경우
        if(mission.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_MISSION);

        //미션을 하는 당사자가 아닌 경우
        if(!mission.get().getUser().getId().equals(userId)){
            throw new CustomException(ErrorType.NOT_MATCHING_INFO);
        }

        //사진이 없는 경우
        if(file.isEmpty())
            throw new CustomException(ErrorType.PICTURE_IS_NULL);

        String imgUrl = s3Uploader.upload(file)+".jpg";

        mission.get().updatePicture(imgUrl);

    }

    public void missionComplete(Long userId, Long missionId, MissionCompleteRequestDto missionCompleteRequestDto) {
        Optional<Mission> mission = missionRepository.findByIdAndDeletedAtIsNull(missionId);
        if(mission.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_MISSION);

        Optional<Users> parent = usersRepository.findByIdAndDeletedAtIsNull(userId);
        if(parent.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_USER);

        //부모가 아닌 경우
        if(!parent.get().getRole().equals("부모"))
            throw new CustomException(ErrorType.NOT_MATCHING_ROLE);

        //같은 가족이 아닌 경우
        if(!parent.get().getFamily().getId().equals(mission.get().getUser().getFamily().getId()))
            throw new CustomException(ErrorType.NOT_MATCHING_FAMILY);

        mission.get().getUser().plusCreditScore(mission.get().getReward());

        mission.get().updateComplete(missionCompleteRequestDto.isComplete());
    }
}
