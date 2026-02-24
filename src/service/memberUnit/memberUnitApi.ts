import httpRequest from "../../utils/http";
import type { MemberUnitSearchParams } from "./memberUnitModel";

/**
 * 查询会员单位列表
 */
export const getMemberUnitList = (params: MemberUnitSearchParams) => {
  return httpRequest.get("/api/app/open/company", params);
};

/**
 * 分页查询会员单位列表
 */
export const getMemberUnitPageListPage = (params: MemberUnitSearchParams) => {
  return httpRequest.get("/api/app/open/company/page", params);
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

/**
 * @description 查询有效广告列表
 * @param params
 * @returns
 */
export const getEffectiveAnnouncementList = (params: any) => {
  return httpRequest.get(
    "/api/app/advertisement/getEffectiveAnnouncement",
    params,
  );
};
