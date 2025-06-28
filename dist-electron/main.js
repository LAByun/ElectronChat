import { app as o, ipcMain as r, BrowserWindow as i } from "electron";
import l, { dirname as a } from "node:path";
import "child_process";
import { fileURLToPath as s } from "node:url";
const h = s(import.meta.url), d = a(h), n = () => {
  const e = new i({
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
      webSecurity: !1,
      // 关闭安全策略
      nodeIntegration: !0,
      // 开启Node集成
      contextIsolation: !0,
      // 为false时可能导致预加载脚本无法启动
      preload: l.join(d, "preload.mjs")
    }
  });
  e.setMenu(null), e.loadURL("http://localhost:5173"), e.webContents.openDevTools();
};
o.whenReady().then(() => {
  r.handle("ping", (e, t) => (console.log(t), t + "hahah")), n(), o.on("activate", () => {
    i.getAllWindows().length === 0 && n();
  });
});
o.on("window-all-closed", () => {
  process.platform !== "darwin" && o.quit();
});
