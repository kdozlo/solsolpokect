package team21.solsolpokect.common.infra;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public List<ResponseEntity<String>> callShinhanTransferApi() throws JsonProcessingException {

        return shinhanApiService.callShinhanTransferApi();
    }

}

