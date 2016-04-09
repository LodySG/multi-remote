var p = "KeyP";
var m = "Semicolon";
var o = "KeyO";
var l = "KeyL";
var un = "Digit1";
var deux = "Digit2";
var trois = "Digit3";
var quatre = "Digit4";
var cinq = "Digit5"
var six = "Digit6";
var sept = "Digit7";
var huit = "Digit8";
var neuf = "Digit9";
var zero = "Digit0";
var enter = "Enter";
var haut = "ArrowUp";
var bas = "ArrowDown";
var gauche = "ArrowLeft";
var droite = "ArrowRight";
var cmd = "OSRight";
var retour = "Backspace";

$(document).ready(function () {
    var socket = io.connect('http://192.168.0.50:9595')

    $(".samsung").each(
        function (id) {
            $(this).on("click", function (event) {
                socket.emit("samsung", $(this).attr("id"));
            });
        });

    $(".yamaha").each(
        function (id) {
            $(this).on("click", function (event) {
                socket.emit("yamaha", $(this).attr("id"));
            });
        });
        
    $(".freebox").each(
        function (id) {
            $(this).on("click", function (event) {
                socket.emit("freebox", $(this).attr("id"));
            });
        });
      
    $(document).keydown(function(event) {
      
      var device = $(".active").last().attr("id");
      
      //console.log(event.keyCode);
      //console.log(event);
      //console.log(event.originalEvent.code);
      
      var code = event.originalEvent.code;
      console.log(code);
      
      if(device == "TV")
      {
          switch(code)
          {
              case p:
                socket.emit("samsung", "KEY_CHUP");
                break;
              case m:
                socket.emit("samsung", "KEY_CHDOWN");
                break;
              case o:
                socket.emit("yamaha", "VOLUP");
                break;
              case l:
                socket.emit("yamaha", "VOLDOWN");
                break;
              case un:
                socket.emit("samsung", "KEY_1");
                break;
              case deux:
                socket.emit("samsung", "KEY_2");
                break;
              case trois:
                socket.emit("samsung", "KEY_3");
                break;
              case quatre:
                socket.emit("samsung", "KEY_4");
                break;
              case cinq:
                socket.emit("samsung", "KEY_5");
                break;
              case six:
                socket.emit("samsung", "KEY_6");
                break;
              case sept:
                socket.emit("samsung", "KEY_7");
                break;
              case huit:
                socket.emit("samsung", "KEY_8");
                break;
              case neuf:
                socket.emit("samsung", "KEY_9");
                break;
              case zero:
                socket.emit("samsung", "KEY_0");
                break;
              case enter:
                socket.emit("samsung", "KEY_ENTER");
                break;
              case cmd:
                socket.emit("samsung", "KEY_SOURCE");
                break;
              case haut:
                socket.emit("samsung", "KEY_UP");
                break;
              case bas:
                socket.emit("samsung", "KEY_DOWN");
                break;  
              case gauche:
                socket.emit("samsung", "KEY_LEFT");
                break;
              case droite:
                socket.emit("samsung", "KEY_RIGHT");
                break;
              case retour:
                socket.emit("samsung", "KEY_RETURN");
                break;  
               
              
          }
      }
      else if(device == "HomeCinema")
      {
          switch(code)
          {
              case p:
                socket.emit("samsung", "KEY_CHUP");
                break;
              case m:
                socket.emit("samsung", "KEY_CHDOWN");
                break;
              case o:
                socket.emit("yamaha", "VOLUP");
                break;
              case l:
                socket.emit("yamaha", "VOLDOWN");
                break;
              case un:
                socket.emit("yamaha", "GAME");
                break;
              case deux:
                socket.emit("yamaha", "TV");
                break;
              case trois:
                socket.emit("yamaha", "FREEBOX");
                break;
              case quatre:
                socket.emit("yamaha", "BLUETOOTH");
                break;
              case cinq:
                socket.emit("yamaha", "HDMI1");
                break;
              case six:
                socket.emit("yamaha", "HDMI2");
                break;
              case sept:
                socket.emit("yamaha", "HDMI3");
                break;
              case huit:
                socket.emit("yamaha", "HDMI4");
                break;
              case neuf:
                //socket.emit("yamaha", "KEY_9");
                break;
              case zero:
                //socket.emit("yamaha", "KEY_0");
                break;
              case espace:
                break;
          }
      }
      event.preventDefault();
    });

});
