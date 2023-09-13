package team21.solsolpokect.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import team21.solsolpokect.common.exception.CustomException;
import team21.solsolpokect.common.exception.ErrorType;
import team21.solsolpokect.common.jwt.JwtUtil;
import team21.solsolpokect.user.dto.request.LoginRequestDto;
import team21.solsolpokect.user.dto.request.SignupRequestDto;
import team21.solsolpokect.user.entity.Users;
import team21.solsolpokect.user.repository.UsersRepository;

import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsersService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public void signup(SignupRequestDto requestDto) {

        String encodePw = passwordEncoder.encode(requestDto.getPassword());

        Optional<Users> isExist = usersRepository.findByUserIdAndDeletedAtIsNull(requestDto.getUserId());
        if(isExist.isPresent()){
            throw new CustomException(ErrorType.ALREADY_EXIST_USERID);
        }

        Users users = Users.of(requestDto.getUserId(), encodePw, requestDto.getRole(), requestDto.getAccount(), requestDto.getUsername());
        usersRepository.save(users);
    }

    public void login(LoginRequestDto requestDto, HttpServletResponse response) {

        String userId = requestDto.getUserId();
        String password = requestDto.getPassword();

        Users user = usersRepository.findByUserIdAndDeletedAtIsNull(userId).orElseThrow(
                () -> new CustomException(ErrorType.NOT_MATCHING_INFO)
        );

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new CustomException(ErrorType.NOT_MATCHING_INFO);
        }

        String token = jwtUtil.createToken(user.getUserId());
        response.addHeader(JwtUtil.AUTHORIZATION_HEADER, token);
    }
}
