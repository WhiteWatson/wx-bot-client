export const chatGptConfig = {
  Organization: "org-0hRfyqNrF5pLgxKS85EGaKmG",
  APIKey: "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",
  temperature: 1,
};

export const appPuppetList = {
  wechat: {
    puppet: "wechaty-puppet-official-account",
  },
  wecom: {
    puppet: "wechaty-plugin-wecom",
  },
};

export const setApiKey = (apiKey: string) => {
  chatGptConfig.APIKey = apiKey;
  console.log('APIKey 更新成功');
};
