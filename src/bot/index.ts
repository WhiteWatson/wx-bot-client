import { WechatyBuilder } from "wechaty";
import store from "@/store";
import { ContactSelfInterface } from "wechaty/impls";
import { onMessage } from "./onMessage";

export let botName: string | ContactSelfInterface | undefined;

const wxBot = WechatyBuilder.build({
  name: "wx-bot",
  puppetOptions: {
    uos: true, // 开启uos协议
  },
  puppet: "wechaty-puppet-wechat",
});

async function wxBotInit() {
  wxBot
    .on("scan", async (qrcode, status) => {
      const url = `https://api.pwmqr.com/qrcode/create/?url=${encodeURIComponent(
        qrcode
      )}`;
      console.log("qrcodeurl", url);
      store.commit("user/SET_LOGINQRCODE", url);
    })
    .on("login", async (user) => {
      console.log(`User ${user} logged in`);
      botName = user.payload?.name;
      console.log("botName:", botName);
      store.commit("user/SET_LOGGED_IN", user);
      const contactList = await wxBot.Contact.findAll();
      store.commit("user/SET_CONTACTLIST", contactList);
    })
    .on("message", onMessage);
  try {
    await wxBot.start();
  } catch (e) {
    console.error(` ${e}`);
  }
}
export { wxBot, wxBotInit };

// wxBotInit();
