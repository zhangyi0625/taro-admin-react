// postcss 插件以 object 方式注册的话，是按照由上到下的顺序执行的
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "weapp-tailwindcss": {
      // 配置 weapp-tailwindcss 插件
      transformPages: true,
      customAttributes: ["mode"],
      disableModules: true,
    },
  },
};
