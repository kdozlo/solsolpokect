package team21.solsolpokect.transfer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import team21.solsolpokect.transfer.entity.AutoTransfer;

import java.util.List;
import java.util.Optional;

public interface AutoTransferRepository extends JpaRepository<AutoTransfer,Long> {

    List<AutoTransfer> findAllByUserIdAndDeletedAtIsNull(Long userId);
    List<AutoTransfer> findAllByDeletedAtIsNull();
    Optional<AutoTransfer> findByIdAndDeletedAtIsNull(Long id);
}
