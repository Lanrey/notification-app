import express from 'express';
import Notifications from '../controllers/notification.controller';

const route = express.Router();

route.get('/:notification_id', Notifications.getSingleNotification)
route.get('/get-all-notifications/:page', Notifications.getAllNotification)


export default route;