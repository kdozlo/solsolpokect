package team21.solsolpokect.common.infra;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class ShinhanApiService {

    private final RestTemplate restTemplate;
    private final String accountNumber = "110184999999";
    @Value("${shinhan.api.url}")
    private String apiUrl;

    @Value("${shinhan.api.key}")
    private String apiKey;

    public ShinhanApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    public ResponseEntity<String> callShinhanApi() {
        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("apikey", apiKey);

        // 요청 바디 설정
        Map<String, String> dataHeader = new HashMap<>();
        dataHeader.put("apikey", apiKey);

        Map<String, String> dataBody = new HashMap<>();
        dataBody.put("계좌번호", accountNumber);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("dataHeader", dataHeader);
        requestBody.put("dataBody", dataBody);

        // REST 템플릿을 사용하여 API 호출
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> responseEntity = restTemplate.exchange(
                    apiUrl+"/v1/search/transaction",
                    HttpMethod.POST,
                    requestEntity,
                    String.class
            );

            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                return responseEntity;
            } else {
                // API 응답이 실패인 경우에 대한 처리
                System.out.println("API 응답 실패: " + responseEntity.getStatusCode());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("API 호출 실패");
            }
        } catch (HttpClientErrorException e) {
            // API 응답이 4xx인 경우에 대한 처리
            System.out.println("4xx 에러: " + e.getRawStatusCode());
            return ResponseEntity.status(e.getRawStatusCode()).body(e.getResponseBodyAsString());
        } catch (Exception e) {
            // 그 외 예외 발생 시 처리
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("알 수 없는 오류 발생");
        }
    }
}

