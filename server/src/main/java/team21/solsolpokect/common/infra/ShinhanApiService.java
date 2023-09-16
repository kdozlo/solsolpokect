package team21.solsolpokect.common.infra;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import team21.solsolpokect.transfer.entity.AutoTransfer;
import team21.solsolpokect.transfer.repository.AutoTransferRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ShinhanApiService {

    private final RestTemplate restTemplate;
    private final AutoTransferRepository autoTransferRepository;

    @Value("${shinhan.api.url}")
    private String apiUrl;

    @Value("${shinhan.api.key}")
    private String apiKey;

    public ShinhanApiService(RestTemplate restTemplate, AutoTransferRepository autoTransferRepository) {
        this.restTemplate = restTemplate;
        this.autoTransferRepository = autoTransferRepository;
    }
    public ResponseEntity<String> callShinhanTransactionApi(String account) {
        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("apikey", apiKey);

        // 요청 바디 설정
        Map<String, String> dataHeader = new HashMap<>();
        dataHeader.put("apikey", apiKey);

        Map<String, String> dataBody = new HashMap<>();
        dataBody.put("계좌번호", account);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("dataHeader", dataHeader);
        requestBody.put("dataBody", dataBody);

        // REST 템플릿을 사용하여 API 호출
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> responseEntity = restTemplate.exchange(
                    apiUrl + "/v1/search/transaction",
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

    public List<ResponseEntity<String>> callShinhanTransferApi() {
        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("apikey", apiKey);

        // 요청 바디 설정
        Map<String, String> dataHeader = new HashMap<>();
        dataHeader.put("apikey", apiKey);

        List<AutoTransfer> autoTransferList = autoTransferRepository.findAllByDeletedAtIsNull();

        List<ResponseEntity<String>> responseEntityList = new ArrayList<>();

        for (AutoTransfer at : autoTransferList) {
            Map<String, String> dataBody = new HashMap<>();
            dataBody.put("출금계좌번호", at.getUser().getAccount());
            dataBody.put("입금은행코드", "088");
            dataBody.put("입금계좌번호", at.getChildAccount());
            dataBody.put("이체금액", String.valueOf(at.getMoney()));
            dataBody.put("입금계좌통장메모", "보낸이-" + at.getUser().getUserName());
            dataBody.put("출금계좌통장메모", "용돈");

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("dataHeader", dataHeader);
            requestBody.put("dataBody", dataBody);

            // REST 템플릿을 사용하여 API 호출
            RestTemplate restTemplate = new RestTemplate();
            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

            try {
                ResponseEntity<String> responseEntity = restTemplate.exchange(
                        apiUrl + "/v1/transfer/krw",
                        HttpMethod.POST,
                        requestEntity,
                        String.class
                );

                if (responseEntity.getStatusCode() == HttpStatus.OK) {
                    System.out.println(responseEntity.getBody());
                    responseEntityList.add(responseEntity);
                } else {
                    // API 응답이 실패인 경우에 대한 처리
                    System.out.println("API 응답 실패: " + responseEntity.getStatusCode());
                    responseEntityList.add(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("API 호출 실패"));
                    return responseEntityList;
                }
            } catch (HttpClientErrorException e) {
                // API 응답이 4xx인 경우에 대한 처리
                System.out.println("4xx 에러: " + e.getRawStatusCode());
                responseEntityList.add(ResponseEntity.status(e.getRawStatusCode()).body(e.getResponseBodyAsString()));
                return responseEntityList;
            } catch (Exception e) {
                // 그 외 예외 발생 시 처리
                e.printStackTrace();
                responseEntityList.add(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("알 수 없는 오류 발생"));
                return responseEntityList;
            }

        }

        return responseEntityList;
    }
}
