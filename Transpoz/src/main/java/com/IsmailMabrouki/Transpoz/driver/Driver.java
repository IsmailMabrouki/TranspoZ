package com.IsmailMabrouki.Transpoz.driver;

import com.IsmailMabrouki.Transpoz.location.Location;
import com.IsmailMabrouki.Transpoz.vehicle.Vehicle;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "driver")
public class Driver {

    @Id
    private Long id;
    private String name;
    private String phoneNumber;
    private String email;
//    @JsonManagedReference
    @OneToOne(cascade = CascadeType.ALL)
    private Vehicle vehicle;
    // Reference to a Vehicle class
    private boolean available; // Indicates driver availability

    // Getters and Setters (omitted for brevity)
    @OneToOne(cascade = CascadeType.ALL)
    private Location currentLocation; // Reference to a Location class
    private double rating; // Average driver rating
    // ...

    // Constructor(s) (omitted for brevity)




    // ...
}
