package team21.solsolpokect.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import team21.solsolpokect.common.response.ApiResponseDto;
import team21.solsolpokect.common.response.MsgType;
import team21.solsolpokect.common.response.ResponseUtils;
import team21.solsolpokect.user.dto.request.LoginRequestDto;
import team21.solsolpokect.user.dto.request.SignupRequestDto;
import team21.solsolpokect.user.dto.response.UsersInfoResponseDto;
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
    public ApiResponseDto<UsersInfoResponseDto> login(@RequestBody LoginRequestDto requestDto, HttpServletResponse response){


        return ResponseUtils.ok(usersService.login(requestDto,response), MsgType.LOGIN_SUCCESSFULLY);
    }

    @GetMapping("/info/{user-id}")
    public ApiResponseDto<UsersInfoResponseDto> userInfo(@PathVariable("user-id") Long id) {
        return ResponseUtils.ok(usersService.userInfo(id),MsgType.USER_INFO_SUCCESSFULLY);
    }
}
