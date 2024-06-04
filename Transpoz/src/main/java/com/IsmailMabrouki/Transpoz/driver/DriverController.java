package com.IsmailMabrouki.Transpoz.driver;

import com.IsmailMabrouki.Transpoz.authUsers.User;
import com.IsmailMabrouki.Transpoz.client.Client;
import com.IsmailMabrouki.Transpoz.client.ClientService;
import com.IsmailMabrouki.Transpoz.delivery.*;
import com.IsmailMabrouki.Transpoz.exception.DriverNotFoundException;
import com.IsmailMabrouki.Transpoz.exception.UserNotFoundException;
import com.IsmailMabrouki.Transpoz.exception.VehicleNotFoundException;
import com.IsmailMabrouki.Transpoz.security.UserDetailsServiceImpl;
import com.IsmailMabrouki.Transpoz.vehicle.AddVehicleRequest;
import com.IsmailMabrouki.Transpoz.vehicle.VehicleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/driver")
@PreAuthorize("hasRole('DRIVER')")
@Tag(name = "driver")
public class DriverController {

    @Autowired
    private final DriverService driverService;
    @Autowired
    private VehicleService vehicleService;
    @Autowired
    private ClientService clientService;
    @Autowired
    private DeliveryService deliveryService;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;


    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    @GetMapping("drivers_list")
    @PreAuthorize("hasAuthority('driver:read')")
    public ResponseEntity<List<Driver>> getAllDrivers() {
        List<Driver> drivers = driverService.findAllDrivers();
        return ResponseEntity.ok(drivers);
    }

//    @PostMapping
//    @PreAuthorize("hasAuthority('driver:create')")
//    public ResponseEntity<Driver> createDriver(@RequestBody Driver driver) {
//        Driver createdDriver = driverService.createDriver(driver);
//        return ResponseEntity.ok(createdDriver);
//    }

    @GetMapping("drivers_list/{id}")
    @PreAuthorize("hasAuthority('driver:read')")
    public ResponseEntity<Driver> findDriverById(@PathVariable Long id) {
        Driver driver = driverService.findDriverById(id);
        if (driver != null) {
            return ResponseEntity.ok(driver);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/profile/{id}")
    @PreAuthorize("hasAuthority('driver:read')")
    public ResponseEntity<User> getMyProfile(@PathVariable Long id) throws UserNotFoundException {
        return ResponseEntity.ok((User) userDetailsService.loadUserById(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('driver:delete')")
    public ResponseEntity<Void> deleteDriverById(@PathVariable Long id) {
        driverService.deleteDriverById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("{id}/addVehicle")
    @PreAuthorize("hasAuthority('driver:update')")
    public ResponseEntity<Void> addVehicle(@PathVariable Long id, @RequestBody AddVehicleRequest request) throws DriverNotFoundException, VehicleNotFoundException {
        driverService.addVehicleToDriver(id, vehicleService.createVehicle(request).getId());
        return ResponseEntity.ok().build();
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('driver:update')")
    public ResponseEntity<Driver> updateDriver(@PathVariable Long id, @RequestBody Driver updatedDriver) throws DriverNotFoundException {
        Driver existingDriver = driverService.findDriverById(id);
        if (existingDriver == null) {
            throw new DriverNotFoundException("Driver with id " + id + " not found");
        }
        // Update relevant fields from updatedDriver object
        existingDriver.setName(updatedDriver.getName()); // Update name (example)
        existingDriver.setEmail(updatedDriver.getEmail());
        existingDriver.setCurrentLocation(updatedDriver.getCurrentLocation());
        existingDriver.setPhoneNumber(updatedDriver.getPhoneNumber());
        existingDriver.setRating(updatedDriver.getRating());
        existingDriver.setVehicle(updatedDriver.getVehicle());
        // Update other fields as needed

        Driver savedDriver = driverService.updateDriver(existingDriver);
        return ResponseEntity.ok(savedDriver);
    }

    @GetMapping("/clients_list")
    @PreAuthorize("hasAuthority('driver:read')")
    public List<Client> getAllClients() {
        return clientService.getAllClients(); // Delegate to UserService
    }

    @GetMapping("/clients_list/{id}")
    @PreAuthorize("hasAuthority('driver:read')")
    public Client getClientById(@PathVariable Long id) {
        return clientService.getClientById(id); // Delegate to UserService
    }

    @GetMapping("/{id}/deliveries/assigned")
    @PreAuthorize("hasAuthority('driver:read')")
    public ResponseEntity<List<Delivery>> getAssignedDeliveries(@PathVariable Long id) {
        List<Delivery> deliveries = deliveryService.getDeliveriesForDriver(id);
        return ResponseEntity.ok(deliveries);
    }

    @PutMapping("/{driver_id}/deliveries/{id}/status")
    @PreAuthorize("hasAuthority('driver:update')")
    public ResponseEntity<Void> updateDeliveryStatus(@PathVariable Long driver_id, @PathVariable Long id, @RequestBody String updateStatus) {
        deliveryService.updateDeliveryStatus(driver_id, id, updateStatus);
        return ResponseEntity.noContent().build();
    }





//    @GetMapping
//    @PreAuthorize("hasAuthority('driver:read')")
//    public String get() {
//        return "GET:: driver controller";
//    }
//    @PostMapping
//    @PreAuthorize("hasAuthority('driver:create')")
//
//    public String post() {
//        return "POST:: driver controller";
//    }
//    @PutMapping
//    @PreAuthorize("hasAuthority('driver:update')")
//
//    public String put() {
//        return "PUT:: driver controller";
//    }
//    @DeleteMapping
//    @PreAuthorize("hasAuthority('driver:delete')")
//
//    public String delete() {
//        return "DELETE:: driver controller";
}

