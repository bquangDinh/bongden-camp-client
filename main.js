const {app, BrowserWindow} = require('electron');
const {ipcMain} = require('electron');
const {path} = require('path');

let mainWindow;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 500,
    height: 350,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/View/HTML/configuration_page.html');

  ipcMain.on('config-server',(event,arg) => {
  const win = BrowserWindow.fromId(2);
  console.log("Win 2 " + win.getSize());

  win.webContents.on('did-finish-load',function(){
    win.webContents.send('init-client',arg);
    console.log("Main : " + arg.ip + " " + arg.port + " " + arg.username);
  });

  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
