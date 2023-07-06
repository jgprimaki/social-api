import { withFilter } from "graphql-subscriptions";

import pubsub from "../config/pubsub";
import * as NotificationApi from "../services/notification.service";

export default {
  queries: {
    notifications: async (_, args) => NotificationApi.findAll(args),
  },

  mutations: {
    createNotification: async (_, args) => {
      const notification = await NotificationApi.create(args);

      pubsub.publish("notificationCreated", {
        notificationCreated: notification,
      });

      return notification;
    },

    deactivateNotification: async (_, args) => {
      return NotificationApi.deactivateNotification(args);
    },
  },

  subscriptions: {
    notificationCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("notificationCreated"),
        (payload, variables) => {
          const { user } = variables;
          const { user: payloadUser } = payload.notificationCreated;
          return (
            payloadUser.toString() == user || payloadUser._id.toString() == user
          );
        }
      ),
    },
  },
};
