package team21.solsolpokect.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team21.solsolpokect.common.exception.CustomException;
import team21.solsolpokect.common.exception.ErrorType;
import team21.solsolpokect.common.jwt.JwtUtil;
import team21.solsolpokect.user.dto.request.LoginRequestDto;
import team21.solsolpokect.user.dto.request.SignupRequestDto;
import team21.solsolpokect.user.dto.response.UsersInfoResponseDto;
import team21.solsolpokect.user.entity.Users;
import team21.solsolpokect.user.repository.UsersRepository;

import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UsersService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public void signup(SignupRequestDto requestDto) {

        if (!requestDto.getRole().equals("부모") || !requestDto.getRole().equals("자녀")) {
            throw new CustomException(ErrorType.NOT_MATCHING_ROLE);
        }

        String encodePw = passwordEncoder.encode(requestDto.getPassword());

        Optional<Users> isExist = usersRepository.findByUserIdAndDeletedAtIsNull(requestDto.getUserId());
        if(isExist.isPresent()){
            throw new CustomException(ErrorType.ALREADY_EXIST_USERID);
        }

        Users users = Users.of(requestDto.getUserId(), encodePw, requestDto.getRole(), requestDto.getAccount(), requestDto.getUsername());
        usersRepository.save(users);
    }

    public UsersInfoResponseDto login(LoginRequestDto requestDto, HttpServletResponse response) {

        String userId = requestDto.getUserId();
        String password = requestDto.getPassword();

        Optional<Users> user = usersRepository.findByUserIdAndDeletedAtIsNull(userId);
        if(user.isEmpty())throw new CustomException(ErrorType.NOT_MATCHING_INFO);

        if (!passwordEncoder.matches(password, user.get().getPassword())) {
            throw new CustomException(ErrorType.NOT_MATCHING_INFO);
        }

        String token = jwtUtil.createToken(user.get().getUserId());
        response.addHeader(JwtUtil.AUTHORIZATION_HEADER, token);

        return getUsersInfoResponseDto(user);
    }

    public UsersInfoResponseDto userInfo(Long id) {
        Optional<Users> user = usersRepository.findByIdAndDeletedAtIsNull(id);
        if(user.isEmpty()) throw new CustomException(ErrorType.NOT_FOUND_USER);

        return getUsersInfoResponseDto(user);
    }

    private static UsersInfoResponseDto getUsersInfoResponseDto(Optional<Users> user) {
        String role = user.get().getRole();
        String username = user.get().getUserName();
        Long familyId = 0L;
        if(user.get().getFamily()!=null) familyId = user.get().getFamily().getId();
        String account = user.get().getAccount();
        int creditScore = user.get().getCreditScore();

        return UsersInfoResponseDto.of(role, username, familyId, account, creditScore);
    }
}
