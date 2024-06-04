package com.IsmailMabrouki.Transpoz.admin;

import com.IsmailMabrouki.Transpoz.authUsers.User;
import com.IsmailMabrouki.Transpoz.client.Client;
import com.IsmailMabrouki.Transpoz.driver.Driver;
import com.IsmailMabrouki.Transpoz.driver.DriverService;
import com.IsmailMabrouki.Transpoz.exception.DuplicateUsernameException;
import com.IsmailMabrouki.Transpoz.exception.UserNotFoundException;
import com.IsmailMabrouki.Transpoz.security.UserDetailsServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "admin")
public class AdminController {

    @Autowired
    private AdminService AdminService; // Inject UserService for user management
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @GetMapping("/users")
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<List<User>> getAllUsers() throws UserNotFoundException {
        return ResponseEntity.ok(AdminService.getAllUsers());
    }

    @GetMapping("/users/{id}")
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<User> getUserById(@PathVariable Long id) throws UserNotFoundException {
        return ResponseEntity.ok(AdminService.getUserById(id));
    }

    @GetMapping("/profile/{id}")
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<User> getMyProfile(@PathVariable Long id) throws UserNotFoundException {
        return ResponseEntity.ok((User) userDetailsService.loadUserById(id));
    }

//    @PostMapping("/users")
//    @PreAuthorize("hasAuthority('admin:create')")
//    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
//        User createdUser = AdminService.createUser(user);
//        return ResponseEntity.ok(createdUser);
//    }

    @PutMapping("/users")
    @PreAuthorize("hasAuthority('admin:update')")
    public ResponseEntity<User> updateUser(@Valid @RequestBody User user) throws UserNotFoundException, DuplicateUsernameException {
        User updatedUser = AdminService.updateUser(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasAuthority('admin:delete')")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) throws UserNotFoundException {
        AdminService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/drivers_list")
    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<List<Driver>> getAllDrivers() {
        List<Driver> drivers = AdminService.findAllDrivers();
        return ResponseEntity.ok(drivers);
    }

    @GetMapping("/clients_list")
    @PreAuthorize("hasAuthority('admin:read')")
    public List<Client> getAllClients() {
        return AdminService.getAllClients(); // Delegate to UserService
    }

    // Additional methods for specific admin functionalities (optional)
}