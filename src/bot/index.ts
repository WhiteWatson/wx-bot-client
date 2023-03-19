import { WechatyBuilder } from "wechaty";
import store from "@/store";
import { sendMessage } from "./chatgpt/main";
import { ContactSelfInterface } from "wechaty/impls";
import { firstName } from "./config";

let botName: string | ContactSelfInterface | undefined;

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
    })
    .on("message", async (message) => {
      if (message.text().startsWith("/ping")) {
        await message.say("pong");
        return;
      }
      try {
        if (firstName.includes(message.text().substring(0, 3))) {
          if (message.from()?.payload?.name !== botName) {
            message.say("AI正在思考，请稍后...");
            sendMessage(message.text().substring(3)).then((res: any) => {
              message.say(`@${message.from()?.payload?.name} ${res[0].message.content}`);
            });
          }
          store.commit("user/SET_MESSAGELIST", message);
        }
      } catch (e) {
        console.error(e);
      }
    });
  try {
    await wxBot.start();
  } catch (e) {
    console.error(
      `⚠️ Bot start failed, can you log in through wechat on the web?: ${e}`
    );
  }
}
export { wxBot, wxBotInit };

// wxBotInit();
