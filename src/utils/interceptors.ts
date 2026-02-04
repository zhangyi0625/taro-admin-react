import Taro from "@tarojs/taro";
import { pageToLogin } from "./index";
import { HTTP_STATUS } from "./config";

const customInterceptor = (chain) => {
  const requestParams = chain.requestParams;

  return chain.proceed(requestParams).then((res: any) => {
    // console.log(res, "response", res.data.code);
    if (
      res.header["Content-Type"] &&
      res.header["Content-Type"] === "image/png"
    ) {
      return res.data;
    }
    // 只要请求成功，不管返回什么状态码，都走这个回调
    if (res.data.code === HTTP_STATUS.NOT_FOUND) {
      return Promise.reject("请求资源不存在");
    } else if (res.data.code === HTTP_STATUS.BAD_GATEWAY) {
      return Promise.reject("服务端出现了问题");
    } else if (res.data.code === HTTP_STATUS.SERVER_ERROR) {
      Taro.showToast({
        title: res.data.message || "服务端出现了问题",
        icon: "none",
      });
      return Promise.reject("服务端出现了问题");
    } else if (res.data.code === HTTP_STATUS.FORBIDDEN) {
      Taro.setStorageSync("token", "");
      pageToLogin();
      return Promise.reject("没有权限访问");
    } else if (res.data.code === HTTP_STATUS.AUTHENTICATE) {
      Taro.setStorageSync("token", "");
      pageToLogin();
      return Promise.reject("需要鉴权");
    } else if (res.data.code === HTTP_STATUS.SUCCESS) {
      // 检查业务状态码
      if (res.data && res.data.code !== undefined) {
        if (res.data.code === 200) {
          return res.data.data || res.data;
        } else {
          return Promise.reject(res.data.message || "请求失败");
        }
      }
      return res.data;
    } else return Promise.reject(res.data);
    // return Promise.reject(`请求失败，状态码：${res.statusCode}`);
  });
};

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor];

export default interceptors;
