package com.IsmailMabrouki.Transpoz.client;


 // Import your User class
import com.IsmailMabrouki.Transpoz.authUsers.User;
import com.IsmailMabrouki.Transpoz.delivery.Delivery;
import com.IsmailMabrouki.Transpoz.delivery.DeliveryRequest;
import com.IsmailMabrouki.Transpoz.delivery.DeliveryService;
import com.IsmailMabrouki.Transpoz.driver.Driver;
import com.IsmailMabrouki.Transpoz.driver.DriverService;
import com.IsmailMabrouki.Transpoz.exception.ClientCreationException;
import com.IsmailMabrouki.Transpoz.exception.ClientDeleteException;
import com.IsmailMabrouki.Transpoz.exception.ClientUpdateException;
import com.IsmailMabrouki.Transpoz.exception.UserNotFoundException;
import com.IsmailMabrouki.Transpoz.security.UserDetailsServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user") // Plural for users
@PreAuthorize("hasRole('USER')")
@Tag(name = "client")
public class ClientController {

    @Autowired
    private ClientService clientService; // Inject UserService dependency (we'll create this later)

    @Autowired
    private DriverService driverService;
    @Autowired
    private DeliveryService deliveryService;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @GetMapping("/clients_list")
    @PreAuthorize("hasAuthority('user:read')")
    public List<Client> getAllClients() {
        return clientService.getAllClients(); // Delegate to UserService
    }

    @GetMapping("/clients_list/{id}")
    @PreAuthorize("hasAuthority('user:read')")
    public Client getClientById(@PathVariable Long id) {
        return clientService.getClientById(id); // Delegate to UserService
    }

    @GetMapping("/profile/{id}")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<User> getMyProfile(@PathVariable Long id) throws UserNotFoundException {
        return ResponseEntity.ok((User) userDetailsService.loadUserById(id));
    }

    @PostMapping("/become-client")
    @PreAuthorize("hasAuthority('user:create')")
    public Client createClient(@RequestBody Client client) throws ClientCreationException {
        return clientService.createClient(client); // Delegate to UserService
    }

    @PutMapping("/clients/{id}")
    @PreAuthorize("hasAuthority('user:update')")
    public Client updateClient(@PathVariable Long id, @RequestBody Client updatedClient) throws ClientUpdateException {
        return clientService.updateClient(id, updatedClient); // Delegate to UserService
    }

    @DeleteMapping("/clients/{id}")
    @PreAuthorize("hasAuthority('user:delete')")
    public void deleteClient(@PathVariable Long id) throws ClientDeleteException {
        clientService.deleteClient(id); // Delegate to UserService
    }

    @GetMapping("drivers_list")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<List<Driver>> getAllDrivers() {
        List<Driver> drivers = driverService.findAllDrivers();
        return ResponseEntity.ok(drivers);
    }

    @GetMapping("drivers_list/{id}")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<Driver> findDriverById(@PathVariable Long id) {
        Driver driver = driverService.findDriverById(id);
        if (driver != null) {
            return ResponseEntity.ok(driver);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/deliveries/create")
    @PreAuthorize("hasAuthority('user:create')")
    public ResponseEntity<Delivery> createDelivery(@PathVariable Long id,@RequestBody DeliveryRequest request) {
        Delivery createdDelivery = deliveryService.createDelivery(id, request);
        return ResponseEntity.ok(createdDelivery);
    }

    @GetMapping("/{id}/deliveries/mine")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<List<Delivery>> getMyDeliveries(@PathVariable Long id) {
        List<Delivery> deliveries = deliveryService.getDeliveriesForUser(id);
        return ResponseEntity.ok(deliveries);
    }
}
