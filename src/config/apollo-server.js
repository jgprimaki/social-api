import { ApolloServer, gql } from "apollo-server";
import { mergeTypes, fileLoader } from "merge-graphql-schemas";
import { resolve } from "path";

import resolvers from "../resolvers";

const schema = mergeTypes(fileLoader(resolve(__dirname, "../schema")));

const apolloOptions = {
  typeDefs: gql(schema),
  resolvers
};

export default async () => {
  await new ApolloServer(apolloOptions)
    .listen(process.env.GRAPHQL_PORT, process.env.GRAPHQL_HOST)
    .then(({ url, subscriptionsUrl }) => {
      console.log(
        "\x1b[36m%s\x1b[0m",
        "[Apollo] Server listening on",
        `${url}`
      );
      console.log(
        "\x1b[36m%s\x1b[0m",
        "[Apollo] Subscriptions ready at",
        `${subscriptionsUrl}`
      );
    });
};
