package com.IsmailMabrouki.Transpoz.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.IsmailMabrouki.Transpoz.role.UserRole.*;
import static com.IsmailMabrouki.Transpoz.authUsers.Permission.*;
import static org.springframework.security.config.Customizer.withDefaults;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {

    private final JwtFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req ->
                        req.requestMatchers(
                                        "/auth/**",
                                        "/v2/api-docs",
                                        "/v3/api-docs",
                                        "/v3/api-docs/**",
                                        "/swagger-resources",
                                        "/swagger-resources/**",
                                        "/configuration/ui",
                                        "/configuration/security",
                                        "/swagger-ui/**",
                                        "/webjars/**",
                                        "/swagger-ui.html"
                                )
                                .permitAll()
                                .requestMatchers("/admin/**").hasRole(ADMIN.name())
                                .requestMatchers(HttpMethod.GET, "/admin/**").hasAnyAuthority(ADMIN_READ.name())
                                .requestMatchers(HttpMethod.POST, "/admin/**").hasAuthority(ADMIN_CREATE.name())
                                .requestMatchers(HttpMethod.PUT, "/admin/**").hasAuthority(ADMIN_UPDATE.name())
                                .requestMatchers(HttpMethod.DELETE, "/admin/**").hasAuthority(ADMIN_DELETE.name())
                                .requestMatchers("/user/**").hasRole(USER.name())
                                .requestMatchers(HttpMethod.GET, "/user/**").hasAuthority(USER_READ.name())
                                .requestMatchers(HttpMethod.POST, "/user/**").hasAuthority(USER_CREATE.name())
                                .requestMatchers(HttpMethod.PUT, "/user/**").hasAuthority(USER_UPDATE.name())
                                .requestMatchers(HttpMethod.DELETE, "/user/**").hasAuthority(USER_DELETE.name())


                                .anyRequest()
                                .authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}