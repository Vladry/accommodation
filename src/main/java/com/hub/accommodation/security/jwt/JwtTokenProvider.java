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
    @Value("${jwt.accessTokenRememberMeExpiration}")
    private long accessTokenRememberMeExpiration;
    @Value("${jwt.refreshTokenExpiration}")
    private long refreshTokenExpiration;


    @Value("${jwt.passwordResetSecretKey}")
    private String passwordResetSecretKey;
    @Value("${jwt.passwordUpdateSecretKey}")
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
        accessTokenSecretKey = Base64.getEncoder().encodeToString(accessTokenSecretKey.getBytes());
        refreshTokenSecretKey = Base64.getEncoder().encodeToString(refreshTokenSecretKey.getBytes());
        passwordResetSecretKey = Base64.getEncoder().encodeToString(passwordResetSecretKey.getBytes());
        passwordUpdateSecretKey = Base64.getEncoder().encodeToString(passwordUpdateSecretKey.getBytes());
    }


/*** Блок создания токенов ***/
    public String createAccessTokenStr(String username, String role, Long id) {
        Claims claims = Jwts.claims().setSubject(username);
        claims.put("role", role);
        claims.put("id", id);
        Date now = new Date();
        claims.setIssuedAt(now);
        Date expDate = new Date(now.getTime() + accessTokenExpiration * 1000);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expDate)
                .signWith(SignatureAlgorithm.HS256, accessTokenSecretKey)
                .compact();
    }

    public String createRefreshTokenStr(Long id) {
        Claims claims = Jwts.claims().setSubject(String.valueOf(id));
        Instant now = Instant.now();
        Date expDate = Date.from(now.plus(refreshTokenExpiration, ChronoUnit.DAYS));
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(Date.from(now))
                .setExpiration(expDate)
                .signWith(SignatureAlgorithm.HS256, refreshTokenSecretKey)
                .compact();
    }
/*** Конец блока создания токенов ***/



/*** авторизационный блок используемый в JwtFilter при входе в систему по токену ***/
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader(authorizationHeader);
    }
    public boolean validateToken(String token) throws JwtAuthenticationException {
//        System.out.println("in JwtTokenProvider-> validateToken(token)");
        try {
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(accessTokenSecretKey).parseClaimsJws(token);
            Date expDate = claimsJws.getBody().getExpiration();
            return !expDate.before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            throw new JwtAuthenticationException("JWT token is expired or invalid ", HttpStatus.UNAUTHORIZED);
        }
    }
    public Authentication getAuthentication(String token) {
//        System.out.println("in JwtTokenProvider-> getAuthentication(token)");
        String username = getUsername(token);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        Authentication auth = new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
        return auth;
    }
    /*** конец авторизационного блоа используемого в JwtFilter при попытке входа в систему ***/


    public String getUsername(String token) {
        Claims claims = Jwts.parser().setSigningKey(accessTokenSecretKey).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    public Long getRefreshTokenId(String token) {
        return Long.valueOf(Jwts.parser().setSigningKey(refreshTokenSecretKey).parseClaimsJws(token).getBody().getSubject());
    }



/*** Блок работы с токенами пароля ***/
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
/*** Конец блока работы с токенами пароля ***/

}
