package team21.solsolpokect.user.dto.request;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class SignupRequestDto {

    private String role;
    private String username;
    private String account;
    @NotBlank(message = "필수 정보입니다.")
    @Pattern(regexp = "^[a-z0-9]{2,20}$", message = "아이디는 2~20자의 영문 소문자, 숫자만 사용 가능합니다.")
    private String userId;

    @NotBlank(message = "필수 정보입니다.")
    @Pattern(regexp = "^[a-zA-Z0-9~!@#$%^&*()_+=?,./<>{}\\[\\]\\-]{8,16}$", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
    private String password;
}
