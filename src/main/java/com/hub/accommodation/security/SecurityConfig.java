package com.hub.accommodation.security;

import com.hub.accommodation.security.jwt.JwtConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    private final JwtConfigurer jwtConfigurer;
    private final AuthenticationProvider authenticationProvider;

    public SecurityConfig(JwtConfigurer jwtConfigurer, AuthenticationProvider authenticationProvider) {
        this.jwtConfigurer = jwtConfigurer;
        this.authenticationProvider = authenticationProvider;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //отключили сессии, т.к. мы же будем работать через token, а не через сессии
                .and()
//                .authorizeRequests()
                .authorizeHttpRequests(auth ->
                        auth.antMatchers("/**", "/*", "/swagger-ui/**", "${api.ver}/**", /*"/swagger-ui.html", "/swagger-ui/index.html",*/ "/v3/api-docs",
                                "/login", "${api.ver}/auth/**", "/register").permitAll()
                .anyRequest()
                .authenticated()// позволяет пустить везде пользователя с ЛЮБЫМ правом доступа (grantedAuthority), лишь бы он был аутифицироват (т.е. прошел его логин и пароль)
                .and()
//              .addFilterAfter(jwtFilter, UsernamePasswordAuthenticationFilter.class) //в конце регистрируем созданный нами фильтр  JwtFilter после (after) стандартного Spring-Security фильтра класса UsernamePasswordAuthenticationFilter
//  фильтр JwtFilter -ключевой компонент связующий SpringSecurity и технологию JWT
                )
                .apply(jwtConfigurer); // jwtConfigurer внутри себя, как раз и добавляет наш самописный JwtFilter, т.е. реализует строчку выше: .addFilterAfter(jwtFilter, UsernamePasswordAuthenticationFilter.class)
        return http.build();
    }



    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.authenticationProvider(authenticationProvider);
        return authenticationManagerBuilder.build();
    }


    @Bean
    protected PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
}
