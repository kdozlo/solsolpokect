package team21.solsolpokect.diary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import team21.solsolpokect.diary.entity.Feedback;
import team21.solsolpokect.user.entity.Users;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface FeedbackRepository extends JpaRepository<Feedback,Long> {

    Optional<Feedback> findByIdAndDeletedAtIsNull(Long id);

    List<Feedback> findAllByUsersAndCreatedAtBetweenAndDeletedAtIsNull(
            Users userId,
            LocalDateTime startOfMonth,
            LocalDateTime endOfMonth
    );
}
