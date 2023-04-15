# Hi there, I'm WxBotClient <img width="30px" src="https://media.tenor.com/images/3b388fe03da271d2674faf85eb7c3fcd/tenor.gif" />
我是一款开源的微信托管软件，基于electron、wechaty和vue开发，现已接入ChatGPT，编译出的安装包开箱即用，不依赖复杂环境，托管程序不随意掉线，稳定可靠。

<img align="right" height="200" src="./src/assets/icons/icon.png" />

---
## 搭建方式
### 下载&安装
[releases包下载地址](https://github.com/LittleCCB/wx-bot-client/releases)，在这里你可以下载到已经构建好的 **.exe安装包(windows)**，下载过程中下载软件可能提示文件不安全，可以忽略此提示，下载完成后本地安装即可。

### 托管你的微信
打开软件，点击**开始使用吧**按钮，等待二维码出现，二维码出现后使用微信扫描二维码即可登录并托管微信。

![markdown picture](./doc/images/one.png)

tips: 国内使用请挂梯子，否则API不通过，AI会一直处于思考状态

---
## 功能简介
### AI文字对话能力

```
提问格式： /ai + 问题内容

例：/ai 你是谁？
```

### AI生成图片能力
```
提问格式： /image + 图片提示词

例：/image Closeup face portrait of a girl, smooth soft skin, big dreamy eyes, beautiful intricate colored hair, symmetrical, anime wide eyes, soft lighting, detailed face, by makoto shinkai, stanley artgerm lau, wlop, rossdraws, concept art, digital painting, looking into camera
```

---

## 自定义部署
此项目本地运行依赖node环境

### 安装依赖
```
pnpm install
```

### 接入ChatGPT并本地运行项目：

进入`/src/bot/config.ts`目录，将从[openAi官网API申请入口](https://platform.openai.com/account/api-keys)申请到`Organization`和`APIKey`的填写到`chatGptConfig`对象中


```
npm run electron:serve
```

### 打包客户端安装包:
```
npm run electron:build
```
---
## I'm a Computer Science and Engineering Student  

- 👨‍💻 I’m currently working on web development technologies like JavaScript, Vue etc.
- 💪🏼 Future Goals: Learn more technologies - Never stop creating new ideas.
- ⚡ Fun fact: I love to play Genshin Impact.

### 特别感谢 leeguiyu@qq.com创作的icon

### Languages and Tools 🛠 

![JavaScript](https://img.shields.io/badge/-JavaScript-%23F7DF1C?style=flat-square&logo=javascript&logoColor=000000&labelColor=%23F7DF1C&color=%23FFCE5A)
![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=ffffff)
![HTML5](https://img.shields.io/badge/-HTML5-%23E44D27?style=flat-square&logo=html5&logoColor=ffffff)
![CSS3](https://img.shields.io/badge/-CSS3-%231572B6?style=flat-square&logo=css3)
![Sass](https://img.shields.io/badge/-Sass-%23CC6699?style=flat-square&logo=sass&logoColor=ffffff)
![Bootstrap](https://img.shields.io/badge/-Bootstrap-563D7C?style=flat-square&logo=Bootstrap)
![Markdown](https://img.shields.io/badge/-Markdown-000000?style=flat-square&logo=markdown)
![Nodejs](https://img.shields.io/badge/-Nodejs-339933?style=flat-square&logo=Node.js&logoColor=ffffff)
![Npm](https://img.shields.io/badge/-npm-CB3837?style=flat-square&logo=npm)
![Git](https://img.shields.io/badge/-Git-%23F05032?style=flat-square&logo=git&logoColor=%23ffffff)
![GitLab](https://img.shields.io/badge/-GitLab-FCA121?style=flat-square&logo=gitlab)
![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github)
![VS Code](http://img.shields.io/badge/-VS%20Code-007ACC?style=flat-square&logo=visual-studio-code&logoColor=ffffff)
![Powershell](http://img.shields.io/badge/-Powershell-5391FE?style=flat-square&logo=powershell&logoColor=ffffff)
![Windows](http://img.shields.io/badge/-Windows-0078D6?style=flat-square&logo=windows&logoColor=ffffff)

<br/>

<br/>

  <h2 align="center"> Github Statistics 📈 </h2>
  
  <div align="center"> 
     <a href="">
      <img align="center" src="https://github-readme-stats-sigma-five.vercel.app/api?username=LittleCCB&show_icons=true&include_all_commits=true&count_private=true&theme=react&line_height=40" />
    </a>
    <a href="">
      <img align="center" src="https://github-readme-stats.vercel.app/api/top-langs/?username=LittleCCB&theme=react&line_height=40&hide=css"/>
    </a>
</div
  
<br/>

---
## 加群交流体验内测新功能

<img src="./doc/images/groupimg.jpg" alt="drawing" width="300"/>