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
import { AffiliateInfoType } from "../index";
import "./editAffiliateBase.scss";
import Taro from "@tarojs/taro";
import ArrowRight from "../../../images/icon/arrow-icon.svg";
import UploadIcon from "../../../images/icon/upload.svg";

const EditAffiliateBase: React.FC = () => {
  const [affiliateInfo, setAffiliateInfo] = useState<
    Partial<AffiliateInfoType>
  >({
    logo: null,
    name: "",
    position: "",
  });

  const changeLogo = () => {
    Taro.chooseImage({
      count: 1,
      success: (res) => {
        setAffiliateInfo({ ...affiliateInfo, logo: res.tempFilePaths[0] });
      },
    });
  };

  const saveAffiliateInfo = async () => {
    if (!affiliateInfo.name) {
      Taro.showToast({
        title: "请输入企业名称",
        icon: "none",
      });
      return;
    }
    if (!affiliateInfo.phone) {
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
    if (!affiliateInfo.remark) {
      Taro.showToast({
        title: "请输入企业简介",
        icon: "none",
      });
      return;
    }
    try {
      const res = await Taro.request({
        url: "/api/affiliate/save",
        method: "POST",
        data: affiliateInfo,
      });
      Taro.showToast({
        title: "保存成功",
        icon: "success",
      });
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
                src={affiliateInfo.logo as string}
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
              value={affiliateInfo.establishedTime as string}
              mode="date"
              onChange={(e) =>
                setAffiliateInfo({
                  ...affiliateInfo,
                  establishedTime: e.detail.value,
                })
              }
            >
              <View
                className="picker"
                style={{
                  color: affiliateInfo.establishedTime ? "black" : "gray",
                }}
              >
                {affiliateInfo.establishedTime ?? "选择成立时间"}
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
            value={affiliateInfo.phone}
            onInput={(e) =>
              setAffiliateInfo({ ...affiliateInfo, phone: e.detail.value })
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
        <Text className="editAffiliateBase-form-item-label">
          <Text style={{ color: "red" }}>*</Text>企业简介
        </Text>
        <Textarea
          value={affiliateInfo.remark}
          onInput={(e) =>
            setAffiliateInfo({ ...affiliateInfo, remark: e.detail.value })
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
