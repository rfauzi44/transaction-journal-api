require("dotenv").config();
const express = require("express");
const server = express();
const PORT = process.env.PORT || 3001;
const db = require("./src/configs/db");
const router = require("./src/routers/index");
const cors = require("cors");

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(router);

db
  .connect()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`app running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
