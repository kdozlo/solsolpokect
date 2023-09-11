package team21.solsolpokect.diary.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import team21.solsolpokect.common.entity.DateUtils;
import team21.solsolpokect.common.exception.CustomException;
import team21.solsolpokect.common.exception.ErrorType;
import team21.solsolpokect.diary.dto.request.feedback.FeedbackRequestDto;
import team21.solsolpokect.diary.dto.response.feedback.FeedbackInfosResponseDto;
import team21.solsolpokect.diary.entity.Feedback;
import team21.solsolpokect.diary.repository.FeedbackRepository;
import team21.solsolpokect.user.entity.Users;
import team21.solsolpokect.user.repository.UsersRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final UsersRepository usersRepository;

    public void feedbackCreate(FeedbackRequestDto requestDto) {

        String contents = requestDto.getContents();
        Long userId = requestDto.getUserId();

        Optional<Users> users = usersRepository.findById(userId);
        if(users.isEmpty()) throw new CustomException(ErrorType.NOT_FOUND_USER);

        Feedback feedback = Feedback.of(contents, users.get());
        feedbackRepository.save(feedback);
    }

    public void feedbackUpdate(Long feedbackId, FeedbackRequestDto requestDto) {

        Optional<Feedback> feedback = feedbackRepository.findById(feedbackId);
        if(feedback.isEmpty()) throw new CustomException(ErrorType.NOT_FOUND_FEEDBACK);

        if(usersRepository.findById(requestDto.getUserId()).isEmpty()) throw new CustomException(ErrorType.NOT_FOUND_USER);
        feedback.get().update(requestDto.getContents());
    }

    public List<FeedbackInfosResponseDto> feedbackInfos(Long userId, String year, String month) {

        List<Feedback> feedbackList = feedbackRepository.findAllByUserIdAndCreatedAtBetween(userId, DateUtils.getStartOfMonth(year,month), DateUtils.getEndOfMonth(year,month));
        List<FeedbackInfosResponseDto> answer = new ArrayList<>();
        for(Feedback f : feedbackList){
            if (f != null) {
                answer.add(FeedbackInfosResponseDto.of(f.getId(), f.getContents(), f.getCreatedAt(), f.getUpdateAt()));
            }
        }
        return answer;
    }
}
