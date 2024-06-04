package com.IsmailMabrouki.Transpoz.client;

import java.util.List;

import com.IsmailMabrouki.Transpoz.exception.ClientCreationException;
import com.IsmailMabrouki.Transpoz.exception.ClientDeleteException;
import com.IsmailMabrouki.Transpoz.exception.ClientUpdateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;


    public Client getClientById(Long id) {
        return clientRepository.findById(id).orElse(null);
    }


    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }


    public Client createClient(Client client) throws ClientCreationException {
        try {
            // Optional: Validation logic (e.g., email format, password strength)
            return clientRepository.save(client);
        } catch (Exception e) {
            throw new ClientCreationException();
        }
    }


    public Client updateClient(Long id, Client updatedClient) throws ClientUpdateException {
        try {
            Client existingClient = clientRepository.findById(id).orElseThrow(ClientUpdateException::new);
            existingClient.setAddress(updatedClient.getAddress());
            existingClient.setEmail(updatedClient.getEmail());
            existingClient.setPhoneNumber(updatedClient.getPhoneNumber());
            existingClient.setName(updatedClient.getName()); // Example update
            existingClient = clientRepository.save(existingClient);
            return existingClient;
        } catch (Exception e) {
            throw new ClientUpdateException();
        }
    }

    
    public void deleteClient(Long id) throws ClientDeleteException {
        try {
            clientRepository.deleteById(id);
        } catch (Exception e) {
            throw new ClientDeleteException();
        }
    }


}