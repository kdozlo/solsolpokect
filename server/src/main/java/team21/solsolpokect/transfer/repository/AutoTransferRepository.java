package team21.solsolpokect.transfer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import team21.solsolpokect.mission.entity.Mission;
import team21.solsolpokect.transfer.entity.AutoTransfer;

import java.util.List;
import java.util.Optional;

public interface AutoTransferRepository extends JpaRepository<AutoTransfer,Long> {

    @Query("SELECT a FROM AutoTransfer a WHERE a.deletedAt IS NULL  ORDER BY a.createdAt DESC")
    List<AutoTransfer> findAllByUserId(Long userId);

    @Query("SELECT a FROM AutoTransfer a WHERE a.deletedAt IS NULL")
    Optional<AutoTransfer> findById(Long id);
}
