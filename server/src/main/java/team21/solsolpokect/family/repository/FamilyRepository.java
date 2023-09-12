package team21.solsolpokect.family.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import team21.solsolpokect.family.entity.Family;
import team21.solsolpokect.mission.entity.Mission;
import team21.solsolpokect.user.entity.Users;

import java.util.List;

public interface FamilyRepository extends JpaRepository<Family, Long> {
}
