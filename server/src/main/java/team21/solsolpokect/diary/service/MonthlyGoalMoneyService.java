package team21.solsolpokect.diary.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team21.solsolpokect.common.exception.CustomException;
import team21.solsolpokect.common.exception.ErrorType;
import team21.solsolpokect.diary.dto.request.monthlygoal.MonthlyGoalMoneyRequestDto;
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
        LocalDate now = requestDto.getDate();
        MonthlyGoalMoney monthlyGoalMoney = MonthlyGoalMoney.of(now, requestDto.getGoalMoney(), users.get());
        monthlyGoalMoneyRepository.save(monthlyGoalMoney);
    }
}
