const express = require("express");
const methodRouter = express.Router();
const securityMiddleware = require("./middlewares/security");

methodRouter.post("/", securityMiddleware, async (req, resp) => {
  let { Class, Method, Params } = req.body;
  let classInstance = Reflect.construct(require(`./services/${Class}`), []);

  let data = await Reflect.apply(classInstance[Method], undefined, Params);

  resp.send(data);
});

module.exports = methodRouter;
