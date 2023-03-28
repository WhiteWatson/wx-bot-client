"use strict";

import path from "path";
import { app, protocol, BrowserWindow, ipcMain } from "electron";
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

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1440,
    height: 800,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      preload: path.join(__dirname, "/preload.js"),
    },
  });

  // 解决electron跨域
  // win.webContents.session.webRequest.onBeforeSendHeaders(
  //   (details, callback) => {
  //     callback({ requestHeaders: { Origin: "*", ...details.requestHeaders } });
  //   }
  // );

  // win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
  //   callback({
  //     responseHeaders: {
  //       "Access-Control-Allow-Origin": ["*"],
  //       ...details.responseHeaders,
  //     },
  //   });
  // });

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
