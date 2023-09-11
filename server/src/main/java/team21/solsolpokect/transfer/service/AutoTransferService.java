package team21.solsolpokect.transfer.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import team21.solsolpokect.common.exception.CustomException;
import team21.solsolpokect.common.exception.ErrorType;
import team21.solsolpokect.mission.entity.Mission;
import team21.solsolpokect.transfer.dto.request.AutoTransferCreateRequestDto;
import team21.solsolpokect.transfer.entity.AutoTransfer;
import team21.solsolpokect.transfer.repository.AutoTransferRepository;
import team21.solsolpokect.user.entity.Users;
import team21.solsolpokect.user.repository.UsersRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AutoTransferService {

    AutoTransferRepository autoTransferRepository;
    private final UsersRepository usersRepository;

    public void autoTransferCreate(AutoTransferCreateRequestDto autoTransferCreateRequestDto) {
        Optional<Users> user = usersRepository.findById(autoTransferCreateRequestDto.getUserId());

        if(user.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_USER);

        autoTransferRepository.save(AutoTransfer.of(autoTransferCreateRequestDto, user.get()));
    }
}
