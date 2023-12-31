package team21.solsolpokect.transfer.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team21.solsolpokect.common.exception.CustomException;
import team21.solsolpokect.common.exception.ErrorType;
import team21.solsolpokect.transfer.dto.request.AutoTransferCreateRequestDto;
import team21.solsolpokect.transfer.dto.request.AutoTransferUpdateRequestDto;
import team21.solsolpokect.transfer.dto.response.AutoTransferResponseDto;
import team21.solsolpokect.transfer.entity.AutoTransfer;
import team21.solsolpokect.transfer.repository.AutoTransferRepository;
import team21.solsolpokect.user.entity.Users;
import team21.solsolpokect.user.repository.UsersRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AutoTransferService {

    private final AutoTransferRepository autoTransferRepository;
    private final UsersRepository usersRepository;

    public AutoTransferResponseDto autoTransferCreate(AutoTransferCreateRequestDto autoTransferCreateRequestDto) {
        Optional<Users> user = usersRepository.findById(autoTransferCreateRequestDto.getUserId());

        if(user.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_USER);

        AutoTransfer autoTransfer = autoTransferRepository.save(AutoTransfer.of(autoTransferCreateRequestDto, user.get()));

        return AutoTransferResponseDto.from(autoTransfer);
    }

    public List<AutoTransferResponseDto> autoTransferList(Long userId) {
        Optional<Users> user = usersRepository.findByIdAndDeletedAtIsNull(userId);

        if(user.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_USER);

        List<AutoTransfer> autoTransferList =
                autoTransferRepository.findAllByUserIdAndDeletedAtIsNull(userId);

        List<AutoTransferResponseDto> autoTransferResponseDtoList = new ArrayList<>();

        for (AutoTransfer a : autoTransferList) {
            autoTransferResponseDtoList.add(AutoTransferResponseDto.from(a));
        }

        return autoTransferResponseDtoList;
    }

    public void autoTransferUpdate(Long transferId, AutoTransferUpdateRequestDto autoTransferUpdateRequestDto) {
        Optional<AutoTransfer> autoTransfer = autoTransferRepository.findByIdAndDeletedAtIsNull(transferId);

        if(autoTransfer.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_AUTO_TRANSFER);

        autoTransfer.get().update(autoTransferUpdateRequestDto);
    }

    public void autoTransferDelete(Long transferId) {
        Optional<AutoTransfer> autoTransfer = autoTransferRepository.findByIdAndDeletedAtIsNull(transferId);

        if(autoTransfer.isEmpty())
            throw new CustomException(ErrorType.NOT_FOUND_AUTO_TRANSFER);

        autoTransferRepository.delete(autoTransfer.get());
    }
}
