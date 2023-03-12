const dotenv = require('dotenv');
const appPath = require('app-root-path');

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


dotenv.config({ path: `${appPath}/.env` });

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "noteopx.firebaseapp.com",
    projectId: "noteopx",
    storageBucket: "noteopx.appspot.com",
    messagingSenderId: process.env.MESSAGE_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);