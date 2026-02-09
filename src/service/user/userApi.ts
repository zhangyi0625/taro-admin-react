import httpRequest from "../../utils/http";
import type {
  LoginPasswordParams,
  LoginPhoneParams,
  LoginWXParams,
  UserInfoParams,
} from "./userModel";

/**
 * @description 密码登录
 * @param params
 * @returns
 */
export const passwordLogin = (params: LoginPasswordParams) => {
  return httpRequest.post("/api/app/customer/password/login", params);
};

/**
 * @description 发送验证码
 * @param params
 * @returns
 */
export const sendCode = (params: { phone: string }) => {
  return httpRequest.post("/api/app/customer/phone/login/sendCode", params);
};

/**
 * @description 手机号登录/注册
 * @param params
 * @returns
 */
export const phoneLogin = (params: LoginPhoneParams) => {
  return httpRequest.post("/api/app/customer/phone/login", params);
};

/**
 * @description 微信一键登录
 * @param params
 * @returns
 */
export const wechatLogin = (params: LoginWXParams) => {
  return httpRequest.post("/api/app/customer/wx/login", params);
};

/**
 * @description 绑定微信
 * @param params
 * @returns
 */
export const postBindWechat = (params: LoginWXParams) => {
  return httpRequest.post("/api/app/customer/wxBindPhone", params);
};

/**
 * @description 修改密码
 * @param params
 * @returns
 */
export const updatePassword = (params: { code: string; password: string }) => {
  return httpRequest.put("/api/app/customer/setPassword", params);
};

/**
 * @description 修改用户信息
 * @param params
 * @returns
 */
export const saveUserInfo = (params: UserInfoParams) => {
  return httpRequest.put("/api/app/customer", params);
};

/**
 * @description 获取用户详情
 * @param id
 * @returns
 */
export const getUserDetail = () => {
  return httpRequest.post(`/api/app/customer/detail`);
};

/**
 * @description 获取箱货跟踪列表
 * @param id
 * @returns
 */
export const getLogisticsTrackingList = () => {
  return httpRequest.get(`/api/app/container-cargo-tracking`);
};

/**
 * @description 查询箱货跟踪
 * @param id
 * @returns
 */
export const getLogisticsTrackingQuery = (params: {
  number: string;
  place: string;
  ieflag: string;
}) => {
  return httpRequest.get(`/api/app/container-cargo-tracking/query`, params);
};

/**
 * @description 更新箱货跟踪
 * @param id
 * @returns
 */
export const updateLogisticsTracking = (id: string) => {
  return httpRequest.post(`/api/app/container-cargo-tracking/run/${id}`);
};

/**
 * @description 获取箱货跟踪详情
 * @param id
 * @returns
 */
export const getLogisticsTrackingDetail = (id: string) => {
  return httpRequest.get(`/api/app/container-cargo-tracking/${id}`);
};
