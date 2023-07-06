import * as CakeTeamApi from "../services/cakeTeam.service";

export default {
  queries: {
    cakeTeams: (_, args) => CakeTeamApi.findAll(args),
    cakeTeam: (_, args) => CakeTeamApi.findById(args)
  },

  mutations: {},

  subscriptions: {}
};
