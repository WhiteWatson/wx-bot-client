// import { ipcRenderer } from "electron";
import puppeteer from "puppeteer";
import puppeteerExtra from "puppeteer-extra";

(window as any).ipc = {
  launchBrowser: async (data: any) => {
    // console.log("预加载文件 data:", data);
    // return ipcRenderer.invoke("launch-browser", data).then((res: any) => {
    //   console.log("预加载文件 then", res);
    // });
    console.log("主进程：", data);
    // puppeteerExtra.default.use(plugin);
    // puppeteerExtra.default.use(data.plugin);
    const browser = await puppeteer.launch(data.options);
    return browser;
  },
};
