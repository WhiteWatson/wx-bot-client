import { MessageInterface } from "wechaty/impls";
import { botName } from ".";
import { firstName, jiaweisi } from "./config";
import { sendMessage } from "./chatgpt/main";
import store from "@/store";
import { ChatCompletionRequestMessage } from "openai";

let history: any = [];

export const onMessage = async (message: MessageInterface) => {
  if (message.text().startsWith("/ping")) {
    await message.say("pong");
    return;
  }
  if (message.text().startsWith("/clearmemory")) {
    history = [];
    message.say(
      `@${message.from()?.payload?.name} 记忆已清除...`
    );
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
      message.say(
        `@${message.from()?.payload?.name} 贾维斯已就绪...`
      );
      history.push([user_input, completion_text]);
    });
    return;
  }
  try {
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
          message.say(
            `@${message.from()?.payload?.name} ${completion_text}`
          );
          history.push([user_input, completion_text]);
        });
      }
      store.commit("user/SET_MESSAGELIST", message);
    }
  } catch (e) {
    console.error(e);
  }
};
