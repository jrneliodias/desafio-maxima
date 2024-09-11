package com.maxima.desafio_maxima;

import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
public class ClientController {
    private ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }
    @GetMapping("/clients")
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    } @GetMapping("/clients/{id}")
    public Client getClientById(@PathVariable Long id) {
        return clientService.getClientById(id);
    }
    @PostMapping("/clients")
    public ResponseEntity<Client> addClient(@RequestBody Map<String, String> request) {
        String name = request.get("name");
        String cpf = request.get("cpf");
        String age = request.get("age");
        ClientRequestDTO client = new ClientRequestDTO(name,cpf,Integer.parseInt(age));
        return ResponseEntity.status(HttpStatus.CREATED).body(clientService.createClient(client));
    }
    @PatchMapping("/clients/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        Client updatedClient = clientService.updateClient(id, updates);
        return ResponseEntity.ok(updatedClient);
    }

    @DeleteMapping("/clients/{id}")
    public ResponseEntity<Void> deleteClientById(@PathVariable Long id) {
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }
}
