import httpRequest from "../../utils/http";

/**
 * 收藏企业列表
 */
export const getFavoriteCompanyList = () => {
  return httpRequest.get("/api/app/customer-company-favorite");
};

/**
 * 收藏企业
 */
export const favoriteCompany = (params: { companyId: string }) => {
  return httpRequest.post("/api/app/customer-company-favorite", params);
};

/**
 * 取消收藏企业
 */
export const cancelFavoriteCompany = (id: string) => {
  return httpRequest.delete(`/api/app/customer-company-favorite/${id}`);
};
