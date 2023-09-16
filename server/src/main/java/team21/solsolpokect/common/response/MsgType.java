package team21.solsolpokect.common.response;

import lombok.Getter;

@Getter
public enum MsgType {

    DIARY_CHECK_SUCCESSFULLY("가계부 조회 성공"),
    GOAL_MONEY_CREATE_SUCCESSFULLY("월별 목표 금액 설정 성공"),
    GOAL_MONEY_DETAIL_SUCCESSFULLY("월별 목표 금액 조회 성공"),
    FEEDBACK_CREATE_SUCCESSFULLY("피드백 작성 성공"),
    MISSION_CREATE_SUCCESSFULLY("도전 과제 생성 성공"),
    MISSION_ALLOW_SUCCESSFULLY("도전 과제 요청 성공"),
    MISSION_REJECT_SUCCESSFULLY("도전 과제 거부 성공"),
    MISSION_LIST_SUCCESSFULLY("도전 과제 목록 조회 성공"),
    MISSION_DETAIL_SUCCESSFULLY("도전 과제 상세 조회 성공"),
    MISSION_DELETE_SUCCESSFULLY("도전 과제 삭제 성공"),
    MISSION_ALLOW_PICTURE_SUCCESSFULLY("도전 과제 인증 사진 전송 성공"),
    MISSION_COMPLETE_SUCCESSFULLY("도전 과제 완료 전송 성공"),
    FEEDBACK_UPDATE_SUCCESSFULLY("피드백 수정 성공"),
    FEEDBACK_CHECK_SUCCESSFULLY("피드백 조회 성공"),
    AUTO_TRANSFER_CREATE_SUCCESSFULLY("자동 이체 생성 성공"),
    AUTO_TRANSFER_LIST_SUCCESSFULLY("자동 이체 목록 조회 성공"),
    AUTO_TRANSFER_UPDATE_SUCCESSFULLY("자동 이체 수정 성공"),
    AUTO_TRANSFER_DELETE_SUCCESSFULLY("자동 이체 삭제 성공"),
    FAMILY_CREATE_SUCCESSFULLY("가족 생성 성공"),
    FAMILY_DETAIL_SUCCESSFULLY("가족 정보 조회 성공"),
    SIGNUP_SUCCESSFULLY("회원가입 성공"),
    LOGIN_SUCCESSFULLY("로그인 성공"),
    USER_INFO_SUCCESSFULLY("유저정보 조회 성공"),
    DAILY_SCORE_CREATE_SUCCESSFULLY("일일 점수 작성 성공"),
    DAILY_SCORE_UPDATE_SUCCESSFULLY("일일 점수 수정 성공"),
    DAILY_SCORE_DETAIL_SUCCESSFULLY("일일 점수 조회 성공"),
    ;

    private final String msg;

    MsgType(String msg) {
        this.msg = msg;
    }
}
