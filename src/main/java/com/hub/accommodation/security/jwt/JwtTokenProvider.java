package com.hub.accommodation.security.jwt;

import com.hub.accommodation.exception.JwtAuthenticationException;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenProvider {
    private final UserDetailsService userDetailsService;
    @Value("${jwt.header}")
    private String authorizationHeader;

    @Value("${jwt.accessTokenSecretKey}")
    private String accessTokenSecretKey;
    @Value("${jwt.refreshTokenSecretKey}")
    private String refreshTokenSecretKey;
    @Value("${jwt.accessTokenExpiration}")
    private long accessTokenExpiration;
    @Value("${jwt.refreshTokenExpiration}")
    private long refreshTokenExpiration;


    @Value("jwt.passwordResetSecretKey")
    private String passwordResetSecretKey;
    @Value("jwt.passwordUpdateSecretKey")
    private String passwordUpdateSecretKey;
    @Value("${jwt.passwordResetExpiration}")
    private long passwordResetExpiration;
    @Value("${jwt.passwordUpdateExpiration}")
    private long passwordUpdateExpiration;


    public JwtTokenProvider(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @PostConstruct
    protected void init() {
        System.out.println("accessTokenSecretKey before conversion: " + accessTokenSecretKey);
        accessTokenSecretKey = Base64.getEncoder().encodeToString(accessTokenSecretKey.getBytes());
        System.out.println("accessTokenSecretKey after conversion: " + accessTokenSecretKey);
        System.out.println("refreshTokenSecretKey before conversion: " + refreshTokenSecretKey);
        refreshTokenSecretKey = Base64.getEncoder().encodeToString(refreshTokenSecretKey.getBytes());
        System.out.println("refreshTokenSecretKey after conversion: " + refreshTokenSecretKey);
        System.out.println("passwordResetSecretKey before conversion: " + passwordResetSecretKey);
        passwordResetSecretKey = Base64.getEncoder().encodeToString(passwordResetSecretKey.getBytes());
        System.out.println("passwordResetSecretKey after conversion: " + passwordResetSecretKey);
        System.out.println("passwordUpdateSecretKey before conversion: " + passwordUpdateSecretKey);
        passwordUpdateSecretKey = Base64.getEncoder().encodeToString(passwordUpdateSecretKey.getBytes());
        System.out.println("passwordUpdateSecretKey after conversion: " + passwordUpdateSecretKey);
    }


    public String createToken(String username, String role, Long id) {
        Claims claims = Jwts.claims().setSubject(username);
        claims.put("role", role);
        claims.put("id", id);
        Date now = new Date();
        Date validity = new Date(now.getTime() + accessTokenExpiration * 1000);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, accessTokenSecretKey)
                .compact();
    }

    public String createRefreshToken(Long id) {
        Claims claims = Jwts.claims().setSubject(String.valueOf(id));
        Instant now = Instant.now();
        Date validity = Date.from(now.plus(refreshTokenExpiration, ChronoUnit.DAYS));

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(Date.from(now))
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, refreshTokenSecretKey)
                .compact();
    }

    public boolean validateToken(String token) throws JwtAuthenticationException {
        try {
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(accessTokenSecretKey).parseClaimsJws(token);
            return !claimsJws.getBody().getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            throw new JwtAuthenticationException("JWT token is expired or invalid", HttpStatus.UNAUTHORIZED);
        }
    }

    public Authentication getAuthentication(String token) {
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(getUsername(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    public String getUsername(String token) {
        return Jwts.parser().setSigningKey(accessTokenSecretKey).parseClaimsJws(token).getBody().getSubject();
    }

    public String resolveToken(HttpServletRequest request) {
        return request.getHeader(authorizationHeader);
    }

    public Long getRefreshTokenId(String token) {
        return Long.valueOf(Jwts.parser().setSigningKey(refreshTokenSecretKey).parseClaimsJws(token).getBody().getSubject());
    }


    public String createPasswordResetToken(Long id) {
        Claims claims = Jwts.claims().setSubject(String.valueOf(id));
        Instant now = Instant.now();
        Date validity = Date.from(now.plus(passwordResetExpiration, ChronoUnit.DAYS));

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(Date.from(now))
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, passwordResetSecretKey)
                .compact();
    }

    public String createPasswordUpdateToken(Long id) {
        Claims claims = Jwts.claims().setSubject(String.valueOf(id));
        Instant now = Instant.now();
        Date validity = Date.from(now.plus(passwordUpdateExpiration, ChronoUnit.HOURS));

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(Date.from(now))
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, passwordUpdateSecretKey)
                .compact();
    }

    public Long getPasswordResetTokenId(String token) {
        return Long.valueOf(Jwts.parser().setSigningKey(passwordResetSecretKey).parseClaimsJws(token).getBody().getSubject());
    }

    public Long getPasswordUpdateTokenId(String token) {
        return Long.valueOf(Jwts.parser().setSigningKey(passwordUpdateSecretKey).parseClaimsJws(token).getBody().getSubject());
    }


    public boolean validatePasswordResetToken(String token) throws JwtAuthenticationException {
        try {
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(passwordResetSecretKey).parseClaimsJws(token);
            return !claimsJws.getBody().getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            throw new JwtAuthenticationException("JWT token is expired or invalid", HttpStatus.UNAUTHORIZED);
        }
    }

    public boolean validatePasswordUpdateToken(String token) throws JwtAuthenticationException {
        try {
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(passwordUpdateSecretKey).parseClaimsJws(token);
            return !claimsJws.getBody().getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            throw new JwtAuthenticationException("JWT token is expired or invalid", HttpStatus.UNAUTHORIZED);
        }
    }


}
