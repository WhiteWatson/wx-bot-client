import axios from "axios";

const service = axios.create({
  timeout: 600000,
  // baseURL: "https://api.replicate.com",
});

// 配置请求拦截器
service.interceptors.request.use(
  function (config) {
    // 添加 token 到每一个请求的头部
    // config.headers = {
    //   Authorization: "Token r8_9C7WrbbOcP07ggDZZN6HRyJwUJOfaQB3OEoTf",
    // };
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

export const getImageByStableDiffusion = (text: string) => {
  return new Promise((resolve: any, reject: any) => {
    service.post(
      "https://replicate.com/api/models/stability-ai/stable-diffusion/versions/db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf/predictions",
      {
        "inputs": {
            "prompt": text
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
  // return new Promise((resolve: any, reject: any) => {
  //   service.get(`https://replicate.com/api/models${prediction.version.model.absolute_url}/versions/${prediction.version_id}/predictions/${prediction.uuid}`)
  //   .then(
  //     (response) => {
  //       resolve(response);
  //     },
  //     (err) => {
  //       reject(err);
  //     }
  //   )
  //   .catch((error) => {
  //     reject(error);
  //   });
  // });
  return await service.get(`https://replicate.com/api/models${prediction.version?.model.absolute_url}/versions/${prediction.version_id}/predictions/${prediction.uuid}`)
};

