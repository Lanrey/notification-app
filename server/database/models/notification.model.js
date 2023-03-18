import db from "../config/knex";
import logger from "../../helper/logger"

const NOTIFICATION = 'notifications'


class Notification {

    static async createNotifications(body) {
        try {

            const result = await db(NOTIFICATION).insert(body);

            return result
            
        } catch (error) {
            logger.error(`${error} - ${error.message}`);
            return error.message
        }
    }

    static async getSingleNotification(notification_id, user_id) {
        try {
            const result = await db(NOTIFICATION)
            .first()
            .where('id', notification_id)
            .andWhere('user_id', user_id)

            return result
        } catch (error) {
            logger.error(`${error} - ${error.message}`);
            return error.message
        }
    }

    static async getAllNotification(page, user_id){
        try {
            const result = await db(NOTIFICATION)
            .select("*")
            .where('user_id', user_id)
            .paginate({perPage: 10, currentPage: page});

            return result
        } catch (error) {
            logger.error(`${error} - ${error.message}`);

            return error.message
        }
    }
}

export default Notification;