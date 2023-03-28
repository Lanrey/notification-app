const dotenv = require('dotenv');
const appPath = require('app-root-path');

const admin = require('firebase-admin');


dotenv.config({ path: `${appPath}/.env` });

const serviceAccount = require(`${appPath}/noteopx-firebase-adminsdk-qf5kr-6cb5fd3851 (1).json`);


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

async function firebaseNotification(title, content, firebaseToken) {
    const payload = {
        notification: {
            title: title,
            body: content
        }
    }

    const options = {
        priority: "high",
        timeToLive: 60 * 60
    }

    const response = await admin.messaging().sendToDevice(firebaseToken, payload, options)
}

export default firebaseNotification
