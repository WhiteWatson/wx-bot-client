"use strict";

import path from "path";
import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu,
  Notification,
} from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import puppeteer from "puppeteer";
// import puppeteerExtra from "puppeteer-extra";
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

console.log("ELECTRON_NODE_INTEGRATION", process.env.ELECTRON_NODE_INTEGRATION);

let tray = null;

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1440,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      preload: path.join(__dirname, "/preload.js"),
    },
    icon: path.join(__dirname, "./icon.ico"),
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);

    if (process.env.ELECTRON_NODE_INTEGRATION) {
      win.webContents.openDevTools();
    }

    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  win.on("close", (e) => {
    // e.preventDefault(); // 阻止退出程序
    // new Notification({
    //   title: "WxBotClient已缩小到托盘",
    //   body: "彻底关闭软件请在任务栏右键关闭",
    // }).show();
    // win.setSkipTaskbar(true); // 取消任务栏显示
    // win.hide(); // 隐藏主程序窗口
    win.destroy();
    app.quit();
  });

  // 创建任务栏图标
  tray = new Tray(path.join(__dirname, "./icon.ico"));

  // 自定义托盘图标的内容菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      // 点击退出菜单退出程序
      label: "退出",
      click: function () {
        win.destroy();
        app.quit();
      },
    },
  ]);

  tray.setToolTip("demo"); // 设置鼠标指针在托盘图标上悬停时显示的文本
  tray.setContextMenu(contextMenu); // 设置图标的内容菜单
  // 点击托盘图标，显示主窗口
  tray.on("click", () => {
    win.show();
  });

  ipcMain.handle("launch-browser", async (event, data) => {
    const opt = {
      args: [
        "--audio-output-channels=0",
        "--disable-default-apps",
        "--disable-translate",
        "--disable-gpu",
        "--disable-setuid-sandbox",
        "--disable-sync",
        "--hide-scrollbars",
        "--mute-audio",
        "--no-sandbox",
      ],
      headless: true,
    };
    console.log("主进程：", data);
    // puppeteerExtra.default.use(data.plugin);
    const browser = await puppeteer.launch(opt);
    console.log("主进程返回browser对象：", browser);

    // event.sender.send("launched-browser", browser);
    return browser;
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
