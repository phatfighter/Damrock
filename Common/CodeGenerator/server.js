require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const functionsRouter = require("./routes/functions");
app.use("/functions", functionsRouter);

app.listen(process.env.PORT, () => console.log("Server Started"));
