import { WechatyBuilder } from "wechaty";

const bot = WechatyBuilder.build({
  name: "wechat-assistant", // generate xxxx.memory-card.json and save login data for the next login
});

export async function botInit() {
  console.log("botInit");
}
