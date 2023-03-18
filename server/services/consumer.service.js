import Notification from "../database/models/notification.model";
import emailNotification from "./email.service";
import firebaseNotification from "./firebase.service";
import { logger } from "../helper";
const amqplib = require('amqplib');
const dotenv = require('dotenv');
const appPath = require('app-root-path');


dotenv.config({ path: `${appPath}/.env` });



async function getNotifications() {
    try {

        const queueName = 'notifications';
        const connection = await amqplib.connect(process.env.rabbitmqurl);
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, { durable: false});
        console.log(`Waiting for messages in  queue: ${queueName}`);
        channel.consume(queueName, async(msg) => {

            console.log("[x] Received:", JSON.parse(msg.content.toString()));

            const payloadObject = JSON.parse(msg.content.toString());
            const databaseObject = {
                user_id: payloadObject.user_id,
                subject: payloadObject.subject,
                title: payloadObject.title,
                content: payloadObject.content
            }
            await Notification.createNotifications(databaseObject)
            await emailNotification(payloadObject.email, payloadObject.subject, payloadObject.content)
            await firebaseNotification(payloadObject.title, payloadObject.content, payloadObject.firebaseToken)
       
        }, {noAck: true});
        
    } catch (error) {
        logger.error(`${error} - ${error.message}`);
    }
}

export {getNotifications}