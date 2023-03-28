import express from 'express';
import notification from "./notification.route";

const route = express.Router();


route.use("/notification", notification)


export default route;