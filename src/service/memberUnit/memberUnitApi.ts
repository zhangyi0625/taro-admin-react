import httpRequest from "../../utils/http";
import type { MemberUnitSearchParams } from "./memberUnitModel";

/**
 * 查询会员单位列表
 */
export const getMemberUnitList = (params: MemberUnitSearchParams) => {
  return httpRequest.get("/api/app/open/company", params);
};

/**
 * @description 查询会员单位详情
 * @param params
 * @returns
 */
export const getMemberUnitDetail = (params: { id: string }) => {
  return httpRequest.get(`/api/app/open/company/${params.id}`);
};

/**
 * @description 查询会员单位成员列表
 * @param params
 * @returns
 */

export const getMemberUnitCustomerList = (params: { companyId: string }) => {
  return httpRequest.get(`/api/app/open/company/customer/${params.companyId}`);
};

/**
 * @description 查询会员单位图片
 * @param params
 * @returns
 */
export const getMemberUnitImage = (params: { companyId: string }) => {
  return httpRequest.get(`/api/app/open/company-image/${params.companyId}`);
};

/**
 * @description 查询行业动态列表
 * @param params
 * @returns
 */
export const getIndustryNewsList = (params?: { groupId: string }) => {
  return httpRequest.get("/api/app/industry-news", params);
};

/**
 * @description 查询行业动态详情
 * @param params
 * @returns
 */
export const getIndustryNewsDetail = (params: { id: number }) => {
  return httpRequest.get(`/api/app/industry-news/${params.id}`);
};

/**
 * @description 查询行业栏目信息
 * @param params
 * @returns
 */
export const getIndustryColumnList = (params: {
  groupName: string;
  sort: string;
}) => {
  return httpRequest.get("/api/app/association-column", params);
};

/**
 * @description 查询行业栏目分组列表
 * @param params
 * @returns
 */
export const getIndustryColumnGroupList = () => {
  return httpRequest.get("/api/app/column-group");
};

/**
 * @description 添加入会申请
 * @param params
 * @returns
 */
export const addIndustryApply = (params: any) => {
  return httpRequest.post("/api/app/association-apply", params);
};

/**
 * @description 添加会员单位成员
 * @param params
 * @returns
 */
export const addMemberUnitCustomer = (params: any) => {
  return httpRequest.post("/api/app/company/addCustomer", params);
};

/**
 * @description 删除会员单位成员
 * @param params
 * @returns
 */
export const removeMemberUnitCustomer = (params: { customerId: string }) => {
  return httpRequest.post(
    `/api/app/company/removeCustomer/${params.customerId}`,
  );
};
