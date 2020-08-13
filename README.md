# OffTalk

Chat com funcionalidade de escolha de estado entra online e offline. Utilizando [Kafka](https://kafka.apache.org/intro).
## Installation

Use the package manager [yarn](https://yarnpkg.com/) to install the project in two folder, FrontEnd, e Server.


# Executando

Na pasta do projeto e com Docker e Docker Compose instalados em sua máquina executar 

```bash
docker-compose up -d
```

Isso vai subir as instancias do [Apache Zookeeper](http://zookeeper.apache.org/) -  é um serviço centralizado para, entre outras coisas, coordenação de sistemas distribuídos. - e Kafka.

Entrar na pasta <b> FrontEnd </b> e executar os comandos:

```JavaScript
yarn &&
yarn start
```

Entrar na pasta <b> Server </b> e executar o comando:

```JavaScript
yarn &&
yarn start
```

# Observações

Caso deseje mudar a porta do server, basta entrar no index.js que está em Server/src e alterar o link do serverbind.
