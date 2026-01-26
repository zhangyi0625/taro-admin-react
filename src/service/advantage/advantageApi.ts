import httpRequest from "../../utils/http";

/**
 * 获取业务优势
 */
export const getBusinessAdvantage = () => {
  return httpRequest.get("/api/customer/supplier/advantage/business");
};

/**
 * 获取起运港、目的港优势
 */
export const getPortAdvantage = (params: { tag: string }) => {
  return httpRequest.get("/api/customer/supplier/advantage/product", {
    params,
  });
};

/**
 * 获取航线优势
 */
export const getRouteAdvantage = () => {
  return httpRequest.get("/api/customer/supplier/advantage/route");
};
