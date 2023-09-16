package team21.solsolpokect.common.redis;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import team21.solsolpokect.common.exception.CustomException;
import team21.solsolpokect.common.exception.ErrorType;

import java.time.Duration;
import java.util.concurrent.TimeUnit;
import java.util.function.Supplier;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedisLockRepository {

    private final RedisTemplate<String, String> redisTemplate;
    private final RedissonClient redissonClient;

    public Boolean lock(final String key) {
        return redisTemplate
                .opsForValue()
                //setnx 명령어 사용 - key(key) value("lock")
                .setIfAbsent(generateKey(key), "lock", Duration.ofMillis(3_000));
    }

    public Boolean unlock(final String key) {
        return redisTemplate.delete(generateKey(key));
    }

    private String generateKey(final String key) {
        return key;
    }

    public <T> void runOnLock(String key, Supplier<T> task) {
        RLock lock = redissonClient.getLock("EnterLock" + key);
        try {
            //선행 락 점유 스레드가 존재하면 waitTime동안 락 점유를 기다리며 leaseTime 시간 이후로는 자동으로 락이 해제되기 때문에 다른 스레드도 일정 시간이 지난 후 락을 점유할 수 있습니다.
            if (!lock.tryLock(10, 10, TimeUnit.SECONDS)) {
                log.info("락 획득 실패");
                throw new CustomException(ErrorType.FAILED_TO_ACQUIRE_LOCK);
            }
            log.info("락 획득 성공");
            task.get();
        } catch (InterruptedException e) {
            log.info("catch문 실행");
            Thread.currentThread().interrupt();
            throw new CustomException(ErrorType.INTERRUPTED_WHILE_WAITING_FOR_LOCK);
        } finally {
            log.info("finally문 실행");
            if (lock != null && lock.isLocked() && lock.isHeldByCurrentThread()) {
                lock.unlock();
                log.info("언락 실행");
            }
        }
    }
}
