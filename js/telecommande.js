var p = "KeyP";
var m = "Semicolon";
var o = "KeyO";
var l = "KeyL";
var g = "KeyG";
var t = "KeyT";
var f = "KeyF";
var b = "KeyB";
var i = "KeyI";
var un = "Digit1";
var deux = "Digit2";
var trois = "Digit3";
var quatre = "Digit4";
var cinq = "Digit5";
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
var cmdR = "MetaRight";
var cmdL = "MetaLeft";
var retour = "Backspace";
var space = "Space";
var controlR = "ControlRight";
var current_control;

$(document).ready(function () {
    var socket = io.connect('http://192.168.0.50:9595')

    var updateButtons = function() {
          switch (current_control) {
            case "samsung":
              $('*[data-key="RED"]').html("A"); // A ou <i class="fa fa-undo fa-lg"></i>
              $('*[data-key="GREEN"]').html("B"); // B ou <i class="fa fa-list fa-lg"></i> M
              $('*[data-key="YELLOW"]').html("C"); // C ou <i class="fa fa-undo fa-lg"></i> ou i <i class="fa fa-bars fa-lg"></i>
              $('*[data-key="BLUE"]').html("D"); // D ou <i class="fa fa-search fa-lg"></i>
              $('#CHUP').attr("data-key","CHUP");
              $('#CHDOWN').attr("data-key","CHDOWN");
              $('*[data-key="FREEBOX"]').addClass('btn-primary').removeClass('btn-success');
              $('#free-button').hide();
              $('*[data-key="TV"]').addClass('btn-success').removeClass('btn-primary');
              break;
            case "freebox":
              $('*[data-key="RED"]').html('<i class="fa fa-undo fa-lg"></i>'); // A ou <i class="fa fa-undo fa-lg"></i>
              $('*[data-key="GREEN"]').html('<i class="fa fa-list fa-lg"></i> M'); // B ou <i class="fa fa-list fa-lg"></i> M
              $('*[data-key="YELLOW"]').html('i <i class="fa fa-bars fa-lg"></i>'); // C ou <i class="fa fa-undo fa-lg"></i> ou i <i class="fa fa-bars fa-lg"></i>
              $('*[data-key="BLUE"]').html('<i class="fa fa-search fa-lg"></i>'); // D ou <i class="fa fa-search fa-lg"></i>
              $('#CHUP').attr("data-key","PRGM_INC");
              $('#CHDOWN').attr("data-key","PRGM_DEC");
              $('*[data-key="FREEBOX"]').addClass('btn-success').removeClass('btn-primary');
              $('#free-button').show();
              $('*[data-key="TV"]').addClass('btn-primary').removeClass('btn-success');
              break;
            default:
              break;
        }
    };

    var switchButton = function(input){
        
        switch (input) {
          case 'AV4':
            current_control = "samsung";
            updateButtons();
            break;
          case 'HDMI1':
            current_control = "freebox";
            updateButtons();
            break;
          default:
            break;
        }
        console.log(current_control);
    };

    socket.on('currentInput', function(message){
        switchButton(message);
    });

    $(".samsung").each(
        function (id) {
            $(this).on("click", function (event) {
                socket.emit("samsung", "KEY_"+$(this).data("key"));
            });
        });

    $(".yamaha").each(
        function (id) {
            $(this).on("click", function (event) {
                socket.emit("yamaha", $(this).data("key"));
            });
        });
        
    $(".freebox").each(
        function (id) {
            $(this).on("click", function (event) {
                socket.emit("freebox", $(this).data("key"));
            });
        });

    $(".tvcontrol").each(
        function (id) {
            $(this).on("click", function (event) {
              if(current_control == "samsung"){
                  socket.emit(current_control, "KEY_"+$(this).data("key"));
              }
              if(current_control == "freebox"){
                  socket.emit(current_control, $(this).data("key"));
              }
            });
        });
      
    $(document).keydown(function(event) {
      
      //var device = $(".active").last().data("key");
      
      //console.log(event.keyCode);
      //console.log(event);
      //console.log(event.originalEvent.code);
      
      var code = event.originalEvent.code;

      
      console.log(code);
      console.log(event);
      //if(device == "TV")
      //{
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
              case controlR:
              case cmdR:
              case cmdL:
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
              case space:
                socket.emit("yamaha", "MUTE");
                break;
              case g:
                socket.emit("yamaha", "GAME");
                break;
              case t:
                socket.emit("yamaha", "TV");
                break;
              case f:
                socket.emit("yamaha", "FREEBOX");
                break;
              case b:
                socket.emit("yamaha", "BLUETOOTH");
                break;
              case i:
                socket.emit("samsung", "KEY_INFO");
                break;
     /*         
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
              case g:
                socket.emit("yamaha", "GAME");
                break;
              case deux:
              case t:
                socket.emit("yamaha", "TV");
                break;
              case trois:
              case f:
                socket.emit("yamaha", "FREEBOX");
                break;
              case quatre:
              case b:
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
              case space:
                socket.emit("yamaha", "MUTE");
                break;
          }
          */
      }
      event.preventDefault();
    });

});
