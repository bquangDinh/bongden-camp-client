/*Resize*/
function resize(){
  let h = $("#control-bar").height() + $("#team-name-container").height() + $("#team-score-container").height();
  console.log(h);
  let bh = $(window).height();
  console.log(bh);
  let radio = 3 / 5;
  $("#mess-container").height((bh - h) * radio);
  console.log($("#mess-container").height());
  $("#send-box").height((bh - h) / 5);
  console.log($("#send-box").height());
}
$(document).ready(function(e){
  resize();
});

$(window).resize(function(e){
  resize();
});


/*Init Client*/
var clientNet = require('../JS/Module/network.js');
var client = new clientNet();
var clientName =  "";
var receivedID = false;

var receiveSignal = {
  SCORE:"1",
  GOIY:"2",
  ID:"3"
}

const {ipcRenderer} = require('electron');

ipcRenderer.on('init-client',(events,arg) => {
	client.connectToServer(arg.port,arg.ip,arg.username);
	clientName = arg.username;
  $("#team-name").text(clientName);
});

client.eventEmitter.on('send-abroad',function(data){
  var elements = data.split("*");
	var signal = elements[0];
	var value = elements[elements.length - 1];

  switch (signal) {
    case receiveSignal.ID:
    if(receivedID == false){
      client.id = value;
      receivedID = true;
      console.log("Generated ID: " + value);
    }
    break;

    case receiveSignal.GOIY:
    console.log(value);
    $("#mess-content").text(value);
    break;

    case receiveSignal.SCORE:
    console.log(value);
    $("#team-score").text(value);
    break;
  }
});

$("#send-btn").on('click',function(e){
  let mess_content = $("#send-box").val();
  console.log(mess_content);
  client.sendMess(mess_content);
  console.log("Sended");
});
