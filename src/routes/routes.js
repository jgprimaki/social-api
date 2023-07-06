import ReadmeController from "../controllers/readme.controller";

export default router => {
  router.get("/readmes", async ctx => {
    ctx.body = await ReadmeController.find(ctx.request.query);
  });

  router.get("/dashboard/readme", async ctx => {
    ctx.body = await ReadmeController.findLast(ctx.request.query);
  });
};
