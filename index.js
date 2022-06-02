require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("server running on port: " + port));
