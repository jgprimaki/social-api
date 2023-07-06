import compress from "koa-compress";

export default app => {
  // middlwares
  app.use(
    compress({
      filter: function(content_type) {
        return /text/i.test(content_type);
      },
      threshold: 2048,
      flush: require("zlib").Z_SYNC_FLUSH
    })
  );
};
