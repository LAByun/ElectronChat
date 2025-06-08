import { app, BrowserWindow, ipcMain } from 'electron';
// import { join} from 'path';
// import path from 'path';// 原本的环境路径切换用的这个
import path from 'node:path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const createWindow = () => {

  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    // remove the default titlebar
    titleBarStyle: 'hidden',
    // expose window controls in Windows/Linux
       titleBarOverlay: {
    color: 'rgb(231, 231, 231)',
    // symbolColor: 'rgba(219, 219, 219, 0.54)',
    height: 30
  },

    webPreferences: {
      webSecurity: false, // 关闭安全策略
      nodeIntegration: true, // 开启Node集成
      contextIsolation: true, // 为false时可能导致预加载脚本无法启动
      preload: path.join(__dirname, 'preload.mjs')
    }
  });

  win.setMenu(null); // 隐藏菜单栏

  //win.loadFile('./dist/index.html');
  win.loadURL('http://localhost:5173');
  //开启开发者工具
  win.webContents.openDevTools();
  //const filePath = join(__dirname, 'dist/index.html');
  //console.log(filePath);
  //配置不同环境的路径
  // let exePath;
  // if (app.isPackaged) {
  //   // 生产环境：exe文件位于resources目录下
  //   console.log('production environment');
  //   exePath = path.join(process.resourcesPath, 'dist/index.html');
  //   win.loadFile(exePath);
  // } else {
  //   // 开发环境：直接引用项目中的exe文件
  //   console.log('development environment');
  //   console.log(app.isPackaged);
  //   exePath = "https://localhost:5173";
  //   console.log('exePath:', exePath);
  //   win.loadURL(exePath);
  // }
  // win.loadFile(exePath);

};
let pythonProcess = null;

function startPythonBackend() {
  // 获取exe文件路径（开发和生产环境路径不同）
  const isProduction = process.env.NODE_ENV === 'production';
  let exePath;
  //exePath = path.join(__dirname, '../backend/testLoad.exe');
  if (app.isPackaged) {
    // 生产环境：exe文件位于resources目录下
    console.log('production environment');
    exePath = path.join(process.resourcesPath, 'backend/testLoad.exe');
  } else {
    // 开发环境：直接引用项目中的exe文件
    console.log('development environment');
    console.log(app.isPackaged);
    exePath = path.join(__dirname, '../backend/testLoad.exe');
  }

  // 启动exe文件
  pythonProcess = spawn(exePath, [], {
    stdio: 'pipe',
    detached: true
  });

  // 监听输出（可选）
  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python Output: ${data}`);
    if (data.toString().includes('Server started')) {
      createWindow();
    }
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Error: ${data}`);
  });

  pythonProcess.on('error', (err) => {
    console.log('Error', `Failed to start backend: ${err.message}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
  });
}


app.whenReady().then(() => {
  //配置监听
  ipcMain.handle('ping', () => {
    return 'pong'; // 这里可以返回任何你想要的数据 
  })
  // startPythonBackend(); // 启动Python后端
  // 创建窗口
  createWindow();
  // 激活应用时重新创建窗口（macOS）
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});