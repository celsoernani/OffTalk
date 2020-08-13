/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import { Kafka, logLevel } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'off-talk',
  brokers: ['localhost:9092'],
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },
});

class ChatConsumer {
  constructor(id, io) {
    this.id = id;
    this.consumer = kafka.consumer({ groupId: 'chat' });
    this.io = io;
  }

  async execute() {
    const topic = 'chat-send';
    await this.consumer.subscribe({ topic });
    await this.consumer.connect();

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log('Resposta', String(message.value));
        const payload = JSON.parse(message.value);
        this.io.sockets.emit('message', payload);
      },
    });
  }

  async start() {
    await this.consumer.connect();
    console.log('ligando');
  }


  async closeConnection() {
    await this.consumer.disconnect();
    console.log('desligando closeConnection');
  }
}
export default ChatConsumer;
