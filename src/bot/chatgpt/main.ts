import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
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
  return new Promise((resolve, rejects) => {
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
          rejects(err);
        });
    } else {
      rejects("请求过于频繁");
    }
  });
};
