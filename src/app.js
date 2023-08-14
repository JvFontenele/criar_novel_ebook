import express from "express";
import novelcool from "./novelcool/controller.js";
import mtlnovel from "./mtlnovel/controller.js";
import novelMania from "./novelmania/controller.js";
class App {
  constructor() {
    this.app = express();
    this.Router();
  }
  listen(port) {
    this.app.listen(port, () => console.log(`listening on ${port} port !!`));
  }

  Router() {
    this.app.use(novelcool);
    this.app.use(mtlnovel);
    this.app.use(novelMania);
  }

  middleware() {}
}

export default App;
