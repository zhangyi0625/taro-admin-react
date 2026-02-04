import httpRequest from "../../utils/http";
import type { PortAdvantageSearchParams } from "./advantageModel";

/**
 * 获取业务优势
 */
export const getBusinessAdvantage = () => {
  return httpRequest.get("/api/customer/supplier/advantage/business");
};

/**
 * 获取起运港、目的港优势
 */
export const getPortAdvantage = (params: PortAdvantageSearchParams) => {
  return httpRequest.get("/api/app/open/port", params);
};

/**
 * 获取航线优势
 */
export const getRouteAdvantage = (params?: { parentId?: string }) => {
  return httpRequest.get("/api/app/open/route", params);
};

/**
 * 获取船东优势
 */
export const getCarrierAdvantage = () => {
  return httpRequest.get("/api/app/open/carrier");
};
