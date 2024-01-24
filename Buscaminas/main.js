//This file must set up the window
const { app, BrowserWindow, ipcMain } = require('electron');

var mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false

    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});




ipcMain.on('changeWindow',(event, arg)=>{
  console.log("Ha llegado")
  if(arg=="win"){
    setTimeout(()=>{mainWindow.loadFile('wining.html')},500)
  }else if(arg=="loose"){
    setTimeout(()=>mainWindow.loadFile('loosing.html'), 500)
  }else if(arg == "reset"){
    mainWindow.loadFile('index.html')
  }
})






