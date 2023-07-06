import Cors from "@koa/cors";
import Koa from "koa";
import BodyParser from "koa-bodyparser";
import Logger from "koa-logger";
import Router from "koa-router";

import createRoutes from "../routes/routes";
import compress from "./compress";

// init
const server = new Koa();
const router = new Router({
  prefix: `${process.env.API_BASE_PATH}${process.env.API_VERSION}`
});

export default () => {
  // compress
  compress(server);

  // create routes
  createRoutes(router);

  // middlwares
  server
    .use(Logger())
    .use(Cors())
    .use(BodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

  // start api
  server.listen(process.env.API_PORT, process.env.API_HOST, error => {
    if (error)
      console.log(
        "\x1b[41m%s\x1b[0m",
        "[Koa] Unable to listen for connections",
        error
      );
    console.log(
      "\x1b[36m%s\x1b[0m",
      "[Koa] Server listening on",
      `http://${process.env.API_HOST}:${process.env.API_PORT}${router.opts.prefix}`
    );
  });
};
