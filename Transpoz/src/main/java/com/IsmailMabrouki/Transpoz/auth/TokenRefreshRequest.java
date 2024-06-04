package com.IsmailMabrouki.Transpoz.auth;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class TokenRefreshRequest {
    private String refreshToken;

    // Getters and setters
}