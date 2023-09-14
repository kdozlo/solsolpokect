package team21.solsolpokect.common.infra;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ShinhanApiController {

    private final ShinhanApiService shinhanApiService;

    @GetMapping("/api/callShinhanApi")
    public ResponseEntity<String> callShinhanApi() throws JsonProcessingException {

        return shinhanApiService.callShinhanApi();
    }

    @PostMapping("/api/callTransfer")
    @Scheduled(fixedDelay = 10000) //테스트 용
//    @Scheduled(cron = "* * * 1 * *") //실제 서비스 시 - 매달 1일 마다
    public List<ResponseEntity<String>> callShinhanTransferApi() throws JsonProcessingException {

        return shinhanApiService.callShinhanTransferApi();
    }

}

