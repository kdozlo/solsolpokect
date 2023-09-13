package team21.solsolpokect.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import team21.solsolpokect.user.entity.Users;

import java.util.List;
import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByUserIdAndDeletedAtIsNull(String userId);

    Optional<Users> findByIdAndDeletedAtIsNull(Long id);

    List<Users> findAllByFamilyIdAndDeletedAtIsNull (Long familyId);
}
