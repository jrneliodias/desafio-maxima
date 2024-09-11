package com.maxima.desafio_maxima;

import org.springframework.stereotype.Service;

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
        if (!isValidCPF(cpf) || cpf.length() !=11) {
            throw new IllegalArgumentException("CPF inválido.");
        }
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

    public Client patchClient(Long id, Map<String, Object> updates) {
        Client client = getClientById(id);
        if (client == null) {
            throw new RuntimeException("Cliente não encontrado");
        }
        if(updates.containsKey("name")){
            client.setName((String) updates.get("name"));
        }
        if(updates.containsKey("cpf")){
            String cpf = (String) updates.get("cpf");
            if(!isValidCPF(cpf)){
                throw new IllegalArgumentException("CPF inválido.");
            }
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

    public Client putClient(Long id, Map<String, Object> updates) {
        Client client = getClientById(id);
        if (client == null) {
            throw new RuntimeException("Cliente não encontrado");
        }
        if(!updates.containsKey("name") || !updates.containsKey("cpf") || !updates.containsKey("age")){
            throw new RuntimeException("Existem parâmetros faltando na requisição.");
        }

        Integer age = (Integer) updates.get("age");
        if(age < 0){
            throw new IllegalArgumentException("Idade não pode ser menor que 0.");
        }
        String cpf = (String) updates.get("cpf");
        if(!isValidCPF(cpf)){
            throw new IllegalArgumentException("CPF inválido.");
        }
        client.setName((String) updates.get("name"));
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
    private static boolean isValidCPF(String cpf) {
        cpf = cpf.replaceAll("[^0-9]", "");

        if (cpf.length() != 11) {
            return false;
        }

        int[] digits = new int[11];
        for (int i = 0; i < 11; i++) {
            digits[i] = Character.getNumericValue(cpf.charAt(i));
        }

        int sum = 0;
        for (int i = 0; i < 9; i++) {
            sum += digits[i] * (10 - i);
        }

        int remainder = sum % 11;
        int expectedDigit1 = (remainder < 2) ? 0 : 11 - remainder;

        if (digits[9] != expectedDigit1) {
            return false;
        }

        sum = 0;
        for (int i = 0; i < 10; i++) {
            sum += digits[i] * (11 - i);
        }

        remainder = sum % 11;
        int expectedDigit2 = (remainder < 2) ? 0 : 11 - remainder;

        return digits[10] == expectedDigit2;
    }
}