package team21.solsolpokect.diary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import team21.solsolpokect.diary.entity.Feedback;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface FeedbackRepository extends JpaRepository<Feedback,Long> {

    @Query("SELECT p FROM Feedback p WHERE p.deletedAt IS NULL")
    Optional<Feedback> findById(Long feedbackId);

    @Query("SELECT p FROM Feedback p WHERE p.deletedAt IS NULL")
    List<Feedback> findAllByUserIdAndCreatedAtBetween(
            Long userId,
            LocalDate startOfMonth,
            LocalDate endOfMonth
    );
}
