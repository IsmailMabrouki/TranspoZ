package com.IsmailMabrouki.Transpoz.client;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Address {

    @Id // Add this annotation
    private Long id;
    private String streetAddress; // Street address (e.g., 123 Main St)
    private String city; // City name
    private String state; // State or province abbreviation (optional)
    private String postalCode; // Postal code (e.g., ZIP code)
    private String country; // Country name

    // Getters and Setters (omitted for brevity)

    public Address() {
        // Optional: Initialize fields with default values here
    }
    // Optional: Constructor
    public Address(String streetAddress, String city, String state, String postalCode, String country) {
        this.streetAddress = streetAddress;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.country = country;
    }
}
