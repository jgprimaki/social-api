import * as UserApi from "../services/user.service";

export default {
  queries: {
    users: (_, args) => UserApi.findAll(args),
    user: (_, args) => UserApi.findById(args)
  },

  mutations: {
    createUser: async (_, args) => {
      return await UserApi.createOrUpdate(args);
    },
    updateTheme: async (_, args) => {
      return await UserApi.update(args);
    }
  },

  subscriptions: {}
};
