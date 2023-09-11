package team21.solsolpokect.common.exception;

import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
public enum ErrorType {
    NOT_FOUND_USER(401, "등록된 사용자가 없습니다."),
    NOT_FOUND_MISSION(401, "등록된 도전과제가 없습니다."),
    NOT_FOUND_FEEDBACK(401, "등록된 피드백이 없습니다."),
    NOT_FOUND_AUTO_TRANSFER(401, "등록된 자동이체가 없습니다"),
    ;
    private int code;
    private String msg;

    ErrorType(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
