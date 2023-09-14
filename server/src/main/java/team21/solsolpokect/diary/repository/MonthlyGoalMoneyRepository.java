package team21.solsolpokect.diary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import team21.solsolpokect.diary.entity.MonthlyGoalMoney;

public interface MonthlyGoalMoneyRepository extends JpaRepository<MonthlyGoalMoney,Long> {
}
