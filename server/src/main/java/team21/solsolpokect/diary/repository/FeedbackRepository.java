package team21.solsolpokect.diary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import team21.solsolpokect.diary.entity.Feedback;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface FeedbackRepository extends JpaRepository<Feedback,Long> {

    @Query("SELECT p FROM Post p WHERE p.postId = :postId AND p.deletedAt IS NULL")
    Optional<Feedback> findById(@Param("postId") Long postId);

    @Query("SELECT p FROM Post p WHERE p.postId = :postId AND p.deletedAt IS NULL")
    List<Feedback> findAllByUserIdAndCreatedAtBetween(
            Long userId,
            LocalDate startOfMonth,
            LocalDate endOfMonth
    );
}
