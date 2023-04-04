const amqplib = require('amqplib');

const queueName = "hello";

//const msg = "hello World";

const sendMsg = async () => {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false});
    console.log(`Waiting for messages in  queue: ${queueName}`);
    channel.consume(queueName, msg => {
        console.log("[x] Received:", JSON.parse(msg.content.toString()));
        
    }, {noAck: true});
}

sendMsg();