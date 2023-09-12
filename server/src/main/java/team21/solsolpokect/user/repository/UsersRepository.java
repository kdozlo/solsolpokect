package team21.solsolpokect.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import team21.solsolpokect.user.entity.Users;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Long> {
    @Query("SELECT u FROM Users u WHERE u.deletedAt IS NULL")
    Optional<Users> findByUserId(String userId);

}
