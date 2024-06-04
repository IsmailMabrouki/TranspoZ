package com.IsmailMabrouki.Transpoz;

//import com.IsmailMabrouki.Transpoz.auth.AuthenticationService;
//import com.IsmailMabrouki.Transpoz.auth.RegistrationRequest;
import com.IsmailMabrouki.Transpoz.role.Role;
import com.IsmailMabrouki.Transpoz.role.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAsync
@SpringBootApplication
public class TranspoZServerApplication {

	public static void main(String[] args) {

		SpringApplication.run(TranspoZServerApplication.class, args);
	}
//	@Bean
//	public CommandLineRunner runner(RoleRepository roleRepository) {
//		return args -> {
//			if (roleRepository.findByName("USER").isEmpty()) {
//				roleRepository.save(Role.builder().name("USER").build());
//			}
//			var admin = RegistrationRequest.builder()
//					.firstname("Admin")
//					.lastname("Admin")
//					.email("superadmin@mail.com")
//					.password("password")
//					.role(ADMIN)
//					.build();
//			System.out.println("Admin token: " + service.register(admin).getAccessToken());
//
//			var transporter = RegistrationRequest.builder()
//					.firstname("Driver")
//					.lastname("Driver")
//					.email("Driver@mail.com")
//					.password("password")
//					.role(TRANS)
//					.build();
//			System.out.println("Transporter token: " + service.register(transporter).getAccessToken());
	//	};

}

