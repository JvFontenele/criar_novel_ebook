import App from "./app.js";

const server = new App();

server.listen(process.env.PORT || 8000);