var mqtt    = require('mqtt');
//var client  = mqtt.connect('mqtt://test.mosquitto.org');

var client  = mqtt.connect('mqtt://localhost:1883');
//var client  = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', function () {
  console.log("in client.on publish msg");
  client.subscribe('hs');
  setInterval(function () {
    client.publish('hs', 'Hello mqtt');
    console.log('Message Sent');
  }, 5000);

})


client.on('error', function (err) {
  console.log(err);
  client.end()
})

/*
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  client.end();
});
*/ 