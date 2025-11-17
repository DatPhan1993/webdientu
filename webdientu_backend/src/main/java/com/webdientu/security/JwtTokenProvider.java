package com.webdientu.security;

import com.webdientu.config.JwtConfig;
import com.webdientu.entity.CustomUserDetail;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.UUID;

@Component
public class JwtTokenProvider {
    private static final Logger log = LoggerFactory.getLogger(JwtTokenProvider.class);
//    private final String JWT_SECRET = "mockProject";
//
//    private final long JWT_EXPIRATION = 604800000L;
    private final JwtConfig jwtConfig;
    
    // Constructor injection for JwtConfig
    public JwtTokenProvider(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }
    
    public String generateToken(CustomUserDetail userDetail) {
        System.out.println(userDetail.getAccount().getId());
        return Jwts.builder().setId(UUID.randomUUID().toString())
                .setSubject(String.valueOf(userDetail.getAccount().getId()))
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + jwtConfig.getJwtExpiration()))
                .signWith(SignatureAlgorithm.HS512, jwtConfig.getJwtSecret())
                .compact();
    }


    public Integer getAccountIdFromJwt(String jwt) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtConfig.getJwtSecret())
                .parseClaimsJws(jwt)
                .getBody();
        return Integer.parseInt(claims.getSubject());
    }

    public Integer getAccoutIdFromId(String jwt) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtConfig.getJwtSecret())
                .parseClaimsJws(jwt)
                .getBody();
        return Integer.parseInt(claims.getSubject());
    }

    public boolean validateToken (String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtConfig.getJwtSecret()).parseClaimsJws(authToken);
//            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(authToken);
            return true;
        }catch (SignatureException ex) {
            log.error("JWT signature does not match - Old token detected");
            // Đây là token cũ HS256, bỏ qua và cho phép request tiếp tục
        }catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
        }catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
        }catch (UnsupportedJwtException ex) {
            log.error("Unsupport JWT token");
        }catch (IllegalArgumentException ex) {
            log.error("JWt claims string is empty");
        }
        return false;
    }
}
