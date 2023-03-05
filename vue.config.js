const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    },
  },
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
  },

  devServer: {
    https: false,
  },
});
