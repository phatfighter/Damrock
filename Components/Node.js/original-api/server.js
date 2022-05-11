require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const controllerRouter = require("./routes/controller");
app.use(process.env.API_NAME, controllerRouter);

app.listen(process.env.PORT, () => console.log("Server Started"));
