package team21.solsolpokect.mission.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import team21.solsolpokect.common.exception.CustomException;
import team21.solsolpokect.common.exception.ErrorType;
import team21.solsolpokect.mission.dto.request.MissionAllowRequestDto;
import team21.solsolpokect.mission.dto.request.MissionCreateRequestDto;
import team21.solsolpokect.mission.dto.response.MissionInfosResponseDto;
import team21.solsolpokect.mission.entity.Mission;
import team21.solsolpokect.mission.repository.MissionRepository;
import team21.solsolpokect.user.entity.Users;
import team21.solsolpokect.user.repository.UsersRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MissionService {

    private final MissionRepository missionRepository;
    private final UsersRepository usersRepository;

    public void missionCreate(MissionCreateRequestDto missionCreateRequestDto) {
        Optional<Users> user = usersRepository.findById(missionCreateRequestDto.getUserId());

        if(user.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_USER);

        missionRepository.save(Mission.of(user.get(), missionCreateRequestDto.getMissionName(), missionCreateRequestDto.getReward(), false, missionCreateRequestDto.getGoal()));
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
                    m.isAllow(), m.getCreatedAt(), m.getUpdateAt()));
        }

        return missionInfosResponseDtos;
    }
}
