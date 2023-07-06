import axios from "axios";
import ReadmeModel from "../models/readme.model";

const options = {
  baseURL: process.env.MAILCHIMP_BASE_PATH,
  auth: {
    username: process.env.MAILCHIMP_AUTH_USER,
    password: process.env.MAILCHIMP_AUTH_KEY,
  },
};

const PATH = `/campaigns`;
export default {
  /**
   * Busca o template do readme criado via mailchimp.
   * @param {*} params parametros de pesquisa
   */
  getContent: async (params) => {
    const campaignMailChimp = await getCampainMailChimp(params);
    const campaignLocal = await getCampaignLocal(campaignMailChimp.create_time);

    if (campaignLocal) {
      return campaignLocal;
    }

    const README_ID = campaignMailChimp.readme_id;
    const URI = {
      url: `${PATH}/${README_ID}/content`,
      ...options,
    };
    const { data } = await axios(URI);

    const readme = {
      document: data.archive_html,
      ...campaignMailChimp,
    };

    createReadmeLocal(readme);

    return readme;
  },

  getLastCampaignLocal: async () => {
    return await ReadmeModel.aggregate([
      { $project: { document: 0 } },
      { $sort: { create_time: -1 } },
      { $limit: 1 },
    ]);
  },
};

/**
 * Busca um readme de cada vez em ordem decrescente pela data de criação na api do mail chimp
 * @param {*} params parametros de pesquisa
 */
async function getCampainMailChimp(params) {
  const QUERY_PARAM = `?offset=${params.offset}&count=1&sort_field=create_time&sort_dir=DESC`;
  const URI = {
    url: `${PATH}${QUERY_PARAM}`,
    ...options,
  };
  const { data } = await axios(URI);

  const { total_items, campaigns } = data;
  const { id: readme_id, create_time, send_time, settings } = campaigns[0];
  const { preview_text: name } = settings;

  return {
    readme_id,
    name,
    create_time,
    send_time,
    total_items,
  };
}

async function getCampaignLocal(create_time) {
  return ReadmeModel.findOne({
    create_time,
  });
}

function createReadmeLocal(readme) {
  ReadmeModel.create(readme);
}
