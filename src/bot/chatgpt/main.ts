import {
  ChatCompletionRequestMessage,
  Configuration,
  CreateCompletionRequestPrompt,
  OpenAIApi,
} from "openai";
import { chatGptConfig } from "../config";

const MAX_QBS = 3;
// eslint-disable-next-line prefer-const
let qbs = 0;

const configuration = new Configuration({
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
          temperature: chatGptConfig.temperature,
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

export const sendMessageByPrompt = (
  prompt: CreateCompletionRequestPrompt | null
) => {
  return new Promise((resolve, reject) => {
    if (qbs <= MAX_QBS) {
      qbs++;
      openai
        .createCompletion({
          model: "text-davinci-003",
          prompt,
          max_tokens: 256,
          temperature: 0,
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

export const getImageByPrompt = (prompt: string) => {
  return new Promise((resolve, reject) => {
    if (qbs <= MAX_QBS) {
      openai
        .createImage({
          prompt,
          n: 1,
          size: "1024x1024",
        })
        .then((res) => {
          qbs--;
          resolve(res.data);
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
