package team21.solsolpokect.common.exception;

import lombok.Getter;

@Getter
public enum ErrorType {
    NOT_FOUND_USER(401, "등록된 사용자가 없습니다."),
    NOT_FOUND_MISSION(401, "등록된 도전과제가 없습니다."),
    NOT_FOUND_FEEDBACK(401, "등록된 피드백이 없습니다."),
    NOT_FOUND_AUTO_TRANSFER(401, "등록된 자동이체가 없습니다"),
    NOT_FOUND_FAMILY(401, "등록된 가족이 없습니다"),
    PICTURE_IS_NULL(400, "이미지가 첨부되지 않았습니다."),
    ALREADY_EXIST_USERID(401, "이미 존재하는 아이디입니다."),
    NOT_MATCHING_INFO(401, "회원 정보가 일치하지 않습니다."),
    NOT_TOKEN(401, "토큰이 없습니다."),
    NOT_VALID_TOKEN(401, "토큰이 유효하지 않습니다."),
    NOT_FOUND_DIARY(401, "등록된 가계부가 없습니다."),
    ;
    private int code;
    private String msg;

    ErrorType(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
