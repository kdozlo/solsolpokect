package team21.solsolpokect.mission.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import team21.solsolpokect.mission.entity.Mission;

import java.util.List;

public interface MissionRepository extends JpaRepository<Mission,Long> {

    List<Mission> findAllByUserIdAndDeletedAtIsNull(Long userId);
}
