import initBugsController from "./controllers/bugController.mjs";
import initFeaturesController from "./controllers/featureController.mjs";
import initUsersController from "./controllers/userController.mjs";
import db from "./models/index.mjs";

export default function bindRoutes(app) {
  // initialize the controller functions here
  // pass in the db for all callbacks
  const BugController = initBugsController(db);
  const FeatureController = initFeaturesController(db);
  const UserController = initUsersController(db);

  // define your route matchers here using app
  app.get("/", BugController.root);
  app.post("/create", BugController.create);
  app.get("/bugsIndex", BugController.index);

  app.get("/featureIndex", FeatureController.index);

  app.get("/checkLogin", UserController.login);
}
