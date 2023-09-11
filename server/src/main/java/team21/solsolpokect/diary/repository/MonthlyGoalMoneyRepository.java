package team21.solsolpokect.diary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import team21.solsolpokect.diary.entity.MonthlyGoalMoney;

import java.util.Optional;

public interface MonthlyGoalMoneyRepository extends JpaRepository<MonthlyGoalMoney,Long> {

    @Query("SELECT p FROM Post p WHERE p.postId = :postId AND p.deletedAt IS NULL")
    Optional<MonthlyGoalMoney> findById(@Param("postId") Long postId);
}
