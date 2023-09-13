package team21.solsolpokect.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team21.solsolpokect.common.response.ApiResponseDto;
import team21.solsolpokect.common.response.MsgType;
import team21.solsolpokect.common.response.ResponseUtils;
import team21.solsolpokect.user.dto.request.LoginRequestDto;
import team21.solsolpokect.user.dto.request.SignupRequestDto;
import team21.solsolpokect.user.service.UsersService;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
public class UsersController {

    private final UsersService usersService;

    @PostMapping("/signup")
    public ApiResponseDto<Void> signup(@Valid @RequestBody SignupRequestDto requestDto) {

        usersService.signup(requestDto);
        return ResponseUtils.ok(MsgType.SIGNUP_SUCCESSFULLY);
    }

    @PostMapping("/login")
    public ApiResponseDto<Void> login(@RequestBody LoginRequestDto requestDto, HttpServletResponse response){

        usersService.login(requestDto,response);
        return ResponseUtils.ok(MsgType.LOGIN_SUCCESSFULLY);
    }
}
