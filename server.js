const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

app.use(bodyParser());
app.use(cors());

//untuk melihat file
app.use("/file", express.static("uploads"));

const router = require("./src/routes/router");

app.use("/api/v1/", router);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
