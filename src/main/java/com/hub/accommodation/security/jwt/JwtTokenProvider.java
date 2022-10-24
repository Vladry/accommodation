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
import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenProvider {
    private final UserDetailsService userDetailsService;

    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${jwt.secretRefresh}")
    private String secretRefreshKey;
    @Value("${jwt.secretPasswordReset}")
    private String secretPasswordReset;
    @Value("${jwt.secretPasswordUpdate}")
    private String secretPasswordUpdate;
    @Value("${jwt.header}")
    private String authorizationHeader;
    @Value("${jwt.expiration}")
    private long validityToken;
    @Value("${jwt.expirationRefresh}")
    private long validityRefreshToken;
    @Value("${jwt.expirationPasswordReset}")
    private long expirationPasswordReset;
    @Value("${jwt.expirationPasswordUpdate}")
    private long expirationPasswordUpdate;

    public JwtTokenProvider(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
        secretRefreshKey = Base64.getEncoder().encodeToString(secretRefreshKey.getBytes());
//        System.out.println("secretKey: " + secretKey);
//        System.out.println("secretRefreshKey: " + secretRefreshKey);
//        System.out.println("secretPasswordReset: " + secretPasswordReset);
//        System.out.println("secretPasswordUpdate: " + secretPasswordUpdate);
    }

    public String createToken(String username, String role, Long id) {
        Claims claims = Jwts.claims().setSubject(username);
        claims.put("role", role);
        claims.put("id", id);
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityToken * 1000);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String createRefreshToken(Long id) {
        Claims claims = Jwts.claims().setSubject(String.valueOf(id));
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityRefreshToken * 1000);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretRefreshKey)
                .compact();
    }

    public String createPasswordResetToken(Long id) {
        Claims claims = Jwts.claims().setSubject(String.valueOf(id));
        Date now = new Date();
        Date validity = new Date(now.getTime() + expirationPasswordReset * 1000);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretPasswordReset)
                .compact();
    }

    public String getPasswordUpdateToken(Long id){
        Claims claims = Jwts.claims().setSubject(String.valueOf(id));
        Date now = new Date();
        Date validity = new Date(now.getTime() + expirationPasswordUpdate * 1000);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretPasswordUpdate)
                .compact();
    }

    public boolean validateToken(String token) throws JwtAuthenticationException {
        try {
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return !claimsJws.getBody().getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            throw new JwtAuthenticationException("JWT token is expired or invalid", HttpStatus.UNAUTHORIZED);
        }
    }

    public boolean validatePasswordResetToken(String token) throws JwtAuthenticationException {
        try {
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(secretPasswordReset).parseClaimsJws(token);
            return !claimsJws.getBody().getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            throw new JwtAuthenticationException("JWT token is expired or invalid", HttpStatus.UNAUTHORIZED);
        }
    }

    public boolean validatePasswordUpdateToken(String token) throws JwtAuthenticationException {
        try {
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(secretPasswordUpdate).parseClaimsJws(token);
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
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    public Long getRefreshTokenId (String token) {
        return Long.valueOf(Jwts.parser().setSigningKey(secretRefreshKey).parseClaimsJws(token).getBody().getSubject());
    }

    public Long getPasswordResetTokenId(String token) {
        return Long.valueOf(Jwts.parser().setSigningKey(secretPasswordReset).parseClaimsJws(token).getBody().getSubject());
    }

    public Long getPasswordUpdateTokenId(String token) {
        return Long.valueOf(Jwts.parser().setSigningKey(secretPasswordUpdate).parseClaimsJws(token).getBody().getSubject());
    }

    public String resolveToken(HttpServletRequest request) {
        return request.getHeader(authorizationHeader);
    }
}
