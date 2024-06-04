package com.IsmailMabrouki.Transpoz.delivery;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UpdateStatusRequest {
    DeliveryStatus status;
}
