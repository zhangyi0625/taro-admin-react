import httpRequest from "../../utils/http";

/**
 * @description 收藏企业列表
 * @returns
 */
export const getFavoriteCompanyList = () => {
  return httpRequest.get("/api/app/customer-company-favorite");
};

/**
 * @description 收藏企业
 * @param params 收藏参数
 * @returns
 */
export const favoriteCompany = (params: { companyId: string }) => {
  return httpRequest.post("/api/app/customer-company-favorite", params);
};

/**
 * @description 取消收藏企业
 * @param id 取消收藏参数
 * @returns
 */
export const cancelFavoriteCompany = (id: string) => {
  return httpRequest.delete(`/api/app/customer-company-favorite/${id}`);
};
