// import { ipcRenderer } from "electron";
import puppeteer from "puppeteer";
import puppeteerExtra from "puppeteer-extra";

(window as any).ipc = {
  launchBrowser: async (data: any) => {
    console.log("主进程：", data);
    const browser = await puppeteerExtra.launch(data.options);
    return browser;
  },
};
