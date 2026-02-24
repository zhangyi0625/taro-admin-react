import request from "../../utils/http";

/**
 * @description 预览文件
 * @param id 文件id
 * @returns
 */
export const previewFile = (id: string) => {
  return request.get(`/api/app/file/preview/${id}`, {
    responseType: "blob",
  });
};

/**
 * @description 上传文件
 * @param file 文件
 * @returns
 */
export const uploadFile = (file: File) => {
  return request.post("/api/app/file/upload", file);
};
