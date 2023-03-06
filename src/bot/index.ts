import { WechatyBuilder } from "wechaty";
// import QRCode from "qrcode";
import store from "@/store";

const wxBot = WechatyBuilder.build({
  name: "wx-bot", // generate xxxx.memory-card.json and save login data for the next login
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
      store.commit("SET_LOGINQRCODE", url);
    })
    .on("login", async (user) => {
      console.log(`User ${user} logged in`);
      store.commit("SET_LOGGED_IN", user);
    })
    .on("message", async (message) => {
      if (message.text().startsWith("/ping")) {
        await message.say("pong");
        return;
      }
      try {
        console.log(`Message: ${message}`);
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
