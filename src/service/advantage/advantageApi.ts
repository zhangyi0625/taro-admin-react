import httpRequest from "../../utils/http";
import type { PortAdvantageSearchParams } from "./advantageModel";

/**
 * @description 获取业务优势
 * @returns
 */
export const getBusinessAdvantage = () => {
  return httpRequest.get("/api/customer/supplier/advantage/business");
};

/**
 * @description 获取起运港、目的港优势
 * @param params 查询参数
 * @returns
 */
export const getPortAdvantage = (params: PortAdvantageSearchParams) => {
  return httpRequest.get("/api/app/open/port", params);
};

/**
 * @description 获取航线优势
 * @param params 查询参数
 * @returns
 */
export const getRouteAdvantage = (params?: { parentId?: string }) => {
  return httpRequest.get("/api/app/open/route", params);
};

/**
 * @description 获取船东优势
 * @returns
 */
export const getCarrierAdvantage = () => {
  return httpRequest.get("/api/app/open/carrier");
};
