package com.IsmailMabrouki.Transpoz.vehicle;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AddVehicleRequest {

    private Long driverId;  // ID of the driver to associate the vehicle with
    private String model;    // Vehicle model (e.g., "Toyota Camry")
    private String licensePlate; // Vehicle license plate number
    private VehicleType type;  // Enum representing vehicle type (e.g., car, van, truck)
    private int capacity;      // Cargo capacity of the vehicle (optional)

    // Optional fields for additional vehicle details (add as needed)
    private String color;
    private String make;
    private int year;
}

