package com.IsmailMabrouki.Transpoz.auth;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class TokenRefreshResponse {
    private String token;
    private String refreshToken;

    public TokenRefreshResponse(String token, String refreshToken) {
        this.token = token;
        this.refreshToken = refreshToken;
    }

    // Getters and setters
}
