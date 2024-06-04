package com.IsmailMabrouki.Transpoz.admin;

import com.IsmailMabrouki.Transpoz.authUsers.TokenRepository;
import com.IsmailMabrouki.Transpoz.authUsers.User;
import com.IsmailMabrouki.Transpoz.authUsers.UserRepository;
import com.IsmailMabrouki.Transpoz.client.Client;
import com.IsmailMabrouki.Transpoz.client.ClientRepository;
import com.IsmailMabrouki.Transpoz.driver.Driver;
import com.IsmailMabrouki.Transpoz.driver.DriverRepository;
import com.IsmailMabrouki.Transpoz.exception.DuplicateUsernameException;
import com.IsmailMabrouki.Transpoz.exception.UserNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    @Autowired
    private UserRepository userRepository; // Inject UserRepository
    @Autowired
    private DriverRepository driverRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private TokenRepository tokenRepository;

    public List<User> getAllUsers() throws UserNotFoundException {
        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            throw new UserNotFoundException();
        }
        return users;
    }

    public User getUserById(Long id) throws UserNotFoundException {
        return userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
    }

//    public User createUser(User user) throws UserCreationException, DuplicateUsernameException {
//        // Implement logic to validate user data (optional)
//        // Check for existing user with same username
//        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
//            throw new DuplicateUsernameException();
//        }
//        // Encode password (e.g., BCrypt) before saving (optional - security best practice)
//        user.setPassword(/* Implement password encoding */);
//        User savedUser = userRepository.save(user);
//        return savedUser;
//    }

    public User updateUser(User user) throws UserNotFoundException, DuplicateUsernameException {
        // Implement logic to validate user data (optional)
        User existingUser = userRepository.findById(user.getId())
                .orElseThrow(UserNotFoundException::new);
        // Check for duplicate username if email is changed
        if (!existingUser.getEmail().equals(user.getEmail()) && userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new DuplicateUsernameException();
        }
        // Update relevant fields (avoid overwriting entire object)
        existingUser.setFirstname(user.getFirstname());
        existingUser.setLastname(user.getLastname());
        existingUser.setRole(user.getRole()); // Update role if allowed by admin role
        existingUser.setEnabled(user.isEnabled()); // Update account status if allowed by admin role
        // ... (update other fields as needed)
        return userRepository.save(existingUser);
    }

    @Transactional
    public void deleteUser(Long id) {
        tokenRepository.deleteByUserId(id);
        userRepository.deleteById(id);
    }

    public List<Driver> findAllDrivers() {
        return driverRepository.findAll();
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    // Additional methods for specific admin functionalities (optional)
}