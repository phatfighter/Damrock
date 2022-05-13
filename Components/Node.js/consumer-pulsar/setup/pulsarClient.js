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

    let counter = 0;
    // Create a consumer with listener
    connection.consumer = await connection.client.subscribe({
      topic: topicName,
      subscription: subName,
      subscriptionType: subType,
      listener: (msg, msgConsumer) => {
        counter += 1;
        try {
          console.log(`Received ${counter} messages`);
          //console.log(msg.getData().toString());
          msgConsumer.acknowledge(msg);
        } catch (err) {
          console.log(err);
        }
      },
    });
  })();

  return connection;
}

function GetConnection() {
  return connection;
}

module.exports = { Connect, GetConnection };
