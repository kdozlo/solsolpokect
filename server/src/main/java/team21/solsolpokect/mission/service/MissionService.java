package team21.solsolpokect.mission.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import team21.solsolpokect.common.exception.CustomException;
import team21.solsolpokect.common.exception.ErrorType;
import team21.solsolpokect.mission.dto.request.MissionCreateRequestDto;
import team21.solsolpokect.mission.entity.Mission;
import team21.solsolpokect.mission.repository.MissionRepository;
import team21.solsolpokect.user.entity.Users;
import team21.solsolpokect.user.repository.UsersRepository;

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

}
