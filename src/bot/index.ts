import { WechatyBuilder } from "wechaty";
// import QRCode from "qrcode";
import { CommonModule } from "@/store/modules/common";

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
      console.log(qrcode, status);
      const url = `https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`;
      const qrcodeUrl = `${status}\n${url}`;
      console.log(`Scan QR Code to login: ${status}\n${url}`);
      CommonModule.SET_LOGINQRCODE(qrcodeUrl);
    })
    .on("login", async (user) => {
      console.log(`User ${user} logged in`);
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
