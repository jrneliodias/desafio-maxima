package com.maxima.desafio_maxima;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class ClientService {
    private ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Client createClient(ClientRequestDTO data) {
        String name = data.name();
        String cpf = data.cpf();
        Integer age = data.age();
        if (age < 0) {
            throw new IllegalArgumentException("Idade não pode ser menor que 0.");
        }
        Client newClient = new Client();
        newClient.setName(name);
        newClient.setCpf(cpf);
        newClient.setAge(age);

        return clientRepository.save(newClient);
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Client getClientById(Long id) {
        return clientRepository.findById(id).orElse(null);
    }

    public Client updateClient(Long id, ClientRequestDTO data) {
        Client client = getClientById(id);
        if (client == null) {
            throw new RuntimeException("Cliente não encontrado");
        }
        String name = data.name();
        String cpf = data.cpf();
        Integer age = data.age();

        client.setName(name);
        client.setCpf(cpf);
        client.setAge(age);

        return clientRepository.save(client);
    }

    public void deleteClient(Long id) {
        Client client = getClientById(id);
        if (client == null) {
            throw new RuntimeException("Cliente não encontrado");
        }
        clientRepository.delete(client);
    }
}