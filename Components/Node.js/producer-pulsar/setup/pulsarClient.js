const Pulsar = require("pulsar-client");

const connection = {
  client: Object,
  producer: Object,
};

function Connect(url, topicName) {
  (async () => {
    connection.client = new Pulsar.Client({
      serviceUrl: url,
      operationTimeoutSeconds: 30,
    });

    // Create a producer
    connection.producer = await connection.client.createProducer({
      topic: topicName,
      sendTimeoutMs: 30000,
      batchingEnabled: true,
    });
  })();

  return connection;
}

function GetConnection() {
  return connection;
}

module.exports = { Connect, GetConnection };
