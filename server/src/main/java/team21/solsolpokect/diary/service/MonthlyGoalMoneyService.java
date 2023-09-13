package team21.solsolpokect.diary.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team21.solsolpokect.diary.dto.request.monthlygoal.MonthlyGoalMoneyRequestDto;
import team21.solsolpokect.diary.repository.MonthlyGoalMoneyRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class MonthlyGoalMoneyService {

    private final MonthlyGoalMoneyRepository repository;

    public void goalMoneyCreate(MonthlyGoalMoneyRequestDto requestDto) {


    }
}
