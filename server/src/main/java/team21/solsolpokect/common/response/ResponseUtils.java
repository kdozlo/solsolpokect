package team21.solsolpokect.common.response;


import team21.solsolpokect.common.exception.ErrorResponse;

public class ResponseUtils {

    public static <T> ApiResponseDto<T> ok(T data, MsgType msg) {
        return ApiResponseDto.<T>builder()
                .data(data)
                .msg(msg.getMsg())
                .build();
    }

    public static ApiResponseDto<Void> ok(MsgType msg) {
        return ApiResponseDto.<Void>builder()
                .msg(msg.getMsg())
                .build();
    }

    public static ApiResponseDto<Void> error(ErrorResponse error) {
        return ApiResponseDto.<Void>builder()
                .error(error)
                .build();
    }
}
