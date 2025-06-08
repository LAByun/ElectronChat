import { contextBridge,ipcRenderer } from 'electron';
console.log('预加载脚本已执行');
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  // 除函数之外，我们也可以暴露变量
})