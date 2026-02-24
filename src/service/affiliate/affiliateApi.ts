import httpRequest from "../../utils/http";
import { AffiliateInfoType, ApplicationFormType } from "./affiliateModel";

/**
 * @description 获取企业详情
 * @param id 企业ID
 * @returns
 */
export const getAffiliateInfoDetail = (id: string) => {
  return httpRequest.get(`/api/app/open/company/${id}`);
};

/**
 * @description 修改企业详情
 * @param params 修改参数
 * @returns
 */
export const updateAffiliateInfo = (params: Partial<AffiliateInfoType>) => {
  return httpRequest.put("/api/app/company", params);
};

/**
 * @description 提交入会申请
 * @param params 提交参数
 * @returns
 */
export const saveApplication = (params: ApplicationFormType) => {
  return httpRequest.post("/api/app/association-apply", params);
};

/**
 * @description 添加企业图片
 * @param params 添加参数
 * @returns
 */
export const postAffiliateImage = (params: {
  companyId: string;
  imageId: string;
}) => {
  return httpRequest.post(`/api/app/company-image`, params);
};

/**
 * @description 删除企业图片
 * @param id 图片ID
 * @returns
 */
export const deleteAffiliateImage = (id: string) => {
  return httpRequest.delete(`/api/app/company-image/${id}`);
};
