package com.IsmailMabrouki.Transpoz.location;

import com.fasterxml.jackson.annotation.JsonIgnore; // Optional: Ignore during JSON serialization
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;
import org.locationtech.jts.geom.Point;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "location")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generated ID
    private Long id;

    @Column(name = "geometry")// Specify geometry type
    private Point geometry;

    private String address; // Optional: Textual representation of the location

    @JsonIgnore // Optional: Ignore during JSON serialization to avoid exposing coordinates
    public double getLatitude() {
        if (geometry != null) {
            return geometry.getY();
        }
        return 0.0; // Placeholder if geometry is null
    }

    @JsonIgnore // Optional: Ignore during JSON serialization to avoid exposing coordinates
    public double getLongitude() {
        if (geometry != null) {
            return geometry.getX();
        }
        return 0.0; // Placeholder if geometry is null
    }

    // Other fields and methods (unchanged)

    // Validation (example using Bean Validation annotations)
    @PrePersist // Validate before persisting
    public void validate() {
        if (geometry == null) {
            throw new IllegalArgumentException("Location must have a valid geometry");
        }
        // Additional validation logic for address or other fields (optional)
    }

    public double getDistanceTo(Location otherLocation) {
        final int earthRadius = 6371; // Earth radius in kilometers (adjust for miles if needed)

        double dLat = Math.toRadians(otherLocation.getLatitude() - getLatitude());
        double dLon = Math.toRadians(otherLocation.getLongitude() - getLongitude());

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(getLatitude())) * Math.cos(Math.toRadians(otherLocation.getLatitude())) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return earthRadius * c;
    }

}
