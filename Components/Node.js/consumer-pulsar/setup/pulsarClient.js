const Pulsar = require("pulsar-client");

const connection = {
  consumer: Object,
  client: Object,
};

function Connect(url, topicName, subName, subType) {
  (async () => {
    // Create a client
    connection.client = new Pulsar.Client({
      serviceUrl: url,
      operationTimeoutSeconds: 30,
    });

    // Create a consumer with listener
    connection.consumer = await connection.client.subscribe({
      topic: topicName,
      subscription: subName,
      subscriptionType: subType,
      listener: (msg, msgConsumer) => {
        console.log(msg.getData().toString());
        const obj = JSON.parse(msg.getData);
        msgConsumer.acknowledge(msg);
      },
    });
  })();

  return connection;
}

function GetConnection() {
  return connection;
}

module.exports = { Connect, GetConnection };
