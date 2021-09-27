import express from "express";
import {
  getJoin,
  getLogin,
  postJoin,
  postLogin,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { pubilcOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").all(pubilcOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter
  .route("/login")
  .all(pubilcOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;
