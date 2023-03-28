const amqplib = require('amqplib');

const queueName = "notifications";

const msg = {
    user_id: 2,
    content: "Sola and sons",
    email: "olusola.akinsulere@gmail.com",
    title: "Binta and friends",
    subject: "Binta and friends produced by Wale Adenuga Productions",
    firebaseToken: 'xndkdkk-jdjdjjd-djdjdj-kdkd'
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