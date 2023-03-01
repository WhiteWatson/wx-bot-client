# 开发过程中遇到的问题

## https本地服务开启
新建vue.config.js 在里面添加
```
devServer: {
  https: true,
},
```

## 安装完vue-cli-plugin-electron-builder插件后不能启动 electron 报错
运行 `node node_modules/electron/install.js` 下载electron安装包解决

## background.ts 找不到
手动修改 background.js 文件成ts版本

## loaderContext.getOptions is not a function
降低ts-loader版本 `pnpm i ts-loader@~8.2.0`