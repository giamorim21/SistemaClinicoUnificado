package com.scu.clinic_system.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class JwtService {

    private final Algorithm algorithm;
    private final long expirationMs;

    public JwtService(
            @Value("${security.jwt.secret}") String secret,
            @Value("${security.jwt.expiration-ms:3600000}") long expirationMs) {
        this.algorithm = Algorithm.HMAC256(secret);
        this.expirationMs = expirationMs;
    }

    public String generateToken(String subject, Collection<String> roles) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expirationMs);

        return JWT.create()
                .withSubject(subject)
                .withClaim("roles", new ArrayList<>(roles))
                .withIssuedAt(now)
                .withExpiresAt(exp)
                .sign(algorithm);
    }

    public String extractUsername(String token) {
        return verify(token).getSubject();
    }

    public List<String> extractRoles(String token) {
        var claim = verify(token).getClaim("roles");
        if (claim.isNull()) return List.of();
        return claim.asList(String.class);
    }

    public boolean isValid(String token, String username) {
        try {
            DecodedJWT jwt = verify(token);
            return jwt.getSubject().equals(username) && jwt.getExpiresAt().after(new Date());
        } catch (JWTVerificationException e) {
            return false;
        }
    }

    private DecodedJWT verify(String token) {
        JWTVerifier verifier = JWT.require(algorithm).build();
        return verifier.verify(token);
    }
}
