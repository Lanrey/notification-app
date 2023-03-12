const amqplib = require('amqplib');

const queueName = "hello";

const msg = {
    id: 1,
    content: "Sola and sons",
    email: "olusola.akinsulere"
};

let payload = JSON.stringify(msg);

const sendMsg = async () => {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false});
    channel.sendToQueue(queueName, Buffer.from(payload));
    console.log('sent: ', msg);
    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
}

sendMsg();