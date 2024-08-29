# desafio-shopper
Back-end de um serviço que gerencia a leitura individualizada de consumo de água e gás. Para facilitar a coleta da informação, o serviço utilizará IA para obter a medição através da foto de um medidor.
Seu endpoint `GET /:customer_code/list` parece estar bem configurado. Vamos testar esse endpoint usando o Insomnia.

### Passos para Testar o Endpoint

#### 1. Iniciar o Servidor
Certifique-se de que seu servidor está rodando:
```bash
npm run build
npm start
```
O servidor deve estar rodando na porta 3000.

#### 2. Abrir o Insomnia
Abra o Insomnia. Se ainda não tem, baixe e instale [aqui](https://insomnia.rest/download).

#### 3. Criar uma Nova Requisição
- Clique em "New Request".
- Nomeie a requisição como "Listar Medidas".
- Selecione o método HTTP `GET`.

#### 4. Configurar a URL da Requisição
- No campo de URL, insira `http://localhost:3000/<customer_code>/list`, substituindo `<customer_code>` pelo código do cliente que você deseja testar.
- Se quiser filtrar por tipo de medida, adicione o query parameter `measure_type`. Por exemplo: `http://localhost:3000/<customer_code>/list?measure_type=WATER`.

#### 5. Enviar a Requisição
- Clique em "Send".
- Verifique a resposta do servidor na aba de resposta.

### Exemplo de Resposta Esperada
A resposta deve ser uma lista de medidas realizadas pelo cliente. Aqui está um exemplo de como a resposta pode parecer:
```json
{
  "customer_code": "12345",
  "measures": [
    {
      "measure_id": "1",
      "measure_type": "WATER",
      "measure_value": 150,
      "measure_datetime": "2024-08-29T08:00:00Z"
    },
    {
      "measure_id": "2",
      "measure_type": "GAS",
      "measure_value": 75,
      "measure_datetime": "2024-08-29T08:00:00Z"
    }
  ]
}
```

### Verificação
- **Status 200**: Sucesso, a resposta deve conter o código do cliente e uma lista de medidas.
- **Status 400**: Tipo de medição inválido, a resposta deve conter `error_code` e `error_description`.
- **Status 404**: Nenhuma leitura encontrada, a resposta deve conter `error_code` e `error_description`.
- **Status 500**: Erro ao buscar leituras, a resposta deve indicar um erro interno do servidor.
