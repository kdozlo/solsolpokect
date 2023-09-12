package team21.solsolpokect.family.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import team21.solsolpokect.family.entity.Family;


import java.util.List;

public interface FamilyRepository extends JpaRepository<Family, Long> {
}
