package team21.solsolpokect.mission.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import team21.solsolpokect.mission.entity.Mission;

import java.util.List;

public interface MissionRepository extends JpaRepository<Mission,Long> {

    @Query("SELECT m FROM Mission m WHERE m.deletedAt IS NULL  ORDER BY m.createdAt DESC")
    List<Mission> findAllByUserId(Long userId);
}
