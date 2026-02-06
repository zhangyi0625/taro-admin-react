import Taro from "@tarojs/taro";

/**
 * 预览图片
 * @param currentImage 当前图片url
 * @param imageList 图片列表
 */
export const previewImage = (currentImage: string, imageList: string[]) => {
  Taro.previewImage({
    current: currentImage,
    urls: imageList,
    success: () => {},
    fail: () => {
      Taro.showToast({
        title: "预览图片失败,请稍后重试",
        icon: "none",
      });
    },
  });
};
