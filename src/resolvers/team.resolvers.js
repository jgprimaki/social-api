import * as TeamApi from "../services/team.service";

export default {
  queries: {
    teams: (_, args) => TeamApi.findAll(args),
    team: (_, args) => TeamApi.findById(args)
  },

  mutations: {},

  subscriptions: {}
};
