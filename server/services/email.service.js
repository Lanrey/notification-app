const dotenv = require('dotenv');
const appPath = require('app-root-path');
const sqMail = require('@sendgrid/mail');


dotenv.config({ path: `${appPath}/.env` });

sqMail.setApiKey(process.env.SENDGRID_API_KEY);


async function emailNotification(email, subject, text) {
    const msq  = {
        to: email,
        from: 'office@noteopx.com',
        subject,
        text
    }

    sqMail.send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
        })
        .catch((error) => {
            console.error(error);
        })
}

export default emailNotification