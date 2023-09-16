package team21.solsolpokect.diary.dto.response.MonthlyGoalMoneyResponseDto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class MonthlyGoalMoneyResponseDto {

    private LocalDate date;
    private int goalMoney;

    @Builder
    private MonthlyGoalMoneyResponseDto(LocalDate date, int goalMoney) {
        this.date = date;
        this.goalMoney = goalMoney;
    }

    public static MonthlyGoalMoneyResponseDto of(LocalDate date, int goalMoney) {
        return builder()
                .date(date)
                .goalMoney(goalMoney)
                .build();
    }
}
