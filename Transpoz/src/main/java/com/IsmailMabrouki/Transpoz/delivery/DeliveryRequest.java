package com.IsmailMabrouki.Transpoz.delivery;

import com.IsmailMabrouki.Transpoz.driver.Driver;
import com.IsmailMabrouki.Transpoz.location.Location;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class DeliveryRequest {
    private String customerName;
    private Long assignedDriverId;// Add validation annotation (assuming Lombok is used)
    private String items; // Optional: Description of items being delivered
    private String pickupLocation; // ID of the pickup location
    private String deliveryLocation; // ID of the delivery location
    @Enumerated(EnumType.STRING) // Assuming DeliveryStatus is an enum
    private DeliveryStatus status; // Optional: Initial delivery status
    private Long estimatedDeliveryTime; // Optional: Estimated delivery time in minutes (or other unit)

}
