package team21.solsolpokect.diary.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team21.solsolpokect.common.entity.DateUtils;
import team21.solsolpokect.common.exception.CustomException;
import team21.solsolpokect.common.exception.ErrorType;
import team21.solsolpokect.common.infra.ShinhanApiService;
import team21.solsolpokect.diary.dto.request.diary.DiaryScoreRequestDto;
import team21.solsolpokect.diary.dto.response.diary.DiaryInfoDetailResponseDto;
import team21.solsolpokect.diary.entity.Diary;
import team21.solsolpokect.diary.repository.DiaryRepository;
import team21.solsolpokect.user.entity.Users;
import team21.solsolpokect.user.repository.UsersRepository;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.time.LocalDateTime.now;

@Service
@RequiredArgsConstructor
@Transactional
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final ShinhanApiService shinhanApiService;
    private final UsersRepository usersRepository;

    public List<DiaryInfoDetailResponseDto> diaryCheck(Long userId, String diaryDate) {

        Optional<Users> user = usersRepository.findByIdAndDeletedAtIsNull(userId);
        if (user.isEmpty()) throw new CustomException(ErrorType.NOT_FOUND_USER);

        // shinhanApiService.callShinhanApi() 메서드의 반환 타입은 ResponseEntity<String>입니다.
        ResponseEntity<String> responseEntity = shinhanApiService.callShinhanTransactionApi(user.get().getAccount());

        // ResponseEntity에서 실제 데이터를 추출
        String jsonData = responseEntity.getBody();

        // JSON 데이터를 Jackson ObjectMapper를 사용하여 파싱
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper.readTree(jsonData);

            // JSON 데이터에서 거래내역 배열을 가져옴
            JsonNode transactions = jsonNode.get("dataBody").get("거래내역");
            // 거래내역을 List<DiaryInfoDetailResponseDto>로 매핑
            List<DiaryInfoDetailResponseDto> diaryInfoList = new ArrayList<>();
            for (JsonNode transaction : transactions) {
                if (transaction.get("거래일자").asText().equals(diaryDate.replace("-",""))) {

                    DiaryInfoDetailResponseDto dto = DiaryInfoDetailResponseDto.of(
                            LocalDate.parse(transaction.get("거래일자").asText(), DateTimeFormatter.ofPattern("yyyyMMdd")),
                            LocalTime.parse(transaction.get("거래시간").asText(), DateTimeFormatter.ofPattern("HHmmss")),
                            transaction.get("출금금액").asInt(),
                            transaction.get("입금금액").asInt(),
                            transaction.get("내용").asText(),
                            transaction.get("잔액").asInt(),
                            transaction.get("거래점명").asText()
                    );
                    diaryInfoList.add(dto);
                }
            }

            return diaryInfoList;
        } catch (IOException e) {
            // 파싱 중 오류 처리
            e.printStackTrace();
            return null; // 또는 예외를 던질 수 있음
        }
    }

    public void scoreCreate(DiaryScoreRequestDto requestDto) {
        Optional<Users> user = usersRepository.findByIdAndDeletedAtIsNull(requestDto.getUserId());
        if (user.isEmpty()) throw new CustomException(ErrorType.NOT_FOUND_USER);

        Optional<Diary> d = diaryRepository.findByDailyDate(StringToLocalDateTime(requestDto.getDate()));
        if(d.isPresent())
            throw new CustomException(ErrorType.ALREADY_EXISTED_DIARY_SCORE);

        user.get().plusCreditScore(requestDto.getDailyScore());

        Diary diary = Diary.of(user.get(), StringToLocalDateTime(requestDto.getDate()), requestDto.getDailyScore());
        diaryRepository.save(diary);
    }

    public void scoreUpdate(Long diaryId, DiaryScoreRequestDto requestDto) {
        Optional<Users> user = usersRepository.findByIdAndDeletedAtIsNull(requestDto.getUserId());
        if (user.isEmpty()) throw new CustomException(ErrorType.NOT_FOUND_USER);

        Optional<Diary> diary = diaryRepository.findById(diaryId);
        if (diary.isEmpty()) throw new CustomException(ErrorType.NOT_FOUND_DIARY);

        user.get().minusCreditScore(diary.get().getDailyScore()); //기존 일일 점수 minus
        user.get().plusCreditScore(requestDto.getDailyScore()); //새로운 일일 점수 plus
        diary.get().scoreUpdate(requestDto.getDailyScore());
    }

    public int diaryScoreDetail(Long userId, String diaryDate) {
        Optional<Users> user = usersRepository.findByIdAndDeletedAtIsNull(userId);
        if (user.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_USER);

        Optional<Diary> diary = diaryRepository.findByDailyDate(StringToLocalDateTime(diaryDate));

        if(diary.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_DIARY);

        return diary.get().getDailyScore();
    }

    public LocalDateTime StringToLocalDateTime(String date) {
        date += "T00:00:00";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

        try {
            return LocalDateTime.parse(date, formatter);
        } catch (Exception e) {
            System.err.println("날짜 파싱 오류: " + e.getMessage());
        }
        return null;
    }
}
