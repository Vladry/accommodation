package com.hub.accommodation.filter;

import com.hub.accommodation.exception.JwtAuthenticationException;
import com.hub.accommodation.security.jwt.JwtTokenProvider;
import com.hub.accommodation.service.auth.AuthService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@Component
public class JwtFilter extends GenericFilterBean {
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${jwt.header}")
    private String authorizationHeader;
    @Value("${jwt.accessTokenExpiration}")
    private int accessTokenCookieMaxAge;
    private boolean directFilterPath = false;

    private String token = null;

    public JwtFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    private Optional<Cookie> getTokenCookie(HttpServletRequest httpReq) {
        Cookie[] cookies = httpReq.getCookies();
        if (cookies != null) {
            return Arrays.stream(cookies).filter(c -> "authTokenCookie".equalsIgnoreCase(c.getName())).findFirst();
        } else {
            return Optional.empty();
        }

    }

    private void createTokenCookie(String token, HttpServletResponse httpResp) {
        System.out.println("in createTokenCookie->");
        Cookie newTokenCookie = new Cookie("authTokenCookie", token);
        newTokenCookie.setHttpOnly(true);
        newTokenCookie.setSecure(true);
        newTokenCookie.setMaxAge(accessTokenCookieMaxAge);
        newTokenCookie.setPath("/*");
        httpResp.addCookie(newTokenCookie);
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        directFilterPath = !directFilterPath;

        if (directFilterPath) {
            System.out.println("doFilter: request");
        } else {
            System.out.println("doFilter: response");
        }

        if (!directFilterPath) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        HttpServletRequest httpReq = (HttpServletRequest) servletRequest;
        HttpServletResponse httpRes = (HttpServletResponse) servletResponse;

        Optional<Cookie> optCookie = getTokenCookie(httpReq);
        optCookie.ifPresentOrElse((c) -> {

                    if (c.getValue() != null) {
                        token = c.getValue();
                        System.out.println("token found in cookie: c.getValue()= " + token);
                    } else {
                        token =  httpReq.getHeader(authorizationHeader);
                        System.out.println("no token in cookie. Resolving from httpReq: " + token);
                        createTokenCookie(token, httpRes);
                    }

                },
                () -> {
                    token =  httpReq.getHeader(authorizationHeader);
                    createTokenCookie(token, httpRes);
                }
        );

        try {
            if (token != null && jwtTokenProvider.validateToken(token)) {
                Authentication authentication = jwtTokenProvider.getAuthentication(token);
                if (authentication != null) {
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } catch (JwtAuthenticationException e) {
            SecurityContextHolder.clearContext();
            httpRes.sendError(HttpStatus.UNAUTHORIZED.value(), "JWT token is expired or invalid");
        }

        filterChain.doFilter(httpReq, httpRes);
    }
}