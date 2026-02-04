import request from "../../utils/http";

/**
 * @description 预览文件
 */

export const previewFile = (id: string) => {
  return request.get(`/api/app/file/preview/${id}`, {
    responseType: "blob",
  });
};

/**
 * @description 上传文件
 */

export const uploadFile = (file: File) => {
  return request.post("/api/app/file/upload", file);
};
