package team21.solsolpokect.diary.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team21.solsolpokect.common.entity.DateUtils;
import team21.solsolpokect.common.exception.CustomException;
import team21.solsolpokect.common.exception.ErrorType;
import team21.solsolpokect.diary.dto.request.feedback.FeedbackRequestDto;
import team21.solsolpokect.diary.dto.response.feedback.FeedbackInfosResponseDto;
import team21.solsolpokect.diary.entity.Diary;
import team21.solsolpokect.diary.entity.Feedback;
import team21.solsolpokect.diary.repository.DiaryRepository;
import team21.solsolpokect.diary.repository.FeedbackRepository;
import team21.solsolpokect.user.entity.Users;
import team21.solsolpokect.user.repository.UsersRepository;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final UsersRepository usersRepository;
    private final DiaryRepository diaryRepository;

    public void feedbackCreate(FeedbackRequestDto requestDto) {

//        if (!now().getDayOfWeek().equals(DayOfWeek.SUNDAY)) {
//            throw new CustomException(ErrorType.TODAY_IS_NOT_SUNDAY);
//        }
        String contents = requestDto.getContents();
        Long userId = requestDto.getUserId();

        Optional<Users> users = usersRepository.findByIdAndDeletedAtIsNull(userId);
        if(users.isEmpty()) throw new CustomException(ErrorType.NOT_FOUND_USER);

        Feedback feedback = Feedback.of(contents, users.get());
        feedbackRepository.save(feedback);

        Optional<Diary> diary = diaryRepository.findById(requestDto.getDairyId());
        if(diary.isEmpty()) throw new CustomException(ErrorType.NOT_FOUND_DIARY);

        diary.get().feedbackUpdate(feedback);
    }

    public void feedbackUpdate(Long feedbackId, FeedbackRequestDto requestDto) {

        Optional<Feedback> feedback = feedbackRepository.findByIdAndDeletedAtIsNull(feedbackId);
        if(feedback.isEmpty()) throw new CustomException(ErrorType.NOT_FOUND_FEEDBACK);

        Optional<Users> users = usersRepository.findByIdAndDeletedAtIsNull(requestDto.getUserId());
        if(users.isEmpty()) throw new CustomException(ErrorType.NOT_FOUND_USER);

        Optional<Diary> dairy = diaryRepository.findById(requestDto.getDairyId());
        if(dairy.isEmpty()) throw new CustomException(ErrorType.NOT_FOUND_DIARY);

        if (users.get().getId() != feedback.get().getUsers().getId()) {
            throw new CustomException(ErrorType.NOT_MATCHING_INFO);
        }

        if(usersRepository.findByIdAndDeletedAtIsNull(requestDto.getUserId()).isEmpty()) throw new CustomException(ErrorType.NOT_FOUND_USER);
        feedback.get().update(requestDto.getContents());
    }

    public List<FeedbackInfosResponseDto> feedbackInfos(Long userId, String year, String month) {

        Optional<Users> users = usersRepository.findByIdAndDeletedAtIsNull(userId);
        if(users.isEmpty()) throw new CustomException(ErrorType.NOT_FOUND_USER);

        List<Feedback> feedbackList = feedbackRepository.findAllByUsersAndCreatedAtBetweenAndDeletedAtIsNull(users.get(), DateUtils.getStartOfMonth(year,month), DateUtils.getEndOfMonth(year,month));
        List<FeedbackInfosResponseDto> answer = new ArrayList<>();
        for(Feedback f : feedbackList){
            if (f != null) {
                answer.add(FeedbackInfosResponseDto.of(f.getId(), f.getContents(), f.getCreatedAt(), f.getUpdatedAt()));
            }
        }
        return answer;
    }
}
