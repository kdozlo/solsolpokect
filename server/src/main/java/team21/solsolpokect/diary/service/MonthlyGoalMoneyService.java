package team21.solsolpokect.diary.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team21.solsolpokect.common.entity.DateUtils;
import team21.solsolpokect.common.exception.CustomException;
import team21.solsolpokect.common.exception.ErrorType;
import team21.solsolpokect.diary.dto.request.monthlygoal.MonthlyGoalMoneyRequestDto;
import team21.solsolpokect.diary.dto.response.MonthlyGoalMoneyResponseDto.MonthlyGoalMoneyResponseDto;
import team21.solsolpokect.diary.entity.MonthlyGoalMoney;
import team21.solsolpokect.diary.repository.MonthlyGoalMoneyRepository;
import team21.solsolpokect.user.entity.Users;
import team21.solsolpokect.user.repository.UsersRepository;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MonthlyGoalMoneyService {

    private final MonthlyGoalMoneyRepository monthlyGoalMoneyRepository;
    private final UsersRepository usersRepository;

    public void goalMoneyCreate(MonthlyGoalMoneyRequestDto requestDto) {
        Optional<Users> users = usersRepository.findByIdAndDeletedAtIsNull(requestDto.getUserId());
        if(users.isEmpty()) throw new CustomException(ErrorType.NOT_FOUND_USER);
        if(!users.get().getRole().equals("부모")){
            throw new CustomException(ErrorType.NOT_MATCHING_ROLE);
        }
        LocalDate date = requestDto.getDate();
        MonthlyGoalMoney monthlyGoalMoney = MonthlyGoalMoney.of(date, requestDto.getGoalMoney(), users.get());
        monthlyGoalMoneyRepository.save(monthlyGoalMoney);
    }

    public MonthlyGoalMoneyResponseDto goalMoneyDetail(Long userId, String year, String month) {
        Optional<Users> user = usersRepository.findByIdAndDeletedAtIsNull(userId);
        if(user.isEmpty()) throw new CustomException(ErrorType.NOT_FOUND_USER);

        Optional<MonthlyGoalMoney> monthlyGoalMoney = monthlyGoalMoneyRepository.findAllByUsersAndDateBetween(user.get(), DateUtils.getStartOfMonthDate(year,month), DateUtils.getStartOfMonthDate(year,month));

        if(monthlyGoalMoney.isEmpty()) throw new CustomException(ErrorType.NOT_FOUND_MONTHLY_GOAL_MONEY);

        return MonthlyGoalMoneyResponseDto.of(monthlyGoalMoney.get().getDate(),
                monthlyGoalMoney.get().getDailyScore());
    }
}
