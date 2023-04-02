const dotenv = require('dotenv');
const appPath = require('app-root-path');
const sqMail = require('@sendgrid/mail');


dotenv.config({ path: `${appPath}/.env` });

sqMail.setApiKey(process.env.SENDGRID_API_KEY);


async function emailNotification(email, subject, text) {
    const msg  = {
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

async function getVerifyEmail(email, first_name, link_url1) {

    const msg = {
        to: email,
        from :'office@noteopx.com',
        templateId: 'd-cacc59dcc44d46a5a1fb62e56a7152a2',
        dynamic_template_data: {
            first_name,
            link_url1
        }

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

async function getResetSuccessfulEmail(email, first_name) {

    const msg = {
        to: email,
        from :'office@noteopx.com',
        templateId: 'd-c3e895d3cb7d45d987da4f174bc16d4b',
        dynamic_template_data: {
            first_name,
        }

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

async function getResetPassword(email, first_name, link_url) {

    const msg = {
        to: email,
        from :'office@noteopx.com',
        templateId: 'd-8f7481e55b084093b19ae706572212c1',
        dynamic_template_data: {
            first_name,
            link_url
        }

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

async function getWelcomeEmail(email, first_name) {
    const msg = {
        to: email,
        from :'office@noteopx.com',
        templateId: 'd-069596fc90674e1ea9d606b7827bf541',
        dynamic_template_data: {
            first_name,
        }

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

export  {emailNotification, getVerifyEmail, getResetSuccessfulEmail, getResetPassword, getWelcomeEmail}