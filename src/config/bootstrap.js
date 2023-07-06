import apiServer from "./api";
import apolloServer from "./apollo-server";
import mongooseServer from "./mongoose";
export default () => {
  // start mongodb
  mongooseServer();

  // start api
  apiServer();

  // start graphql
  apolloServer();
};
