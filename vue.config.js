const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const ShebangPlugin = require("webpack-shebang-plugin");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      preload: "src/preload.ts",
      builderOptions: {
        nsis: {
          allowToChangeInstallationDirectory: true,
          oneClick: false,
        },
        win: {
          icon: "/src/assets/icons/icon.ico",
        },
        productName: "WxBotClient",
        mac: {
          target: ["dmg", "zip"],
        },
      },
    },
  },
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin(),
      new ShebangPlugin({
        shebangRegExp: /[\s\n\r]*(#!.*)[\s\n\r]*/gm,
        chmod: 0o755,
      }),
    ],
  },

  devServer: {
    https: false,
  },
});
