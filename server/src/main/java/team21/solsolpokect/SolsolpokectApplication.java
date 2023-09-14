package team21.solsolpokect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableJpaAuditing
@EnableScheduling
@SpringBootApplication
public class SolsolpokectApplication {

	public static void main(String[] args) {
		SpringApplication.run(SolsolpokectApplication.class, args);
	}

}
