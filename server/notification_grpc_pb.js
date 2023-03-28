// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var notification_pb = require('./notification_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_notification_GetAllNotificationRequest(arg) {
  if (!(arg instanceof notification_pb.GetAllNotificationRequest)) {
    throw new Error('Expected argument of type notification.GetAllNotificationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notification_GetAllNotificationRequest(buffer_arg) {
  return notification_pb.GetAllNotificationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notification_GetAllNotificationResponse(arg) {
  if (!(arg instanceof notification_pb.GetAllNotificationResponse)) {
    throw new Error('Expected argument of type notification.GetAllNotificationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notification_GetAllNotificationResponse(buffer_arg) {
  return notification_pb.GetAllNotificationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notification_GetNotificationRequest(arg) {
  if (!(arg instanceof notification_pb.GetNotificationRequest)) {
    throw new Error('Expected argument of type notification.GetNotificationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notification_GetNotificationRequest(buffer_arg) {
  return notification_pb.GetNotificationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_notification_GetNotificationResponse(arg) {
  if (!(arg instanceof notification_pb.GetNotificationResponse)) {
    throw new Error('Expected argument of type notification.GetNotificationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_notification_GetNotificationResponse(buffer_arg) {
  return notification_pb.GetNotificationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var NotificationServiceService = exports.NotificationServiceService = {
  getNotification: {
    path: '/notification.NotificationService/getNotification',
    requestStream: false,
    responseStream: false,
    requestType: notification_pb.GetNotificationRequest,
    responseType: notification_pb.GetNotificationResponse,
    requestSerialize: serialize_notification_GetNotificationRequest,
    requestDeserialize: deserialize_notification_GetNotificationRequest,
    responseSerialize: serialize_notification_GetNotificationResponse,
    responseDeserialize: deserialize_notification_GetNotificationResponse,
  },
  getAllNotification: {
    path: '/notification.NotificationService/getAllNotification',
    requestStream: false,
    responseStream: false,
    requestType: notification_pb.GetAllNotificationRequest,
    responseType: notification_pb.GetAllNotificationResponse,
    requestSerialize: serialize_notification_GetAllNotificationRequest,
    requestDeserialize: deserialize_notification_GetAllNotificationRequest,
    responseSerialize: serialize_notification_GetAllNotificationResponse,
    responseDeserialize: deserialize_notification_GetAllNotificationResponse,
  },
};

exports.NotificationServiceClient = grpc.makeGenericClientConstructor(NotificationServiceService);
