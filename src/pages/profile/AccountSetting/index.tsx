import { View, Text, Image } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { useState } from "react";
import "./index.scss";
import ArrowRight from "../../../images/icon/arrow-icon.svg";
import { UserInfoParams } from "../../../service/user/userModel";

const AccountSetting: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfoParams>(
    {} as UserInfoParams,
  );

  useDidShow(() => {
    setUserInfo(Taro.getStorageSync("userInfo") ?? {});
  });
  const logout = () => {
    Taro.showToast({
      title: "退出登录成功",
      icon: "success",
    });
    Taro.removeStorageSync("userInfo");
    Taro.removeStorageSync("token");
    Taro.navigateTo({
      url: "/pages/login/index",
    });
  };
  return (
    <View className="accountSetting">
      <View className="accountSetting-form">
        <View className="accountSetting-form-item">
          <Text>手机号</Text>
          <View className="right">
            <View>{userInfo.phone ?? ""}</View>
            <Image src={ArrowRight} className="arrow-icon" />
          </View>
        </View>
        <View
          className="accountSetting-form-item"
          onClick={() =>
            Taro.navigateTo({
              url: "/pages/profile/AccountSetting/AccountSettingEdit?title=password",
            })
          }
        >
          <Text>登录密码</Text>
          <View className="right">
            <View>{userInfo.password ?? ""}</View>
            <Image src={ArrowRight} className="arrow-icon" />
          </View>
        </View>
      </View>
      <View className="accountSetting-btn" onClick={logout}>
        退出登录
      </View>
    </View>
  );
};

export default AccountSetting;
