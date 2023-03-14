import Notification from "../database/models/notification.model";
import { serverResponse, serverError } from "../helper/serverResponse";


class Notifications {

    static async getSingleNotification(req, res) {
        try {

            const {user_id} = req.query;
            const {notification_id} = req.params;

            const result = await Notification.getSingleNotification(notification_id, user_id);

            if(Object.is(result, undefined)) {
                return serverResponse(req, res, 404, { data: "Notification not found"});
            }

            return serverResponse(req, res, 200, { data: result});
            
        } catch (error) {
            return serverError(req, res, error);
        }
    }


    static async getAllNotification(req, res) {
        try {

            const { page } = req.params;
            const {user_id} = req.query;

            const newPage = Number(page);

            const result = await Notification.getAllNotification(newPage, user_id);

            return serverResponse(req, res, 200, { data: result });
            
        } catch (error) {
            return serverError(req, res, error);
        }
    }
}

export default Notifications