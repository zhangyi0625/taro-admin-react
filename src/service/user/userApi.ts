import httpRequest from "../../utils/http";
import type { UserInfoParams } from "./userModel";

/**
 * @description 修改用户信息
 * @param params 用户信息
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
