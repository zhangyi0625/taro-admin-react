import httpRequest from "../../utils/http";

/**
 * @description 获取箱货跟踪列表
 * @returns
 */
export const getLogisticsTrackingList = () => {
  return httpRequest.get(`/api/app/container-cargo-tracking`);
};

/**
 * @description 查询箱货跟踪
 * @param params 查询参数
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
 * @param id 跟踪id
 * @returns
 */
export const updateLogisticsTracking = (id: string) => {
  return httpRequest.post(`/api/app/container-cargo-tracking/run/${id}`);
};

/**
 * @description 获取箱货跟踪详情
 * @param id 跟踪id
 * @returns
 */
export const getLogisticsTrackingDetail = (id: string) => {
  return httpRequest.get(`/api/app/container-cargo-tracking/${id}`);
};
