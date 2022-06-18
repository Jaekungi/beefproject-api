require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const reviewRoute = require("./routes/reviewRoute");
const userRoute = require("./routes/userRoute");
const { sequelize } = require("./models/index");

const app = express();
app.use(express.json());
app.use(cors());

const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");
const authenticate = require("./middlewares/authenticate");

app.use("/auth", authRoute);
app.use("/review", reviewRoute);
app.use("/user", authenticate, userRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

// app.use()

const port = process.env.PORT || 8200;
// sequelize.sync({ fore: true });
app.listen(port, () => console.log("server running on port: " + port));

// sequelize.sync({
//   force: true,
// });
