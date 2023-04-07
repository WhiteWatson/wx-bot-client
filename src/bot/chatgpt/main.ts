import { ChatCompletionRequestMessage, Configuration, CreateCompletionRequestPrompt, OpenAIApi } from "openai";
import { chatGptConfig } from "../config";

const MAX_QBS = 3;
// eslint-disable-next-line prefer-const
let qbs = 0;

const configuration = new Configuration({
  organization: chatGptConfig.Organization,
  apiKey: chatGptConfig.APIKey,
});
export const openai = new OpenAIApi(configuration);

export const sendMessage = (message: ChatCompletionRequestMessage[]) => {
  return new Promise((resolve, reject) => {
    if (qbs <= MAX_QBS) {
      qbs++;
      openai
        .createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: message,
        })
        .then((res) => {
          qbs--;
          resolve(res.data.choices);
        })
        .catch((err) => {
          qbs--;
          reject(err);
        });
    } else {
      reject("请求过于频繁");
    }
  });
};

export const sendMessageByPrompt = (prompt:CreateCompletionRequestPrompt | null) => {
  return new Promise((resolve, reject) => {
    if (qbs <= MAX_QBS) {
      qbs++;
      openai
        .createCompletion({
          model: "gpt-3.5-turbo",
          prompt,
        })
        .then((res) => {
          qbs--;
          resolve(res.data.choices);
        })
        .catch((err) => {
          qbs--;
          reject(err);
        });
    } else {
      reject("请求过于频繁");
    }
  });
};
