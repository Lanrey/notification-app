import Notification from "../database/models/notification.model";
import { serverResponse, serverError } from "../helper/serverResponse";
import pb from "../../notes-protos-nodejs/notification/notification_pb";
import * as grpc from '@grpc/grpc-js';
import { HttpError } from "../helper";

exports.getNotification = async (call, callback) => {
    try {
        const user_id = call.request.getUserId();
        const notification_id = call.request.getNotificationId();

       
        const result = await Notification.getSingleNotification(Number(notification_id), Number(user_id));
       
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

        const result = await Notification.getAllNotifications(Number(page), Number(user_id));

        const newResult = result.data.map(res => {

            const container = {};

            container.id = String(res.id);
            container.subject = String(res.subject);
            container.title = String(res.title);
            container.content = String(res.content);
            container.user_id = String(res.user_id);

            return container

        })


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