import httpRequest from "../../utils/http";

/**
 * @description 查询行业动态列表
 * @param params 查询参数
 * @returns
 */
export const getIndustryNewsList = (params?: { groupId: string }) => {
  return httpRequest.get("/api/app/industry-news", params);
};

/**
 * @description 查询行业动态详情
 * @param params 查询参数
 * @returns
 */
export const getIndustryNewsDetail = (params: { id: number }) => {
  return httpRequest.get(`/api/app/industry-news/${params.id}`);
};

/**
 * @description 查询行业栏目信息
 * @param params 查询参数
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
 * @returns
 */
export const getIndustryColumnGroupList = () => {
  return httpRequest.get("/api/app/column-group");
};
