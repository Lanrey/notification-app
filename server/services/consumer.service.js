import Notification from "../database/models/notification.model";
import {
  emailNotification,
  getVerifyEmail,
  getResetPassword,
  getResetSuccessfulEmail,
  getWelcomeEmail,
} from "./email.service";
import firebaseNotification from "./firebase.service";
// import { console } from "../helper";
const amqplib = require("amqplib");
const dotenv = require("dotenv");
const appPath = require("app-root-path");

dotenv.config({ path: `${appPath}/.env` });

async function getNotifications() {
  try {
    const queueName = "notifications";
    const connection = await amqplib.connect(process.env.rabbitmqurl);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
    console.log(`Waiting for messages in  queue: ${queueName}`);
    channel.consume(
      queueName,
      async (msg) => {
        console.log("[x] Received:", JSON.parse(msg.content.toString()));

        const payloadObject = JSON.parse(msg.content.toString());
        const databaseObject = {
          user_id: payloadObject.user_id,
          subject: payloadObject.subject,
          title: payloadObject.title,
          content: payloadObject.content,
        };
        await Notification.createNotifications(databaseObject);
        await emailNotification(
          payloadObject.email,
          payloadObject.subject,
          payloadObject.content
        );
        await firebaseNotification(
          payloadObject.title,
          payloadObject.content,
          payloadObject.firebaseToken
        );
      },
      { noAck: true }
    );
  } catch (error) {
    console.error(`${error} - ${error.message}`);
  }
}

async function getVerifyEmails() {
  try {
    const queueName = "verify-email";
    const connection = await amqplib.connect(process.env.rabbitmqurl);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
    console.log(`Waiting for messages in  queue: ${queueName}`);

    channel.consume(
      queueName,
      async (msg) => {
        console.log("[x] Received:", JSON.parse(msg.content.toString()));

        const payloadObject = JSON.parse(msg.content.toString());

        await getVerifyEmail(
          payloadObject.email,
          payloadObject.first_name,
          payloadObject.link_url1
        );
      },
      { noAck: true }
    );
  } catch (error) {
    console.error(`${error} - ${error.message}`);
  }
}

async function getResetSuccessfulEmails() {
  try {
    const queueName = "reset-password-successful";
    const connection = await amqplib.connect(process.env.rabbitmqurl);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
    console.log(`Waiting for messages in  queue: ${queueName}`);

    channel.consume(
      queueName,
      async (msg) => {
        console.log("[x] Received:", JSON.parse(msg.content.toString()));

        const payloadObject = JSON.parse(msg.content.toString());

        await getResetSuccessfulEmail(
          payloadObject.email,
          payloadObject.first_name
        );
      },
      { noAck: true }
    );
  } catch (error) {
    console.error(`${error} - ${error.message}`);
  }
}

async function getResetPasswords() {
  try {
    const queueName = "reset-password";
    const connection = await amqplib.connect(process.env.rabbitmqurl);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
    console.log(`Waiting for messages in  queue: ${queueName}`);

    channel.consume(
      queueName,
      async (msg) => {
        console.log("[x] Received:", JSON.parse(msg.content.toString()));

        const payloadObject = JSON.parse(msg.content.toString());

        await getResetPassword(
          payloadObject.email,
          payloadObject.first_name,
          payloadObject.link_url
        );
      },
      { noAck: true }
    );
  } catch (error) {
    console.error(`${error} - ${error.message}`);
  }
}

async function getWelcomeEmails() {
  try {
    const queueName = "welcome-email";
    const connection = await amqplib.connect(process.env.rabbitmqurl);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
    console.log(`Waiting for messages in  queue: ${queueName}`);

    channel.consume(
      queueName,
      async (msg) => {
        console.log("[x] Received:", JSON.parse(msg.content.toString()));

        const payloadObject = JSON.parse(msg.content.toString());

        await getWelcomeEmail(payloadObject.email, payloadObject.first_name);
      },
      { noAck: true }
    );
  } catch (error) {
    console.error(`${error} - ${error.message}`);
  }
}

export {
  getNotifications,
  getVerifyEmails,
  getResetPasswords,
  getWelcomeEmails,
  getResetSuccessfulEmails,
};
