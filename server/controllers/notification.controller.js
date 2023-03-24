import Notification from "../database/models/notification.model";
import { serverResponse, serverError } from "../helper/serverResponse";
import pb from "../../notes-protos-nodejs/notification/notification_pb";
import * as grpc from '@grpc/grpc-js';
import { HttpError } from "../helper";


/*

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
*/


exports.getNotification = async (call, callback) => {
    try {
        const user_id = call.request.getUserId();
        const notification_id = call.request.getNotificationId();

        console.log('user_id', user_id);
        console.log('notification_id', notification_id);

       
        const result = await Notification.getSingleNotification(Number(notification_id), Number(user_id));
  

        console.log(result);

       
        const response = new pb.GetNotificationResponse()
        .setId(String(result.id))
        .setSubject(result.subject)
        .setTitle(result.title)
        .setContent(result.content)
        .setUserId(String(result.user_id));
        callback(null, response)

    } catch (error) {
      if (error instanceof HttpError) {
        callback({
          code:
            error.status == 404
              ? grpc.status.NOT_FOUND
              : grpc.status.INVALID_ARGUMENT,
          message: error.message,
        });
      }
      callback({
        code: grpc.status.INTERNAL,
        message: error?.message,
      });
    }
  };



exports.getAllNotification = async (call, callback) => {
    try {
        const user_id = call.request.getUserId();
        const page = call.request.getPage();

        console.log('user_id', user_id);
        console.log('page', page);

       

        const result = await Notification.getAllNotifications(Number(page), Number(user_id));

        console.log(result.pagination);

        const newResult = result.data.map(res => {

            const container = {};

            container.id = String(res.id);
            container.subject = String(res.subject);
            container.title = String(res.title);
            container.content = String(res.content);
            container.user_id = String(res.user_id);

            return container

        })

        console.log("new Result", newResult)

        const notification = newResult.map(res => {
           const notifs =  new pb.GetNotificationResponse()
            .setId(String(res.id))
            .setSubject(res.subject)
            .setTitle(res.title)
            .setContent(res.content)
            .setUserId(String(res.user_id));

            return notifs
        }) 

       
        const response = new pb.GetAllNotificationResponse()
        .setNotificationsList(notification)
        .setTotal(String(result.pagination.total))
        .setLastpage(String(result.pagination.lastPage))
        .setPerpage(String(result.pagination.perPage))
        .setCurrentpage(String(result.pagination.currentPage))
        .setFrom(String(result.pagination.from))
        .setTo(String(result.pagination.to))
        callback(null, response)

    } catch (error) {
      if (error instanceof HttpError) {
        callback({
          code:
            error.status == 404
              ? grpc.status.NOT_FOUND
              : grpc.status.INVALID_ARGUMENT,
          message: error.message,
        });
      }
      callback({
        code: grpc.status.INTERNAL,
        message: error?.message,
      });
    }
  };