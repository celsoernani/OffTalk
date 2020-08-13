import { Kafka, logLevel } from 'kafkajs';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import ChatConsumer from './ChatConsumer';
import {
  addUser, removeUser, getUser, getUsers,
} from './controllers/users';

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 8000;
const routes = require('./routes');

const consumers = [];

app.use(routes);
/**
 * Faz conexão com o Kafka
 */
const kafka = new Kafka({
  clientId: 'off-talk',
  brokers: ['localhost:9092'],
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },
});

const producer = kafka.producer();
// const consumer = kafka.consumer({ groupId: 'chat' });

io.on('connection', (socket) => {
  socket.on('join', async ({ name }, callback) => {
    console.log(`Usário se conectou ao servidor com: 
                  ${socket.id} e se chama ${name}`);
    const { error, user } = addUser({ id: socket.id, name });
    if (error) callback({ error });
    socket.join('chat');
    // await producer.send({
    //   topic: 'chat-send',
    //   messages: [{
    //     value:
    //       JSON.stringify(user),
    //   },

    //   ],
    // });
    callback(user);
  });

  socket.on('sendMessage', async (message, callback) => {
    const { error } = getUser(socket.id);
    if (error) return callback(error);
    // sending to all clients except sender
    await producer.send({
      topic: 'chat-send',
      messages: [{
        value:
          JSON.stringify(message),
      },
      ],
    });
  });

  socket.on('online', async (user) => {
    /*
        // um único listener
      await consumer.connect();
      await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
      console.log('Resposta', String(message.value));
      const payload = JSON.parse(message.value);
      io.sockets.emit('message', payload);
    },
  });
    */
    const findConsumer = consumers.find((consumerChat) => consumerChat.userId === user.id);
    if (findConsumer) {
      await findConsumer.consumer.start();
    } else {
      const chatConsumer = new ChatConsumer(user.id, io);
      await chatConsumer.start();
      await chatConsumer.execute().catch(console.error);
      consumers.push({ userId: user.id, consumer: chatConsumer });
    }
  });

  socket.on('offline', async (user) => {
    // await consumer.disconnect();
    // // console.log('entrou aqui');
    const findConsumer = consumers.find((consumerChat) => consumerChat.userId === user.id);
    await findConsumer.consumer.closeConnection();
    // consumers = consumers.filter((consumerChat) => findConsumer !== consumerChat);
    // console.log('offline teste', consumers);
  });

  socket.on('getUsers', () => {
    io.to('chat').emit('newUser', { users: getUsers() });
  });


  socket.on('disconnect', async () => {
    const user = removeUser(socket.id);
    if (user) {
      const message = [{
        id: uuidv4(),
        text: 'ficou offline',
        createdAt: new Date(),
        user: {
          id: user.id,
          name: user.name,
        },
      }];
      await producer.send({
        topic: 'chat-send',
        messages: [{
          value:
            JSON.stringify(message),
        },
        ],
      });
    }
  });
});


async function run() {
  await producer.connect();
  // await consumer.connect();
  // await consumer.subscribe({ topic: 'chat-send' });
  // await consumer.run({
  //   eachMessage: async ({ topic, partition, message }) => {
  //     console.log('Resposta', String(message.value));
  //     const payload = JSON.parse(message.value);
  //     io.sockets.emit('message', payload);
  //   },
  // });
  server.listen(PORT, console.log(`Server started on port ${PORT}`));
}

// chatConsumer().catch(console.error);
run().catch(console.error);
