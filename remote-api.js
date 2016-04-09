var http = require('http');
var fs = require('fs');
var SamsungRemote = require('samsung-remote');
var YamahaAPI = require("yamaha-nodejs");
var yamaha_unitvol = 10;
var last_action_date = Date.now();
var get_info = true;

var remote_yamaha = new YamahaAPI('192.168.0.41');
var remote_samsung = new SamsungRemote({
    ip: '192.168.0.45' // required: IP address of your Samsung Smart TV 
});

var yamaha_volume;
var yamaha_isMuted;
var yamaha_isOn;
var yamaha_currentInput;

var getInfo = function(){
    remote_yamaha.getBasicInfo().done(function(basicInfo){
        yamaha_volume = basicInfo.getVolume();
        yamaha_isMuted = basicInfo.isMuted();
        yamaha_isOn = basicInfo.isOn();
        yamaha_currentInput = basicInfo.getCurrentInput();
    })
};

getInfo();

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket, pseudo) {
    
    socket.on('samsung', function (message) {
        remote_samsung.send(message, function callback(err) {
            if (err) {
                throw new Error(err);
            } else {
                console.log(message) 
            }
        });
    });
    
    socket.on('yamaha', function (message) {
        
        switch(message) {
            case "POWER":
                if(yamaha_isOn){
                    remote_yamaha.powerOff();
                    yamaha_isOn = false;
                }else{
                    remote_yamaha.powerOn();
                    yamaha_isOn = true;
                }
                console.log(message.toString()); 
                break;
            case "VOLUP":
                yamaha_volume = yamaha_volume+yamaha_unitvol;
                remote_yamaha.setVolumeTo(yamaha_volume);
                console.log(message);
                break;
            case "VOLDOWN":
                yamaha_volume = yamaha_volume-yamaha_unitvol;
                remote_yamaha.setVolumeTo(yamaha_volume);
                console.log(message); 
                break;
            case "GAME":
	        case "HDMI2":
                remote_yamaha.setMainInputTo("HDMI2");
                console.log(message);
                break;
            case "TV":
                remote_yamaha.setMainInputTo("AV4");
                console.log(message); 
                break;    
            case "FREEBOX":
	        case "HDMI1":
                remote_yamaha.setMainInputTo("HDMI1");
                console.log(message);
                break;
            case "BLUETOOTH":
                remote_yamaha.setMainInputTo("AV2");
                console.log(message);
                break;
            case "HDMI3":
                remote_yamaha.setMainInputTo("HDMI3");
                console.log(message);
                break;
	        case "HDMI4":
                remote_yamaha.setMainInputTo("HDMI4");
                console.log(message);
                break;
            case "MUTE":
                if(yamaha_isMuted){
                    remote_yamaha.SendXMLToReceiver('<YAMAHA_AV cmd="PUT"><Main_Zone><Volume><Mute>Off</Mute></Volume></Main_Zone></YAMAHA_AV>');
                    yamaha_isMuted = false;
                }else{
                    remote_yamaha.SendXMLToReceiver('<YAMAHA_AV cmd="PUT"><Main_Zone><Volume><Mute>On</Mute></Volume></Main_Zone></YAMAHA_AV>');
                    yamaha_isMuted = true;
                }
                console.log(message);
            default :
                break;
        }
        
        last_action_date = Date.now();
        get_info = true;
    });
    
});

//setInterval(getInfo,1000);

setInterval(function(){
    var n = Date.now();
    //console.log(last_action_date);
    if(((n - last_action_date) > 3000) && get_info){
        getInfo();
        get_info = false;
        //console.log("info get");
    }
},1000)

server.listen(9595);

