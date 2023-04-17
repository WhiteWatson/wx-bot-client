import { MessageInterface } from "wechaty/impls";
import { botName } from ".";
// import { FileBox } from "file-box";
import { firstName, jiaweisi, replayObj, wxBotConfig } from "./config";
import { getImageByPrompt, sendMessage } from "./chatgpt/main";
import { ChatCompletionRequestMessage } from "openai";
import { loadReplicateImage } from "./replicate/request";

const history: any = [];
const roomList = new Map();

export const onMessage = async (message: MessageInterface) => {
  console.log(message.talker());
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
    if (roomList.get(message.talker()?.id)) {
      roomList.delete(message.talker()?.id);
      await message.say(
        `@${message.talker()?.payload?.name} 此回话记忆已清除...`
      );
      return;
    }
    await message.say(`@${message.talker()?.payload?.name} 并无记忆存储...`);
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
    sendMessage(messages).then(async (res: any) => {
      const completion_text = res[0].message.content;
      await message.say(`@${message.talker()?.payload?.name} 贾维斯已就绪...`);
      history.push([user_input, completion_text]);
    });
    return;
  }
  if (roomList.get(message.talker()?.id)) {
    startAI(message, roomList.get(message.talker()?.id));
    return;
  }
  startAI(message, []);
};

const roomMessage = async (message: MessageInterface) => {
  if (message.text().startsWith("/clear memory")) {
    if (roomList.get(message.room()?.id)) {
      roomList.delete(message.room()?.id);
      await message.say(
        `@${message.talker()?.payload?.name} 本群记忆已清除...`
      );
      return;
    }
    await message.say(`@${message.talker()?.payload?.name} 本群并无记忆...`);
    return;
  }
  if (roomList.get(message.room()?.id)) {
    // 存在roomList缓存里
    startAI(message, roomList.get(message.room()?.id), false);
    return;
  }
  startAI(message, [], false);
};

const startAI = async (
  message: MessageInterface,
  history: any,
  noSelf = true
) => {
  if (firstName.includes(message.text().substring(0, 3))) {
    if (message.talker()?.payload?.name !== botName) {
      await message.say("AI正在思考，请稍后...");
      const user_input = message.text().substring(3);
      const messages: ChatCompletionRequestMessage[] = [];
      for (const [input_text, completion_text] of history) {
        messages.push({ role: "user", content: input_text });
        messages.push({ role: "assistant", content: completion_text });
      }
      messages.push({ role: "user", content: user_input });
      sendMessage(messages)
        .then(async (res: any) => {
          try {
            let completion_text = res[0].message.content;
            if (completion_text.length > 1500) {
              await message.say(
                `@${
                  message.talker()?.payload?.name
                } 回复长度超长，微信最大支持1500字回复，请重新提问并限制回复长度`
              );
              return;
            }
            if (completion_text.indexOf("OpenAI") !== -1) {
              completion_text += replayObj.你是谁;
            }
            let key: keyof any;
            for (key in replayObj) {
              if (user_input.trim().startsWith(key)) {
                await message.say(
                  `@${message.talker()?.payload?.name} ${completion_text}\n ${
                    replayObj[key]
                  }`
                );
                history.push([user_input, completion_text]);
                roomList.set(
                  message.room()?.id || message.talker()?.id,
                  history
                );
                return;
              }
            }
            await message.say(
              `@${message.talker()?.payload?.name} ${completion_text}`
            );
            history.push([user_input, completion_text]);
            roomList.set(message.room()?.id || message.talker()?.id, history);
          } catch (error) {
            console.log("回复出错了：", error);
          }
        })
        .catch(async (err) => {
          console.log("出错了：", err.status, JSON.stringify(err));
          if (err.message === "Network Error") {
            await message.say(
              `@${
                message.talker()?.payload?.name
              } 快去告诉管理员，服务出现网络错误，让他麻溜修0_0`
            );
            return;
          }
          if (err.message == "Request failed with status code 400") {
            await message.say(
              `@${
                message.talker()?.payload?.name
              } AI记忆已满，即将自动清除记忆，请稍后重试`
            );
            if (roomList.get(message.room()?.id)) {
              roomList.delete(message.room()?.id);
              await message.say(
                `@${message.talker()?.payload?.name} 本群记忆已清除...`
              );
              return;
            }
            await message.say(
              `@${message.talker()?.payload?.name} 本群并无记忆...`
            );
            return;
          }
          if (err.message == "Request failed with status code 401") {
            await message.say(
              `@${
                message.talker()?.payload?.name
              } APIKEY或者organization出错，请联系管理员`
            );
            return;
          }
          if (err.message == "Request failed with status code 429") {
            await message.say(
              `@${
                message.talker()?.payload?.name
              } 出现429模型重载错误，快去告诉管理员`
            );
            return;
          }
          await message.say(
            `@${message.talker()?.payload?.name} ${
              err.message
            } AI思考超时，请重新提问`
          );
        });
    }
  }
  if (message.text().startsWith("/image")) {
    await message.say(
      `@${message.talker()?.payload?.name} AI正在作图，请稍后...`
    );
    const texts = message.text().replace("/image", "");
    getImageByPrompt(texts)
      .then(async (res: any) => {
        console.log("gpt img:", res);
        const imgUrl = res.data?.[0].url;
        await message.say(`@${message.talker()?.payload?.name} ${imgUrl}`);
      })
      .catch(async (err) => {
        await message.say(
          `@${message.talker()?.payload?.name} AI作图失败，请重试`
        );
      });
    return;
  }
  if (message.text().startsWith("/enimage")) {
    await message.say(
      `@${message.talker()?.payload?.name} sorry，老版本图片生成功能暂时关闭...`
    );
    return;
  }
};

const withImageLoad = async (
  message: MessageInterface,
  prediction: any,
  time = 0
) => {
  if (time > 15) {
    await message.say(
      `@${message.talker()?.payload?.name} 生成图片超时，请重试...`
    );
    return;
  }
  setTimeout(async () => {
    const res = await loadReplicateImage(prediction);
    if (res.data?.prediction?.status === "failed") {
      await message.say(
        `@${message.talker()?.payload?.name} 出现未知错误，请重试...`
      );
      return;
    }
    if (res.data?.prediction?.status === "succeeded") {
      await message.say(
        `@${message.talker()?.payload?.name} ${res.data?.prediction?.output[0]}`
      );
      return;
    }
    withImageLoad(message, prediction, time++);
  }, 2000);
};
