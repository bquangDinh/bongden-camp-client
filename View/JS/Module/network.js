module.exports = class Client{
	constructor(){
		/*Init Events*/
    this.id = -1;
        var event = require('events');
        this.eventEmitter = new event.EventEmitter();
	}

	connectToServer(port,ip,username){
		const net = require('net');
		var client = new net.Socket();

		client.connect(port,ip,function(){

			//send config of client to server
			 client.write("PLM#ASSI^" + username);
		});

		var that = this;
		client.on('data',function(data){
			console.log(data);
			//var stringHelper = require('../Module/stringHelper.js');
			//let converted_data = stringHelper.convertAsciiArrayToText(data);
			var ab2str = require('arraybuffer-to-string');
			let ab2 = ab2str(data);
			console.log(ab2);
			//console.log(converted_data);
      that.eventEmitter.emit("send-abroad",ab2);
		});

		this.client = client;
		this.username = username;
	}

	sendMess(messContent){
		if(this.id == -1) console.log("ID is not be generated !");
		var data = "PLM#" + this.id + "^MESS^" + messContent;
		this.client.write(data);
	}
}
