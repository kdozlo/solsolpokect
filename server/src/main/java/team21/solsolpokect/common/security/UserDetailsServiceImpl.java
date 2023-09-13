package team21.solsolpokect.common.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import team21.solsolpokect.common.exception.ErrorType;
import team21.solsolpokect.user.entity.Users;
import team21.solsolpokect.user.repository.UsersRepository;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UsersRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        Users user = userRepository.findByUserIdAndDeletedAtIsNull(userId)
                .orElseThrow(() -> new UsernameNotFoundException(ErrorType.NOT_FOUND_USER.getMsg()));   // 사용자가 DB 에 없으면 예외처리

        return new UserDetailsImpl(user, user.getUserId());   // 사용자 정보를 UserDetails 로 반환
    }

}