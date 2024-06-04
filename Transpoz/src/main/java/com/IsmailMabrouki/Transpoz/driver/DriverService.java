package com.IsmailMabrouki.Transpoz.driver;

import com.IsmailMabrouki.Transpoz.exception.DriverNotFoundException;
import com.IsmailMabrouki.Transpoz.exception.VehicleNotFoundException;
import com.IsmailMabrouki.Transpoz.vehicle.Vehicle;
import com.IsmailMabrouki.Transpoz.vehicle.VehicleRepository;
import com.IsmailMabrouki.Transpoz.vehicle.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class DriverService {

    @Autowired
    private final DriverRepository driverRepository;
    @Autowired
    private VehicleRepository vehicleRepository;
    @Autowired
    private VehicleService vehicleService; // Assuming a separate VehicleService


    @Autowired
    public DriverService(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    public List<Driver> findAllDrivers() {
        return driverRepository.findAll();
    }

    public Driver createDriver(Driver driver) {
        return driverRepository.save(driver);
    }


    public Driver findDriverById(Long id) {
        return driverRepository.findById(id).orElse(null);
    }

    public Driver updateDriver(Driver driver) {
        driverRepository.save(driver);
        return driver;
    }

    public void deleteDriverById(Long id) {
        driverRepository.deleteById(id);
    }

    public void deleteVehicle(Long id) {
        // Handle potential cascading effects with caution! (e.g., orphaned driver entries)
        vehicleRepository.deleteById(id); // Delete vehicle by ID
    }
    public Vehicle updateVehicle(Vehicle vehicle) {
        // Optional: Validate and merge changes
        return vehicleRepository.save(vehicle); // Update the vehicle details
    }

//
//    public void assignDriverToVehicle(Vehicle vehicle, Driver driver) {
//        // Optional: Check if driver and vehicle are available
//        vehicle.setDriver(driver); // Assign driver to vehicle (assuming one-to-one relationship)
//        vehicleRepository.save(vehicle); // Update vehicle with assigned driver
//    }

    public Vehicle getVehicleById(Long id) {
        return vehicleRepository.findById(id).orElse(null); // Find vehicle by ID or return null
    }


    public Vehicle registerVehicle(Vehicle vehicle) {
        // Optional: Validate vehicle details
        return vehicleRepository.save(vehicle); // Save the vehicle using the repository
    }

    public void addVehicleToDriver(Long driverId, Long vehicleId) throws DriverNotFoundException, VehicleNotFoundException {

        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new DriverNotFoundException("Driver with ID " + driverId + " not found"));

        Vehicle vehicle = vehicleService.getVehicleById(vehicleId);
        if (vehicle == null) {
            throw new VehicleNotFoundException("Vehicle with ID " + vehicleId + " not found");
        }

        // Update driver's vehicle list (assuming List<Vehicle> in Driver)
        driver.setVehicle(vehicle);

        driverRepository.save(driver);
    }
}
