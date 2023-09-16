package team21.solsolpokect.mission.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import team21.solsolpokect.mission.entity.Mission;

import java.util.List;
import java.util.Optional;

public interface MissionRepository extends JpaRepository<Mission,Long> {

    List<Mission> findAllByUserIdAndDeletedAtIsNull(Long userId);
    Optional<Mission> findByIdAndDeletedAtIsNull(Long missionId);
}
