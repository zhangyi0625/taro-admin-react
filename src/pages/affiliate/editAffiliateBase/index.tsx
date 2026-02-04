import {
  View,
  Button,
  Picker,
  Text,
  Input,
  Image,
  Textarea,
} from "@tarojs/components";
import { useState } from "react";
import { AffiliateInfoType } from "../../../service/affiliate/affiliateModel";
import "./editAffiliateBase.scss";
import Taro, { useLoad } from "@tarojs/taro";
import ArrowRight from "../../../images/icon/arrow-icon.svg";
import UploadIcon from "../../../images/icon/upload.svg";
import {
  getAffiliateInfoDetail,
  updateAffiliateInfo,
} from "../../../service/affiliate/affiliateApi";
import { uploadFile } from "../../../service/upload/uploadApi";
import DefaultLogo from "../../../images/icon/default-logo.svg";

const EditAffiliateBase: React.FC = () => {
  const [affiliateInfo, setAffiliateInfo] = useState<
    Partial<AffiliateInfoType>
  >({
    logo: null,
    name: "",
    position: "",
  });

  const [imgList, setImgList] = useState<string>("");

  const changeLogo = () => {
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
          success: (res) => {
            let data = JSON.parse(res.data);
            console.log(res, "res", data);
            if (data.code === 200) {
              setAffiliateInfo({ ...affiliateInfo, logo: data.data.id });
              setImgList(data.data.path);
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

  useLoad((options) => {
    init(options.id);
  });

  const init = async (id: string) => {
    try {
      const resp: any = await getAffiliateInfoDetail(id);
      setImgList(resp?.logoPath || DefaultLogo);
      setAffiliateInfo(resp || {});
    } catch {}
  };

  const saveAffiliateInfo = async () => {
    if (!affiliateInfo.name) {
      Taro.showToast({
        title: "请输入企业名称",
        icon: "none",
      });
      return;
    }
    if (!affiliateInfo.contactPhone) {
      Taro.showToast({
        title: "请输入联系电话",
        icon: "none",
      });
      return;
    }
    if (!affiliateInfo.address) {
      Taro.showToast({
        title: "请输入企业地址",
        icon: "none",
      });
      return;
    }
    try {
      const res: any = await updateAffiliateInfo(affiliateInfo);
      if (res.code === 200) {
        Taro.showToast({
          title: res.msg || "保存成功",
          icon: "success",
        });
        setTimeout(() => {
          Taro.navigateBack();
        }, 2000);
      }
    } catch (error) {
      Taro.showToast({
        title: "保存失败",
        icon: "none",
      });
    }
  };
  return (
    <View className="editAffiliateBase">
      <View className="editAffiliateBase-form">
        <View className="editAffiliateBase-form-item">
          <Text className="editAffiliateBase-form-item-label">企业logo</Text>
          <View
            className="inline-flex editAffiliateBase-form-item-input"
            style={{ justifyContent: "space-between" }}
            onClick={changeLogo}
          >
            {!affiliateInfo.logo ? (
              <View className="editAffiliateBase-form-item-upload">
                <Image className="icon" src={UploadIcon} />
              </View>
            ) : (
              <Image
                className="editAffiliateBase-form-item-avatar"
                src={imgList}
              />
            )}
            <Image className="arrow-icon" src={ArrowRight} />
          </View>
        </View>
        <View className="editAffiliateBase-form-item">
          <Text className="editAffiliateBase-form-item-label">
            <Text style={{ color: "red" }}>*</Text>企业名称
          </Text>
          <Input
            value={affiliateInfo.name}
            onInput={(e) =>
              setAffiliateInfo({ ...affiliateInfo, name: e.detail.value })
            }
            type="text"
            className="editAffiliateBase-form-item-input"
            placeholder="请输入企业名称"
          />
        </View>
        <View className="editAffiliateBase-form-item">
          <Text className="editAffiliateBase-form-item-label">成立时间</Text>
          <View
            className="inline-flex editAffiliateBase-form-item-input"
            style={{ justifyContent: "space-between" }}
          >
            <Picker
              value={affiliateInfo.establishmentDate as string}
              mode="date"
              onChange={(e) =>
                setAffiliateInfo({
                  ...affiliateInfo,
                  establishmentDate: e.detail.value,
                })
              }
            >
              <View
                className="picker"
                style={{
                  color: affiliateInfo.establishmentDate ? "black" : "gray",
                }}
              >
                {affiliateInfo.establishmentDate ?? "选择成立时间"}
              </View>
            </Picker>
            <Image className="arrow-icon" src={ArrowRight} />
          </View>
        </View>
        <View className="editAffiliateBase-form-item">
          <Text className="editAffiliateBase-form-item-label">
            <Text style={{ color: "red" }}>*</Text>联系电话
          </Text>
          <Input
            value={affiliateInfo.contactPhone}
            onInput={(e) =>
              setAffiliateInfo({
                ...affiliateInfo,
                contactPhone: e.detail.value,
              })
            }
            type="text"
            className="editAffiliateBase-form-item-input"
            placeholder="请输入联系电话"
          />
        </View>
        <View className="editAffiliateBase-form-item">
          <Text className="editAffiliateBase-form-item-label">企业邮箱</Text>
          <Input
            value={affiliateInfo.email}
            onInput={(e) =>
              setAffiliateInfo({ ...affiliateInfo, email: e.detail.value })
            }
            type="text"
            className="editAffiliateBase-form-item-input"
            placeholder="请输入邮箱"
          />
        </View>
        <View className="editAffiliateBase-form-item">
          <Text className="editAffiliateBase-form-item-label">企业地址</Text>
          <Input
            value={affiliateInfo.address}
            onInput={(e) =>
              setAffiliateInfo({ ...affiliateInfo, address: e.detail.value })
            }
            type="text"
            className="editAffiliateBase-form-item-input"
            placeholder="请输入地址"
          />
        </View>
      </View>
      <View
        className="editAffiliateBase-form flex-col"
        style={{ padding: "32rpx 24rpx" }}
      >
        <Text className="editAffiliateBase-form-item-label">企业简介</Text>
        <Textarea
          value={affiliateInfo.enterpriseDescription}
          onInput={(e) =>
            setAffiliateInfo({
              ...affiliateInfo,
              enterpriseDescription: e.detail.value,
            })
          }
          className="editAffiliateBase-form-item-textarea"
          autoHeight
          placeholder="请输入企业简介"
        />
      </View>
      <Button className="editAffiliateBase-btn" onClick={saveAffiliateInfo}>
        保存
      </Button>
    </View>
  );
};

export default EditAffiliateBase;
