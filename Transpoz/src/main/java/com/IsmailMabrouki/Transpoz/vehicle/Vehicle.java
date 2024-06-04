package com.IsmailMabrouki.Transpoz.vehicle;

import com.IsmailMabrouki.Transpoz.driver.Driver;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "vehicle")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generated ID
    private Long id;
    private String model;
    private String licensePlate;
    private VehicleType type; // Enum representing vehicle types (e.g., car, van, truck)
    private int capacity; // Cargo capacity of the vehicle

    // Getters and Setters (omitted for brevity)

    // Optional fields (add as needed)
    private String color;
    private String make;
    private int year;
//    @OneToOne
//    @JsonIgnore
//    @JsonBackReference
//    private Driver driver;

    // ...

    // Constructor(s) (omitted for brevity)





    // ...
}

