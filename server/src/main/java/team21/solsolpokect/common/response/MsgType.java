package team21.solsolpokect.common.response;

import lombok.Getter;

@Getter
public enum MsgType {

    DIARY_CHECK_SUCCESSFULLY("가계부 조회 성공"),
    DIARY_CREATE_SUCCESSFULLY("피드백 작성 성공"),
    GOAL_MONEY_CREATE_SUCCESSFULLY("월별 목표 금액 설정 성공"),
    FEEDBACK_CREATE_SUCCESSFULLY("피드백 작성 성공"),
    MISSION_CREATE_SUCCESSFULLY("도전 과제 생성 성공"),
    MISSION_ALLOW_SUCCESSFULLY("도전 과제 요청 성공"),
    MISSION_REJECT_SUCCESSFULLY("도전 과제 거부 성공"),
    MISSION_LIST_SUCCESSFULLY("도전 과제 목록 조회 성공"),
    MISSION_DETAIL_SUCCESSFULLY("도전 과제 상세 조회 성공"),
    MISSION_DELETE_SUCCESSFULLY("도전 과제 삭제 성공"),
    MISSION_ALLOW_PICTURE_SUCCESSFULLY("도전 과제 인증 사진 전송 성공"),
    MISSION_COMPLETE_SUCCESSFULLY("도전 과제 완료 전송 성공"),
    AUTOTRANSFER_CREATE_SUCCESSFULLY("자동 이체 생성 성공"),
    AUTOTRANSFER_LIST_SUCCESSFULLY("자동 이체 목록 조회 성공"),
    ;

    private final String msg;

    MsgType(String msg) {
        this.msg = msg;
    }
}
