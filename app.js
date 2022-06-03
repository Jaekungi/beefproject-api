require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/authRoute");

const app = express();
app.use(express.json());
app.use(cors());

const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");

app.use("/auth", authRoute);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8200;
app.listen(port, () => console.log("server running on port: " + port));
