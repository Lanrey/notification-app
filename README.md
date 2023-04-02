# notification-app

1. Uses RabbitMQ to consume messages from a producer
2. Uses GRPC Server to act as server and sends rpc messages to the client (API-Gateway)
3. Follows the domain driven architectural pattern for node.js

# how to run
1. copy enviroment variables from .env.sample to .env
2. npm run start:dev

# Format of message to be sent to notification service


const msg = {
    user_id: 2,
    content: "Sola and sons",
    email: "olusola.akinsulere@gmail.com",
    title: "Binta and friends",
    subject: "Binta and friends produced by Wale Adenuga Productions",
    firebaseToken: 'xndkdkk-jdjdjjd-djdjdj-kdkd'
};