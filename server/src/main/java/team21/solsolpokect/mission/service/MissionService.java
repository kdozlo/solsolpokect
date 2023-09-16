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
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MissionService {

    private final MissionRepository missionRepository;
    private final UsersRepository usersRepository;
    private final S3Uploader s3Uploader;

    public void missionCreate(Long userId, MissionCreateRequestDto missionCreateRequestDto) {
        Optional<Users> child = usersRepository.findByIdAndDeletedAtIsNull(missionCreateRequestDto.getUserId()); //자녀
        Optional<Users> user = usersRepository.findByIdAndDeletedAtIsNull(userId); //현재 로그인 사용자

        if(child.isEmpty() || user.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_USER);

        boolean allow = false;
        if(user.get().getRole().equals("부모"))
            allow = true;

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
                        m.isAllow(), m.getCreatedAt(), m.getUpdatedAt(), m.getCategory()));
            }
        } else if(user.get().getRole().equals("부모")) {
            List<Users> familyList = usersRepository.findAllByFamilyIdAndDeletedAtIsNull(user.get().getFamily().getId());
            System.out.println("부모");
            for(Users u : familyList) {
                if(u.getRole().equals("자녀")) {
                    List<Mission> missions = missionRepository.findAllByUserIdAndDeletedAtIsNull(u.getId());

                    for (Mission m : missions) {
                        missionInfosResponseDtos.add(MissionInfosResponseDto.of(m.getId(), m.getMissionName(), m.isComplete(),
                                m.isAllow(), m.getCreatedAt(), m.getUpdatedAt(),m.getCategory()));
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

    public void missionDelete(Long missionId) {
        Optional<Mission> mission = missionRepository.findByIdAndDeletedAtIsNull(missionId);

        if(mission.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_MISSION);

        missionRepository.delete(mission.get());
    }

    public void missionAllowPicture(Long missionId, Long userId, MultipartFile picture) throws IOException {
        Optional<Mission> mission = missionRepository.findByIdAndDeletedAtIsNull(missionId);

        if(mission.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_MISSION);

        if(mission.get().getId()!=userId){
            throw new CustomException(ErrorType.NOT_MATCHING_INFO);
        }
        if(picture.isEmpty())
            throw new CustomException(ErrorType.PICTURE_IS_NULL);

        String imgUrl = s3Uploader.upload(picture);

        mission.get().updatePicture(imgUrl);

    }

    public void missionComplete(Long missionId, MissionCompleteRequestDto missionCompleteRequestDto) {
        Optional<Mission> mission = missionRepository.findByIdAndDeletedAtIsNull(missionId);

        if(mission.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_MISSION);

        mission.get().getUser().plusCreditScore(mission.get().getReward());

        mission.get().updateComplete(missionCompleteRequestDto.isComplete());
    }
}
