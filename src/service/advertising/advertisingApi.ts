import httpRequest from "../../utils/http";

/**
 * @description 查询有效广告列表
 * @returns
 */
export const getEffectiveAnnouncementList = () => {
  return httpRequest.get("/api/app/advertisement/getEffectiveAnnouncement");
};
