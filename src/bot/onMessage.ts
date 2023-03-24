import { MessageInterface, RoomInterface } from "wechaty/impls";
import { botName } from ".";
import { firstName, jiaweisi } from "./config";
import { sendMessage } from "./chatgpt/main";
// import EStore from "electron-store";
import { ChatCompletionRequestMessage } from "openai";

const history: any = [];
const roomList = new Map();

export const onMessage = async (message: MessageInterface) => {
  if (message.room()) {
    // 消息来自群聊
    roomMessage(message);
    return;
  }
  // 非群聊
  if (message.text().startsWith("/ping")) {
    await message.say("pong");
    return;
  }
  if (message.text().startsWith("/clear memory")) {
    if (roomList.get(message.from()?.id)) {
      roomList.delete(message.from()?.id);
      message.say(`@${message.from()?.payload?.name} 此回话记忆已清除...`);
      return;
    }
    message.say(`@${message.from()?.payload?.name} 并无记忆存储...`);
    return;
  }
  if (message.text().startsWith("/贾维斯")) {
    const user_input = jiaweisi;
    const messages: ChatCompletionRequestMessage[] = [];
    for (const [input_text, completion_text] of history) {
      messages.push({ role: "user", content: input_text });
      messages.push({ role: "assistant", content: completion_text });
    }
    messages.push({ role: "user", content: user_input });
    sendMessage(messages).then((res: any) => {
      const completion_text = res[0].message.content;
      message.say(`@${message.from()?.payload?.name} 贾维斯已就绪...`);
      history.push([user_input, completion_text]);
    });
    return;
  }
  if (roomList.get(message.from()?.id)) {
    startAI(message, roomList.get(message.from()?.id));
    return;
  }
  startAI(message, []);
};

const roomMessage = (message: MessageInterface) => {
  if (message.text().startsWith("/clear memory")) {
    if (roomList.get(message.room()?.id)) {
      roomList.delete(message.room()?.id);
      message.say(`@${message.from()?.payload?.name} 本群记忆已清除...`);
      return;
    }
    message.say(`@${message.from()?.payload?.name} 本群并无记忆...`);
    return;
  }
  if (roomList.get(message.room()?.id)) {
    // 存在roomList缓存里
    startAI(message, roomList.get(message.room()?.id));
    return;
  }
  startAI(message, []);
};

const startAI = (message: MessageInterface, history: any) => {
  if (firstName.includes(message.text().substring(0, 3))) {
    if (message.from()?.payload?.name !== botName) {
      message.say("AI正在思考，请稍后...");
      const user_input = message.text().substring(3);
      const messages: ChatCompletionRequestMessage[] = [];
      for (const [input_text, completion_text] of history) {
        messages.push({ role: "user", content: input_text });
        messages.push({ role: "assistant", content: completion_text });
      }
      messages.push({ role: "user", content: user_input });
      sendMessage(messages).then((res: any) => {
        const completion_text = res[0].message.content;
        message.say(`@${message.from()?.payload?.name} ${completion_text}`);
        history.push([user_input, completion_text]);
        roomList.set(message.room()?.id || message.from()?.id, history);
      });
    }
  }
  if (message.text().startsWith("/贾维斯")) {
    const user_input = jiaweisi;
    const messages: ChatCompletionRequestMessage[] = [];
    for (const [input_text, completion_text] of history) {
      messages.push({ role: "user", content: input_text });
      messages.push({ role: "assistant", content: completion_text });
    }
    messages.push({ role: "user", content: user_input });
    sendMessage(messages).then((res: any) => {
      const completion_text = res[0].message.content;
      message.say(`@${message.from()?.payload?.name} 贾维斯已就绪...`);
      history.push([user_input, completion_text]);
      roomList.set(message.room()?.id || message.from()?.id, history);
    });
    return;
  }
};
