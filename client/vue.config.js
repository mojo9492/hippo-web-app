const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // * build in express api
  // outputDir: "../api/public/views", // ? maybe remove
  devServer: {
    proxy: {
      "/api/v1": {
        target: "http://hippo-api:3000",
      },
    },
  },
  pwa: {
    name: "Hippo",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
  },
});
