import { app, BrowserWindow } from 'electron'
import * as path from 'path'

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    autoHideMenuBar: true,
    icon: path.join(__dirname, "../src/assets/icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    }
  })

  win.loadFile('../src/index.html')
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});
