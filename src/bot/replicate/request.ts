import axios from "axios";

const service = axios.create({
  timeout: 600000,
  // baseURL: "https://api.replicate.com",
});

// 配置请求拦截器
service.interceptors.request.use(
  function (config) {
    // 添加 token 到每一个请求的头部
    config.headers.Authorization =
      "Token r8_9C7WrbbOcP07ggDZZN6HRyJwUJOfaQB3OEoTf";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export function get(url: string, params?: any) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params,
      })
      .then(
        (response) => {
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
}

export const getTextToImageModelList = () => {
  return get("https://api.replicate.com/v1/collections/text-to-image");
};

export const getStableDiffusion = () => {
  return get(
    "https://api.replicate.com/v1/models/stability-ai/stable-diffusion"
  );
};

export const getImageByStableDiffusion = (prompt: string, negative_prompt = "worst quality,low guality,text,Clean,tidy") => {
  return new Promise((resolve: any, reject: any) => {
    service.post(
      "https://replicate.com/api/models/stability-ai/stable-diffusion/versions/db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf/predictions",
      {
        "inputs": {
            "prompt": prompt,
            "negative_prompt": negative_prompt,
            "guidance_scale": 9
        }
      }
    ).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        reject(err);
      }
    )
    .catch((error) => {
      reject(error);
    });
  });
};

export const loadReplicateImage = async (prediction: any) => {
  return await service.get(`https://replicate.com/api/models${prediction.version?.model.absolute_url}/versions/${prediction.version_id}/predictions/${prediction.uuid}`)
};

export const textToImagePrompt = (prompt: string, negative_prompt="masterpiece,(bestquality),highlydetailed,ultra-detailed,") => {
  return `
    StableDiffusion是一款利用深度学习的文生图模型，支持通过使用提示词来产生新的图像，描述要包含或省略的元素。
    我在这里引入StableDiffusion算法中的Prompt概念，又被称为提示符。
    下面的prompt是用来指导AI绘画模型创作图像的。它们包含了图像的各种细节，如人物的外观、背景、颜色和光线效果，以及图像的主题和风格。这些prompt的格式经常包含括号内的加权数字，用于指定某些细节的重要性或强调。例如，"(masterpiece:1.5)"表示作品质量是非常重要的，多个括号也有类似作用。此外，如果使用中括号，如"{blue hair:white hair:0.3}"，这代表将蓝发和白发加以融合，蓝发占比为0.3。
    以下是用prompt帮助AI模型生成图像的例子：masterpiece,(bestquality),highlydetailed,ultra-detailed,  cold , solo , ( 1girl ) , detailedeyes , shinegoldeneyes ) ( longliverhair ) expressionless , ( long sleeves , puffy sleeves ) ,  ( white wings ) , shinehalo , ( heavymetal : 1 . 2 ) , ( metaljewelry ) ,  cross-lacedfootwear ( chain ) ,  ( Whitedoves : 1 . 2 ) 



    可以选择的prompt包括：

    颜色
        light（明）
        dark（暗）
        pale（薄）
        deep（濃）

    天气 时间
        golden hour lighting  （阳光照明）
        strong rim light      （强边缘光照）
        intense shadows  （强烈的阴影）
        in the rain            （雨）
        rainy days              （雨）
        sunset                  （日落）
        cloudy                   （多云）

    建筑物
        in the baroque architecture     （巴洛克建筑 文艺复兴时期意大利的一种装修风格，外形自由，追求动感，喜好富丽）
        in the romanesque architecture streets        （罗马式街道）
        in the palace                                 （宫廷）
        at the castle（城的外观为背景）
        in the castle（城的内部为背景）
        in the street                                   （在街上）
        in the cyberpunk city                       （在赛博朋克城市里）
        rainy night in a cyberpunk city with glowing neon lights  （在雨天的赛博朋克城市，还有霓虹灯）
        at the lighthouse                               （在灯塔周围）
        in misty onsen                                 （温泉）
        by the moon                                     （月亮边上）
        in a bar, in bars                                   （酒吧）
        in a tavern                                        （居酒屋）
        Japanese arch                                  （鳥居）
        in a locker room                                 （在上锁的房间里）

    山
        on a hill（山上）
        the top of the hill（山顶）

    海
        on the beach       （海滩上）
        over the sea           （海边上）
        beautiful purple sunset at beach  （海边的美丽日落）
        in the ocean           （海中）
        on the ocean          （船上）

    仿照例子，并不局限于我给你的单词，给出一套详细描述“${prompt}”的prompt，注意：${negative_prompt}必须放在前面，prompt不能超过80个。直接开始给出prompt不需要用自然语言描述。 
  `
}