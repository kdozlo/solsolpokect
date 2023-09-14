package team21.solsolpokect.diary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import team21.solsolpokect.diary.entity.Diary;

public interface DiaryRepository extends JpaRepository<Diary,Long> {
}
