package com.IsmailMabrouki.Transpoz.auth;


import com.IsmailMabrouki.Transpoz.client.Client;
import com.IsmailMabrouki.Transpoz.client.ClientRepository;
import com.IsmailMabrouki.Transpoz.driver.Driver;
import com.IsmailMabrouki.Transpoz.driver.DriverRepository;
import com.IsmailMabrouki.Transpoz.email.EmailService;
import com.IsmailMabrouki.Transpoz.email.EmailTemplateName;
import com.IsmailMabrouki.Transpoz.role.Role;
import com.IsmailMabrouki.Transpoz.role.RoleRepository;
import com.IsmailMabrouki.Transpoz.role.UserRole;
import com.IsmailMabrouki.Transpoz.security.JwtService;
import com.IsmailMabrouki.Transpoz.authUsers.Token;
import com.IsmailMabrouki.Transpoz.authUsers.TokenRepository;
import com.IsmailMabrouki.Transpoz.authUsers.User;
import com.IsmailMabrouki.Transpoz.authUsers.UserRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final TokenRepository tokenRepository;
    private final RoleRepository roleRepository;
    private final DriverRepository driverRepository;
    private  final ClientRepository clientRepository;

    @Value("${application.security.jwt.mailing.frontend.activation-url}")
    private String activationUrl;

    //        Optional<Role> optionalRole = roleRepository.findByName(request.getRole());
//        Role userRoleEntity = optionalRole.get(); // Extract the Role object (throws NoSuchElementException if empty)
    // Assuming a method to find Role by name
    // user.setRole(userRole);
//                // todo - better exception handling
//                .orElseThrow(() -> new IllegalStateException("ROLE USER was not initiated"));
//        UserRole userRole = User.getRoleFromString(String.valueOf(request.getRole()));


    public void register(RegistrationRequest request) throws MessagingException {
//        Optional<Role> existingRole = roleRepository.findByName(request.getRole());
//        Role role;
//        if (existingRole.isEmpty()) {
//             role = new Role();
//            role.setName(request.getRole());
//        } else role = existingRole.get();

//         role = new Role();
//                role.setName(request.getRole());
//        var role = Role.builder()
//                .name(UserRole.valueOf(request.getRole()))
//                .build();
//        roleRepository.save(role);
        // Attempt to convert role string to enum

        var role = Role.builder()
                .name(UserRole.valueOf(request.getRole()))
                .build();
        Optional<Role> existingRole = roleRepository.findByName(role.getName());
        if (existingRole.isEmpty()) {
            roleRepository.save(role);
        } else role = existingRole.get();
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .enabled(false)
                .role(role) //userRoleEntity
                .build();
        userRepository.save(user);


        sendValidationEmail(user);
        // Add user to specific repository based on role (assuming repositories exist)
        if (user.getRole().getName().equals(UserRole.DRIVER)) {
            Driver driver= Driver.builder()
                    // Set any relevant client-specific fields (e.g., address, phone number)
                    .id(user.getId() != null ? user.getId().longValue() : null)
                    .name(user.getFullName())
                    .email(user.getEmail())
                    .build();
            driverRepository.save(driver); // Assuming conversion to Driver entity
        } else if (user.getRole().getName().equals(UserRole.USER)) {
            Client client = Client.builder()
                    // Set any relevant client-specific fields (e.g., address, phone number)
                    .id(user.getId() != null ? user.getId().longValue() : null)
                    .name(user.getFullName())
                    .email(user.getEmail())
                    .build();
            clientRepository.save(client); // Assuming conversion to Client entity
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var claims = new HashMap<String, Object>();
        var user = ((User) auth.getPrincipal());
        claims.put("fullName", user.getFullName());

        var jwtToken = jwtService.generateToken(claims, (User) auth.getPrincipal());
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userId(String.valueOf(user.getId()))
                .build();
    }

    @Transactional
    public void activateAccount(String token) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token)
                // todo exception has to be defined
                .orElseThrow(() -> new RuntimeException("Invalid token"));
        if (LocalDateTime.now().isAfter(savedToken.getExpiredAt())) {
            sendValidationEmail(savedToken.getUser());
            throw new RuntimeException("Activation token has expired. A new token has been send to the same email address");
        }

        var user = userRepository.findById(savedToken.getUser().getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setEnabled(true);
        userRepository.save(user);

        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(savedToken);
    }

    private String generateAndSaveActivationToken(User user) {
        // Generate a token
        String generatedToken = generateActivationCode(6);
        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiredAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        tokenRepository.save(token);

        return generatedToken;
    }

    private void sendValidationEmail(User user) throws MessagingException {
        var newToken = generateAndSaveActivationToken(user);

        emailService.sendEmail(
                user.getEmail(),
                user.getFullName(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl,
                newToken,
                "Account activation"
        );
    }

    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();

        SecureRandom secureRandom = new SecureRandom();

        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }

        return codeBuilder.toString();
    }
}