require("dotenv").config();
const express = require("express");
const app = express();
const PulsarClient = require("./setup/pulsarClient");

const connection = PulsarClient.Connect(
  process.env.PULSAR_URL,
  process.env.TOPIC_NAME,
  process.env.SUBSCRIPTION_NAME,
  process.env.SUBSCRIPTION_TYPE
);

const server = app.listen(process.env.PORT, () =>
  console.log("Server Started")
);

function handleShutdownGracefully() {
  console.info("Closing Server...");

  server.close(async () => {
    await connection.consumer.close();
    await connection.client.close();

    console.info("Server closed.");
    process.exit(0); // if required
  });
}
process.on("SIGINT", handleShutdownGracefully);
process.on("SIGTERM", handleShutdownGracefully);
process.on("SIGHUP", handleShutdownGracefully);
