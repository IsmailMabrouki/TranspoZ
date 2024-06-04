package com.IsmailMabrouki.Transpoz.delivery;

import com.IsmailMabrouki.Transpoz.client.Client;
import com.IsmailMabrouki.Transpoz.client.ClientRepository;
import com.IsmailMabrouki.Transpoz.client.ClientService;
import com.IsmailMabrouki.Transpoz.driver.Driver;
import com.IsmailMabrouki.Transpoz.driver.DriverRepository;
import com.IsmailMabrouki.Transpoz.location.Location;
import com.IsmailMabrouki.Transpoz.location.LocationRepository;
import com.IsmailMabrouki.Transpoz.role.UserRole;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.constraints.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class DeliveryService {


    @Autowired
    private DeliveryRepository deliveryRepository; // Inject DeliveryRepository dependency
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private DriverRepository driverRepository;
    @Autowired
    LocationRepository locationRepository;


    public Delivery getDeliveryById(Long id) {
        return deliveryRepository.findById(id).orElse(null); // Find by ID or return null
    }


    public Delivery updateDelivery(Delivery delivery) {

        // Optional validation (implement logic as needed)
        if (delivery.getCustomerName() == null || delivery.getPickupLocation()== null) {
            throw new IllegalArgumentException("Delivery name and address are required");
        }

        // Optional: Implement logic to merge changes from a separate update object (if applicable)

        // Optimistic locking with version field (assuming a version field exists in Delivery entity)
        return deliveryRepository.save(delivery);
    }



    public void deleteDelivery(Long id) {
        // Handle potential cascading effects with caution! (e.g., orphaned driver assignments)
        deliveryRepository.deleteById(id); // Delete delivery by ID
    }


    public List<Delivery> searchDeliveries(String searchTerm) {
        if (searchTerm == null || searchTerm.isEmpty()) {
            return new ArrayList<>(); // Empty search term returns empty list
        }

        // Search by customer name (or other fields as needed)
        return deliveryRepository.findByCustomerName(searchTerm);
    }

    public List<Delivery> getAllDeliveries() {
        // Retrieve all Delivery entities from the database using the repository
        return deliveryRepository.findAll();
    }


    public double calculateEstimatedDeliveryTime(Delivery delivery) {
        // Integrate with geocoding service to calculate distance and estimate time (optional)
        // Placeholder for now
        return 0.0;
    }

    public void updateDeliveryStatus(Long driver_id, Long id, String updateStatus) {
        // 1. Retrieve the Delivery entity (replace with your actual persistence layer logic)
        Delivery deliveryToUpdate = getDeliveryById(id);
        // 2. Check if delivery exists
        if (deliveryToUpdate == null) {
            throw new IllegalArgumentException("Delivery with ID " + id + " not found");
        }
        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> statusMap = mapper.readValue(updateStatus, Map.class);
            updateStatus = statusMap.get("status");
        } catch (JsonProcessingException e) {
            // Handle JSON parsing exception (e.g., throw a specific exception or log the error)
        }
        var status = DeliveryStatus.valueOf(updateStatus);

        // 4. Update the status
        deliveryToUpdate.setStatus(status);
        // 5. Persist the changes to the database (replace with your actual persistence layer logic)
        deliveryRepository.save(deliveryToUpdate);
    }

    public List<Delivery> getDeliveriesForDriver(Long driverId) {
        // Leverage JPA repository (assuming you have a DeliveryRepository)
        return deliveryRepository.findByAssignedDriver_Id(driverId);
    }


    public List<Delivery> getDeliveriesForUser(Long userId) {

            return deliveryRepository.findByCustomerId(userId); // Assuming customer ID is stored as a String

    }


    public Delivery createDelivery(Long id, DeliveryRequest deliveryRequest) {
         Driver AssignedDriver = driverRepository.findById(deliveryRequest.getAssignedDriverId()).orElse(null);
        // Extract data from DeliveryRequest
        String customerName = deliveryRequest.getCustomerName();
        String items = deliveryRequest.getItems();
        String pickupLocation = deliveryRequest.getPickupLocation();
        String deliveryLocation = deliveryRequest.getDeliveryLocation();
        DeliveryStatus status = deliveryRequest.getStatus();
        Long estimatedDeliveryTime = deliveryRequest.getEstimatedDeliveryTime();

        // Create a Delivery builder
        Delivery.DeliveryBuilder deliveryBuilder = Delivery.builder();

        // Set builder fields with extracted data
        Delivery newDelivery = deliveryBuilder.customerName(customerName)
                .customerId(id)
                .assignedDriver(AssignedDriver)
                .items(items)
                .pickupLocation(pickupLocation)
                .deliveryLocation(deliveryLocation)
                .estimatedDeliveryTime(estimatedDeliveryTime)
                .status(status)
                .build(); // Build the immutable Delivery object
//        locationRepository.save(deliveryRequest.getPickupLocation());
//        locationRepository.save(deliveryRequest.getDeliveryLocation());
        // Persist the Delivery entity (replace with your persistence layer logic)
        deliveryRepository.save(newDelivery);

        // Return the created Delivery object
        return newDelivery;
    }



}
