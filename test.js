var YamahaAPI = require("yamaha-nodejs");

var remote_yamaha = new YamahaAPI('192.168.0.41');

remote_yamaha.mute();
