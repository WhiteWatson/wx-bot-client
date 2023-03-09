const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const ShebangPlugin = require("webpack-shebang-plugin");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
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
