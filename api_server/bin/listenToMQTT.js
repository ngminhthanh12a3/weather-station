const mqtt = require("mqtt");

const host = process.env.BROKER_HOST || "localhost";
const port = process.env.BROKER_PORT || "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `mqtt://${host}:${port}`;
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: "username",
  password: "password",
  reconnectPeriod: 1000,
});

module.exports.client = client;

const topic = "esp/publish";

const start = async () => {
  await client.on("connect", async () => {
    console.log("MQTT Connected");
    await client.subscribe([topic], () => {
      console.log(`MQTT Subscribe to topic '${topic}'`);
    });
    //   client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
    //     if (error) {
    //       console.error(error)
    //     }
    //   })
  });
  var { emitToClient } = require("./emitToClient");
  var {
    chacha20DecryptHandler,
    handleDecryptValue,
    // sendRequestToBroker,
    handleDeviceInfoAnalysis,
    HandleDeviceWarning,
    DetectFrameHeader,
  } = require("../handler");

  await client.on("message", (topic, payload) => {
    const JSON_DATA = DetectFrameHeader(payload)
    // console.log(JSON_DATA)
    if(Object.keys(JSON_DATA).length)
    {
        // console.log(JSON_DATA)
        handleDecryptValue(JSON_DATA);
        // console.log("Decrypt data: ", decryptJSON);
        const { devID, ...props } = JSON_DATA;
    
        handleDeviceInfoAnalysis(devID, props);
    
        const emitJSON = {};
        emitJSON[devID] = props;
    
        // emit to clients
        emitToClient(emitJSON, "encryptDT"); //
    }
    else
    {
      // ChaCha20 only
      // const START_DECRYPT_TIME = performance.now();
      const decryptJSON = chacha20DecryptHandler(payload, "1");
      // console.log(decryptJSON);
      if (Object.keys(decryptJSON).length)
      {
        // const DECRYPT_TIME = performance.now() - START_DECRYPT_TIME;
        // console.log("\n     - Decrypt time: ", DECRYPT_TIME, " ms");
        
        handleDecryptValue(decryptJSON);
        // console.log("Decrypt data: ", decryptJSON);
        const { devID, ...props } = decryptJSON;
    
        handleDeviceInfoAnalysis(devID, props);
    
        HandleDeviceWarning(decryptJSON);
        
        const emitJSON = {};
        emitJSON[devID] = props;
    
        // emit to clients
        emitToClient(emitJSON, "encryptDT"); //
      }

    }
  });

};
module.exports.listenToMQTT = async () => {
  try {
    await start();
  } catch (err) {
    console.error("Restart MQTT", err);
    await start();
  }
};
