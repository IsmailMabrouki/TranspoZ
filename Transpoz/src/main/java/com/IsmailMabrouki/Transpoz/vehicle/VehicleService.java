package com.IsmailMabrouki.Transpoz.vehicle;

import com.IsmailMabrouki.Transpoz.driver.Driver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository; // Injecting VehicleRepository dependency


    public Vehicle registerVehicle(Vehicle vehicle) {
        // Optional: Validate vehicle details
        return vehicleRepository.save(vehicle); // Save the vehicle using the repository
    }

    public Vehicle createVehicle(AddVehicleRequest request) {
        Vehicle vehicle = Vehicle.builder()
                .model(request.getModel())
                .licensePlate(request.getLicensePlate())
                .type(request.getType())
                .capacity(request.getCapacity()) // Optional
                .color(request.getColor()) // Optional (if needed)
                .make(request.getMake()) // Optional (if needed)
                .year(request.getYear()) // Optional (if needed)
                .build();

        return vehicleRepository.save(vehicle);
    }


    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id).orElse(null); // Find vehicle by ID or return null
    }


//    public void assignDriverToVehicle(Vehicle vehicle, Driver driver) {
//        // Optional: Check if driver and vehicle are available
//        vehicle.setDriver(driver); // Assign driver to vehicle (assuming one-to-one relationship)
//        vehicleRepository.save(vehicle); // Update vehicle with assigned driver
//    }


    public Vehicle updateVehicle(Vehicle vehicle) {
        // Optional: Validate and merge changes
        return vehicleRepository.save(vehicle); // Update the vehicle details
    }


    public void deleteVehicle(Long id) {
        // Handle potential cascading effects with caution! (e.g., orphaned driver entries)
        vehicleRepository.deleteById(id); // Delete vehicle by ID
    }


    public List<Vehicle> searchVehicles(String searchTerm) {
        // Implement search logic based on your requirements (e.g., model, type)
        return new ArrayList<>(); // Placeholder for actual search implementation
    }
}
