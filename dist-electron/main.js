import { app, ipcMain, BrowserWindow } from "electron";
import path, { dirname } from "node:path";
import "child_process";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    // remove the default titlebar
    titleBarStyle: "hidden",
    // expose window controls in Windows/Linux
    titleBarOverlay: {
      color: "rgb(231, 231, 231)",
      // symbolColor: 'rgba(219, 219, 219, 0.54)',
      height: 30
    },
    webPreferences: {
      webSecurity: false,
      // 关闭安全策略
      nodeIntegration: true,
      // 开启Node集成
      contextIsolation: true,
      // 为false时可能导致预加载脚本无法启动
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  win.setMenu(null);
  win.loadURL("http://localhost:5173");
  win.webContents.openDevTools();
};
app.whenReady().then(() => {
  ipcMain.handle("ping", () => {
    return "pong";
  });
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
