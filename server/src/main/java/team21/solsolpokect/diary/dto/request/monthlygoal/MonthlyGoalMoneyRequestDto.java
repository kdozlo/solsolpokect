package team21.solsolpokect.diary.dto.request.monthlygoal;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class MonthlyGoalMoneyRequestDto {

    private LocalDate date;
    private int goalMoney;
    private Long userId;
}
