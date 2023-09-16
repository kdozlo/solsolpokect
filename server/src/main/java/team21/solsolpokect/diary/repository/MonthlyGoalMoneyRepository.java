package team21.solsolpokect.diary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import team21.solsolpokect.diary.entity.MonthlyGoalMoney;
import team21.solsolpokect.user.entity.Users;

import java.time.LocalDate;
import java.util.Optional;

public interface MonthlyGoalMoneyRepository extends JpaRepository<MonthlyGoalMoney, Long> {
    Optional<MonthlyGoalMoney> findAllByUsersAndDateBetween(Users user, LocalDate startOfMonth,
                                                            LocalDate endOfMonth);

}
