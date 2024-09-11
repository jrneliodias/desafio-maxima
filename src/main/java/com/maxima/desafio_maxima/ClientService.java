package com.maxima.desafio_maxima;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Map;

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

    public Client updateClient(Long id, Map<String, Object> updates) {
        Client client = getClientById(id);
        if (client == null) {
            throw new RuntimeException("Cliente não encontrado");
        }
        if(updates.containsKey("name")){
            client.setName((String) updates.get("name"));
        }
        if(updates.containsKey("cpf")){
            client.setCpf((String) updates.get("cpf"));
        }
        if(updates.containsKey("age")){
            Integer age = (Integer) updates.get("age");
            if(age < 0){
                throw new IllegalArgumentException("Idade não pode ser menor que 0.");
            }
            client.setAge(age);
        }


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