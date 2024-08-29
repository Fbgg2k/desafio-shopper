# desafio-shopper
Back-end de um serviço que gerencia a leitura individualizada de consumo de água e gás. Para facilitar a coleta da informação, o serviço utilizará IA para obter a medição através da foto de um medidor.
Seu endpoint `GET /:customer_code/list` parece estar bem configurado. Vamos testar esse endpoint usando o Insomnia.

---

# Documentação do Projeto

## Visão Geral
Este projeto é uma aplicação Node.js desenvolvida com TypeScript e Docker. O objetivo é gerenciar leituras individualizadas de consumo de água e gás, utilizando IA para obter medições através de fotos de medidores.

## Tecnologias Utilizadas
- **Node.js**: Plataforma de desenvolvimento que permite a execução de JavaScript no servidor.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática e outros recursos avançados.
- **Docker**: Plataforma de contêineres que facilita a criação, o teste e a implantação de aplicações.

## Estrutura do Projeto
```
/leitura-consumo
├── src
│   ├── index.ts
│   ├── routes.ts
│   └── ...
├── dist
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── imagem.png
└── README.md
```

## Comandos Importantes
### `npm run build`
Este comando compila o código TypeScript para JavaScript, gerando os arquivos na pasta `dist`.

### `npm start`
Este comando inicia o servidor Node.js utilizando os arquivos compilados na pasta `dist`.

## Iniciando o Projeto
1. **Instalar Dependências**:
   ```bash
   npm install
   ```

2. **Compilar o Código**:
   ```bash
   npm run build
   ```

3. **Iniciar o Servidor**:
   ```bash
   npm start
   ```
   O servidor estará rodando na porta 3000.

## Testando com Insomnia
### 1. Teste de Upload de Imagem
Para testar a rota `/upload`, siga os passos abaixo:

1. **Converter a Imagem para Base64**:
   - Utilize uma ferramenta online como [Base64 Image Encoder](https://www.base64-image.de/) para converter a imagem do medidor para base64.
   - A imagem `imagem.png` deve estar na raiz do projeto.

2. **Configurar a Requisição no Insomnia**:
   - Método: `POST`
   - URL: `http://localhost:3000/upload`
   - Headers: `Content-Type: application/json`
   - Body (JSON):
     ```json
     {
       "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...",
       "customer_code": "12345",
       "measure_datetime": "2024-08-29T08:00:00Z",
       "measure_type": "monthly"
     }
     ```

3. **Enviar a Requisição**:
   - Clique em "Send" e verifique a resposta do servidor.

## Docker
### Dockerfile
O `Dockerfile` define como a imagem Docker será construída:
```dockerfile
FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/index.js"]
```

### docker-compose.yml
O `docker-compose.yml` facilita a orquestração de múltiplos contêineres:
```yaml
version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
```

### Iniciar com Docker
1. **Construir a Imagem Docker**:
   ```bash
   docker-compose build
   ```

2. **Iniciar o Contêiner**:
   ```bash
   docker-compose up
   ```

## Conclusão
Esta documentação cobre os aspectos principais do projeto, incluindo as tecnologias utilizadas, comandos npm, testes com Insomnia e configuração Docker. Se precisar de mais informações ou ajuda, sinta-se à vontade para abrir uma issue no repositório.

---
