import httpRequest from "../../utils/http";
import { AffiliateInfoType, ApplicationFormType } from "./affiliateModel";

/**
 * 获取企业详情
 */
export const getAffiliateInfoDetail = (id: string) => {
  return httpRequest.get(`/api/app/open/company/${id}`);
};

/**
 * 修改企业详情
 *
 */
export const updateAffiliateInfo = (params: Partial<AffiliateInfoType>) => {
  return httpRequest.put("/api/app/company", params);
};

/**
 * 提交入会申请
 */
export const saveApplication = (params: ApplicationFormType) => {
  return httpRequest.post("/api/app/association-apply", params);
};

/**
 * 添加企业图片
 */
export const postAffiliateImage = (params: {
  companyId: string;
  imageId: string;
}) => {
  return httpRequest.post(`/api/app/company-image`, params);
};

/**
 * 删除企业图片
 */
export const deleteAffiliateImage = (id: string) => {
  return httpRequest.delete(`/api/app/company-image/${id}`);
};
