import httpRequest from "../../utils/http";

/**
 * @description 查询留言列表
 * @param params
 * @returns
 */

export const getCustomerMessageList = (params?: { direction: number }) => {
  return httpRequest.get("/api/app/customer-message", params);
};

/**
 * @description 提交留言
 * @param params
 * @returns
 */
export const submitCustomerMessage = (params: {
  receiverId: string;
  content: string;
}) => {
  return httpRequest.post("/api/app/customer-message", params);
};

/**
 * @description 回复留言
 * @param params
 * @returns
 */
export const replyCustomerMessage = (params: {
  id: string;
  replyContent: string;
}) => {
  return httpRequest.post("/api/app/customer-message/reply", params);
};
