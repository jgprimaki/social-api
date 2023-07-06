import pubsub from "../config/pubsub";
import * as MeetingService from "../services/meeting/meeting.service";
import NotificationResolve from "../resolvers/notification.resolvers";

export default {
  queries: {
    meetings: async (_, args) => MeetingService.findAll(args),
    meeting: async (_, args) => MeetingService.findById(args),
    meetingCount: async () => MeetingService.count(),
  },

  mutations: {
    createMeeting: async (_, args) => {
      const { input } = args;
      const meeting = await MeetingService.create(input);

      pubsub.publish("meetingCreated", {
        meetingCreated: meeting,
      });

      if (meeting) {
        const notifications = MeetingService.notificationCreated(input);
        notifications.forEach((notification) =>
          NotificationResolve.mutations.createNotification(_, notification)
        );
      }

      return meeting;
    },

    cancelMeeting: async (_, args) => {
      const { id } = args;
      const meeting = await MeetingService.cancel(id);

      pubsub.publish("meetingCanceled", {
        meetingCanceled: meeting,
      });

      if (meeting) {
        const notifications = await MeetingService.notificationCanceled(id);
        notifications.forEach((notification) =>
          NotificationResolve.mutations.createNotification(_, notification)
        );
      }

      return meeting;
    },
  },

  subscriptions: {
    meetingCreated: {
      subscribe: () => pubsub.asyncIterator("meetingCreated"),
    },
    meetingCanceled: {
      subscribe: () => pubsub.asyncIterator("meetingCanceled"),
    },
  },
};
