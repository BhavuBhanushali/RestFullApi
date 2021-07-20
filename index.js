const express = require("express");
const path = require("path");
require("./db/db");
const app = express();
const config = require("./config/config");
const router = require("./router/index");

const port = config.port;
app.use("/apidoc", express.static(path.join(__dirname, "./apidoc")));

app.get("/", (req, res) => res.send("Server is running.."));
app.use(express.json());
app.use(router);

app.use(function (req, res) {
  res.status(404).send({ message: "Page Not Found!" });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
