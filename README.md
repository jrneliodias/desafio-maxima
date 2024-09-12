# Desafio Máxima

## Resumo Desafio

Construir um sistema de cadastro de clientes desenvolvendo uma api em Java Springboot e frontend em React. A api deve ser capaz de realizar as seguintes operações: Criar, atualizar, deletar e listar. A api possui validação de CPF e age.

## Como rodar o projeto

### Frontend React

```bash
cd frontend
npm i
npm run dev
```

### Backend Java Springboot

```bash
cd backend
mvnw clean
mvnw spring-boot:run
```

## Tecnologias do Frontend

- React
- TypeScript
- ESLint
- Prettier
- Tailwindcss
- Vite
- Shadcn UI

## Tecnologias do Backend

- Java
- Springboot
- Maven
- H2
- Lombok

## Documentação da API

### POST /clients

Realiza o cadastro de cliente. O cliente deve conter name, cpf e age maior que 0.

```json
{
  "name": "name do cliente",
  "cpf": "00000000000",
  "age": 18
}
```

### GET /clients

Retorna todos os clientes cadastros. A resposta será retornada em json.

### GET /clients/{id}

Retorna o cliente pelo id. A resposta será retornada em json.

### PUT /clients/{id}

Atualiza o cliente pelo id. O cliente deve conter name, cpf e age.

```json
{
  "name": "name do cliente",
  "cpf": "00000000000",
  "age": 18
}
```

### PATCH /clients/{id}

Atualiza o cliente pelo id. Pode-se informar apenas name, cpf ou age. Apenas os campos informados serão atualizados.

### DELETE /clients/{id}

Deleta o cliente pelo id.
