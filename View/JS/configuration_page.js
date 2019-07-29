function closeWindow(){
	const {remote} = require('electron');
	const {BrowserWindow} = remote;
	const win = BrowserWindow.fromId(1);
	win.close();
}

function openMainWindow(){
	const {remote} = require('electron');
	const {BrowserWindow} = remote;
	const path = require('path');

	const windowPath = path.join('file://',__dirname,'../HTML/mainpage.html');

	let win = new BrowserWindow({
    width:1052,
    height:650,
    frame:false,
    webPreferences: {
            nodeIntegration: true
    }
  });

	win.on('close',() => {win = null});
	win.loadURL(windowPath);
	win.show();
}


function checkFormat(ip,port){
	var stringHelper = require('../JS/Module/stringHelper.js');

	if(stringHelper.checkHostFormat(ip) == false){
		document.getElementById("ip-input").className = "input-field-warning";
		document.getElementById("ip-input").value = "";
		alert("IP isn't valid \nPlease confirm again !");
		return false;
	}else if(document.getElementById("ip-input").classList.contains("input-field-warning")){
		document.getElementById("ip-input").classList.remove("input-field-warning");
		document.getElementById("ip-input").className = "input-field";
	}

	if(stringHelper.checkPortFormat(port) == false){
		document.getElementById("port-input").className = "input-field-warning";
		document.getElementById("port-input").value = "";
		alert("Port isn't valid \nPlease confirm again !");
		return false;
	}else if(document.getElementById("port-input").classList.contains("input-field-warning")){
		document.getElementById("port-input").classList.remove("input-field-warning");
		document.getElementById("port-input").className = "input-field";
	}

	return true;
}

function sendData(port,ip,username,id){
	const {ipcRenderer} = require("electron");

	let Data = {
		port: port,
		ip: ip,
		username:username,
	}

	ipcRenderer.send("config-server",Data);
}

function confirm(){
	var ip = document.getElementById("ip-input").value;
	var port = document.getElementById("port-input").value;
	var username = document.getElementById("username-input").value;

	if(checkFormat(ip,port) == false) return;

	openMainWindow();
	sendData(port,ip,username);

	closeWindow();
}
