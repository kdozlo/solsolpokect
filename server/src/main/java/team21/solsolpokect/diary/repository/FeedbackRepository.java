package team21.solsolpokect.diary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import team21.solsolpokect.diary.entity.Feedback;

import java.util.Optional;

public interface FeedbackRepository extends JpaRepository<Feedback,Long> {

    Optional<Feedback> findByIdAndDeletedAtIsNull(Long id);
}
