import ReadmeService from "../services/readme.service";
export default {
  find: async params => {
   return await ReadmeService.getContent(params);
  },

  findLast: async () => {
    return await ReadmeService.getLastCampaignLocal();
  }
};
