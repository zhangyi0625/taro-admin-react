import httpRequest from "../../utils/http";
import { ShippingScheduleParams } from "./shippingScheduleModel";

/**
 * @description 获取船期查询
 * @param params 船期查询参数
 * @returns 船期查询结果
 */
export const getShippingScheduleQuery = (params: ShippingScheduleParams) => {
  return httpRequest.post(`/api/app/shipchedule-query`, params);
};

/**
 * @description 获取船期查询日志分页查询
 * @param params 分页查询参数
 * @returns 船期查询日志分页查询结果
 */
export const getShippingScheduleLogPage = (params: {
  page: number;
  limit: number;
}) => {
  return httpRequest.get(`/api/app/shipchedule-query/history`, params);
};
