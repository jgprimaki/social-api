import cakeTeamResolver from "./cakeTeam.resolvers";
import meetingResolvers from "./meeting.resolvers";
import notificationResolver from "./notification.resolvers";
import teamResolver from "./team.resolvers";
import userResolver from "./user.resolvers";

export default {
  Query: {
    ...meetingResolvers.queries,
    ...userResolver.queries,
    ...cakeTeamResolver.queries,
    ...teamResolver.queries,
    ...notificationResolver.queries
  },

  Mutation: {
    ...meetingResolvers.mutations,
    ...userResolver.mutations,
    ...notificationResolver.mutations
  },

  Subscription: {
    ...meetingResolvers.subscriptions,
    ...userResolver.subscriptions,
    ...notificationResolver.subscriptions
  }
};
