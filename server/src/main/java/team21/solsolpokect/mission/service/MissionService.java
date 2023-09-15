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
        Optional<Users> child = usersRepository.findById(missionCreateRequestDto.getUserId()); //자녀
        Optional<Users> user = usersRepository.findById(userId); //현재 로그인 사용자


        if(child.isEmpty() || user.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_USER);

        boolean allow = false;
        if(user.get().getRole().equals("부모"))
            allow = true;

        missionRepository.save(Mission.of(child.get(), missionCreateRequestDto.getMissionName(), missionCreateRequestDto.getReward(), allow,false, missionCreateRequestDto.getGoal()));
    }

    public void missionAllow(long missionId, MissionAllowRequestDto missionAllowRequestDto) {
        Optional<Mission> mission = missionRepository.findById(missionId);

        if(mission.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_MISSION);

        mission.get().updateAllow(missionAllowRequestDto.isAllow());
    }

    public List<MissionInfosResponseDto> missionList(long userId) {
        Optional<Users> user = usersRepository.findById(userId);

        if(user.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_USER);

        List<Mission> missions = missionRepository.findAllByUserId(userId);
        List<MissionInfosResponseDto> missionInfosResponseDtos = new ArrayList<>();

        for (Mission m : missions) {
            missionInfosResponseDtos.add(MissionInfosResponseDto.of(m.getId(), m.getMissionName(), m.isComplete(),
                    m.isAllow(), m.getCreatedAt(), m.getUpdatedAt()));
        }

        return missionInfosResponseDtos;
    }

    public MissionInfoDetailResponseDto missionDetail(long missionId) {
        Optional<Mission> mission = missionRepository.findById(missionId);

        if(mission.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_MISSION);

        return MissionInfoDetailResponseDto.of(mission.get().getMissionName(), mission.get().getReward() , mission.get().isComplete(),
                mission.get().getGoal(), mission.get().getPicture(), mission.get().isAllow(), mission.get().getCreatedAt());
    }

    public void missionDelete(long missionId) {
        Optional<Mission> mission = missionRepository.findById(missionId);

        if(mission.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_MISSION);

        missionRepository.delete(mission.get());
    }

    public void missionAllowPicture(long missionId, long userId, MultipartFile picture) throws IOException {
        Optional<Mission> mission = missionRepository.findById(missionId);

        if(mission.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_MISSION);

        if(picture.isEmpty())
            throw new CustomException(ErrorType.PICTURE_IS_NULL);

        String imgUrl = s3Uploader.upload(picture);

        mission.get().updatePicture(imgUrl);

    }

    public void missionComplete(long missionId, MissionCompleteRequestDto missionCompleteRequestDto) {
        Optional<Mission> mission = missionRepository.findById(missionId);

        if(mission.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_MISSION);

        mission.get().getUser().plusCreditScore(mission.get().getReward());

        mission.get().updateComplete(missionCompleteRequestDto.isComplete());
    }
}
