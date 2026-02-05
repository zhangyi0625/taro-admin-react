import { View, Text, Image } from "@tarojs/components";
import UploadIcon from "../../../images/icon/upload.svg";
import "./editAffiliateImage.scss";
import { useState } from "react";
import { useLoad } from "@tarojs/taro";
import { getMemberUnitImage } from "../../../service/memberUnit/memberUnitApi";
import Taro from "@tarojs/taro";
import {
  deleteAffiliateImage,
  postAffiliateImage,
} from "../../../service/affiliate/affiliateApi";
import DeleteIcon from "../../../images/icon/close-circle-filled.svg";

const EditAffiliateImage: React.FC = () => {
  const [imageList, setImageList] = useState<any[]>([]);

  const [affiliateId, setAffiliateId] = useState<string>("");

  useLoad((options) => {
    init(options.id || "");
    setAffiliateId(options.id || "");
  });

  const init = async (id?: string) => {
    try {
      const res: any = await getMemberUnitImage({ companyId: id || "" });
      setImageList(res ?? []);
    } catch (err) {
      console.log(err);
    }
  };

  const changeImage = () => {
    Taro.chooseImage({
      count: 1,
      success: async (res) => {
        Taro.uploadFile({
          url: "https://xh.zaicang.net/api/app/file/upload",
          filePath: res.tempFilePaths[0],
          name: "file",
          header: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + Taro.getStorageSync("token"),
          },
          success: async (res) => {
            let data = JSON.parse(res.data);
            console.log(res, "res", data);
            if (data.code === 200) {
              await postAffiliateImage({
                imageId: data.data.id,
                companyId: affiliateId || "",
              });
              const result: any = await getMemberUnitImage({
                companyId: affiliateId || "",
              });
              setImageList(result ?? []);
            }
          },
          fail: (err) => {
            console.log(err);
            Taro.showToast({
              title: err.errMsg || "上传失败",
              icon: "none",
            });
          },
        });
      },
    });
  };

  const deleteItem = async (id: string) => {
    try {
      await deleteAffiliateImage(id);
      const result: any = await getMemberUnitImage({
        companyId: affiliateId || "",
      });
      Taro.showToast({
        title: "删除成功",
        icon: "success",
      });
      setImageList(result ?? []);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View className="editAffiliateImage">
      <View className="editAffiliateImage-upload" onClick={() => changeImage()}>
        <Image src={UploadIcon} className="icon" />
        <Text>上传图片</Text>
      </View>
      <View className="editAffiliateImage-image">
        {imageList.map((item) => (
          <View
            className="editAffiliateImage-image-item"
            key={item.imagePath || ""}
          >
            <Image
              src={item.imagePath || ""}
              className="image"
              mode="aspectFill"
            />
            <Image
              src={DeleteIcon}
              className="delete-icon"
              onClick={() => deleteItem(item.id || "")}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default EditAffiliateImage;
