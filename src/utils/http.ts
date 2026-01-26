import Taro from "@tarojs/taro";
import interceptors from "./interceptors";

// 拦截器类型
type InterceptorItem = Parameters<typeof Taro.addInterceptor>[0];

// 确保拦截器类型正确
(interceptors as InterceptorItem[]).forEach((interceptorItem) =>
  Taro.addInterceptor(interceptorItem),
);

// HTTP 方法类型
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// 请求参数类型
type RequestParams = {
  url: string;
  data?: any;
  contentType?: string;
};

// 完整的请求选项类型
type RequestOptions = {
  url: string;
  data?: any;
  method: HttpMethod;
  header: {
    "content-type": string;
    Authorization?: string;
  };
};

// 响应类型
export type HttpResponse = ReturnType<typeof Taro.request>;

class HttpRequest {
  baseOptions(params: RequestParams, method: HttpMethod = "GET"): HttpResponse {
    const { url, data, contentType: customContentType } = params;
    const BASE_URL = process.env.TARO_APP_API;
    const contentType = customContentType || "application/json";

    const option: RequestOptions = {
      url: `${BASE_URL}${url}`,
      data,
      method,
      header: {
        "content-type": contentType,
        Authorization: "Bearer " + Taro.getStorageSync("token"),
      },
    };

    return Taro.request(option);
  }

  get(url: string, data?: any): HttpResponse {
    const option: RequestParams = { url, data };
    return this.baseOptions(option);
  }

  post(url: string, data?: any, contentType?: string): HttpResponse {
    const params: RequestParams = { url, data, contentType };
    return this.baseOptions(params, "POST");
  }

  put(url: string, data?: any): HttpResponse {
    const option: RequestParams = { url, data };
    return this.baseOptions(option, "PUT");
  }

  delete(url: string, data?: any): HttpResponse {
    const option: RequestParams = { url, data };
    return this.baseOptions(option, "DELETE");
  }
}

export default new HttpRequest();
