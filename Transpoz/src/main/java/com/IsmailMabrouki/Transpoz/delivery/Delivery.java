package com.IsmailMabrouki.Transpoz.delivery;

import com.IsmailMabrouki.Transpoz.driver.Driver;
import com.IsmailMabrouki.Transpoz.location.Location;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.hc.client5.http.classic.methods.HttpGet;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.CloseableHttpResponse;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.HttpEntity;
import org.apache.hc.core5.http.io.entity.EntityUtils;
import org.json.JSONObject;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "delivery")
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generated ID
    private Long id;
    @NotBlank
    private String customerName;
    private Long customerId;
    // Customer name
    @Nullable
    private String items; // Description of items being delivered (optional)

//    @OneToOne // One-to-one with Location
    private String pickupLocation;

//    @OneToOne // One-to-one with Location
    private String deliveryLocation;

    // Delivery status (e.g., "pending", "in progress", "delivered")
    @Enumerated(EnumType.STRING) // To store status as String values
    private DeliveryStatus status;

    // Estimated delivery time (optional)
    private Long estimatedDeliveryTime; // In minutes (or other suitable unit)

    @ManyToOne() // Optional relationship with Driver
    private Driver assignedDriver;

    // Getters, Setters, and Constructors (omitted for brevity)

    public String getStatusDescription() {
        return switch (status) {
            case PENDING -> "Awaiting pickup";
            case IN_PROGRESS -> "On the way";
            case DELIVERED -> "Delivered";
        };
    }



//    public double calculateDistanceBetweenLocations() {
//        if (pickupLocation == null || deliveryLocation == null || pickupLocation.getAddress() == null || deliveryLocation.getAddress() == null) {
//            return 0.0; // Handle cases where data is missing
//        }
//
//        final String nominatimUrl = "https://nominatim.openstreetmap.org/search?";
//        final String apiKey = "YOUR_NOMINATIM_API_KEY"; // Replace with your API key
//
//        double pickupLat = 0.0;
//        double pickupLon = 0.0;
//        double deliveryLat = 0.0;
//        double deliveryLon = 0.0;
//
//        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
//            // Geocode pickup location
//            HttpGet pickupRequest = new HttpGet(nominatimUrl + "format=json&q=" + pickupLocation.getAddress() + "&key=" + apiKey);
//            CloseableHttpResponse pickupResponse = httpClient.execute(pickupRequest, new SimpleResponseHandler()); // Using SimpleResponseHandler
//            String pickupResponseString = EntityUtils.toString(pickupResponse.getEntity());
//
//            JSONObject pickupJson = new ObjectMapper().readValue(pickupResponseString, JSONObject.class);
//            if (pickupJson.has("features") && !pickupJson.getJSONArray("features").isEmpty()) {
//                JSONObject pickupGeometry = pickupJson.getJSONArray("features").getJSONObject(0).getJSONObject("geometry");
//                pickupLat = pickupGeometry.getDouble("lat");
//                pickupLon = pickupGeometry.getDouble("lon");
//            }
//
//            // Geocode delivery location (similar logic)
//            HttpGet deliveryRequest = new HttpGet(nominatimUrl + "format=json&q=" + deliveryLocation.getAddress() + "&key=" + apiKey);
//            CloseableHttpResponse deliveryResponse = httpClient.execute(deliveryRequest, new SimpleResponseHandler()); // Using SimpleResponseHandler
//            String deliveryResponseString = EntityUtils.toString(deliveryResponse.getEntity());
//
//            JSONObject deliveryJson = new ObjectMapper().readValue(deliveryResponseString, JSONObject.class);
//            if (deliveryJson.has("features") && !deliveryJson.getJSONArray("features").isEmpty()) {
//                JSONObject deliveryGeometry = deliveryJson.getJSONArray("features").getJSONObject(0).getJSONObject("geometry");
//                deliveryLat = deliveryGeometry.getDouble("lat");
//                deliveryLon = deliveryGeometry.getDouble("lon");
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            // Handle exception (e.g., logging error, returning default distance)
//        }
//
//        // Calculate distance using Haversine formula (assuming Earth radius in kilometers)
//        final int earthRadius = 6371;
//        double dLat = Math.toRadians(deliveryLat - pickupLat);
//        double dLon = Math.toRadians(deliveryLon - pickupLon);
//
//        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//                Math.cos(Math.toRadians(pickupLat)) * Math.cos(Math.toRadians(deliveryLat)) *
//                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
//
//        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//
//        // Return the calculated distance
//        return earthRadius * c;
//    }

}