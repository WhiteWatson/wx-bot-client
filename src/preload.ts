import { shell } from "electron";
import puppeteerExtra from "puppeteer-extra";

(window as any).ipc = {
  launchBrowser: async (data: any) => {
    console.log("主进程：", data);
    const browser = await puppeteerExtra.launch(data.options);
    return browser;
  },
};

(window as any).shell = shell;
