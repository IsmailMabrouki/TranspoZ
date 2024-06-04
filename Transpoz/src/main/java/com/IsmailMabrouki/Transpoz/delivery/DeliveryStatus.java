package com.IsmailMabrouki.Transpoz.delivery;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DeliveryStatus {

        PENDING,
        IN_PROGRESS,
        DELIVERED

}
