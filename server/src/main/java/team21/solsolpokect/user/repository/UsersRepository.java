package team21.solsolpokect.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import team21.solsolpokect.user.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {
}
