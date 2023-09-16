package team21.solsolpokect.diary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import team21.solsolpokect.diary.entity.Diary;
import team21.solsolpokect.user.entity.Users;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface DiaryRepository extends JpaRepository<Diary,Long> {
    Optional<Diary> findByUsers(Users userId);

    List<Diary> findAllByUsersAndDailyDateBetween(
            Users userId,
            LocalDateTime startOfMonth,
            LocalDateTime endOfMonth
    );
}
