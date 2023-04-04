const amqplib = require('amqplib');
const dotenv = require('dotenv');
const appPath = require('app-root-path');


dotenv.config({ path: `${appPath}/.env` });


const link = process.env.rabbitmqurl;

const connection = amqplib.connect(link);


function connect() {
    return connection
}


module.exports = {
    connect
}

