const amqplib = require('amqplib');

const queueName1 = "reset-password";
const msg1 = {
    email: "akinsulereolusola@gmail.com",
    first_name: "olusola",
    link_url: "https://google.com"
}

const queueName2  = "reset-password-successful";
const msg2 = {
    email: "akinsulereolusola@gmail.com",
    first_name: "olusola"
}

const queueName3 = "verify-email";
const msg3 = {
    email: "akinsulereolusola@gmail.com",
    first_name: "olusola",
    link_url1: "https://google.com"
}

const queueName4 = "welcome-email";
const msg4 = {
    email: "akinsulereolusola@gmail.com",
    first_name: "olusola"
}
const msg = {
    user_id: 2,
    content: "Sola and sons",
    email: "olusola.akinsulere@gmail.com",
    title: "Binta and friends",
    subject: "Binta and friends produced by Wale Adenuga Productions",
    firebaseToken: 'xndkdkk-jdjdjjd-djdjdj-kdkd'
};

let payload = JSON.stringify(msg);

let payload1 = JSON.stringify(msg1);

let payload2 = JSON.stringify(msg2);

let payload3 = JSON.stringify(msg3);


let payload4 = JSON.stringify(msg4);

const sendMsg = async () => {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName1, { durable: false});
    channel.sendToQueue(queueName1, Buffer.from(payload1));
    console.log('sent: ', msg1);
    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
}

sendMsg();