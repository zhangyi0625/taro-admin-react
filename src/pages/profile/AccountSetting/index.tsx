import { View, Text, Image } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { useState } from "react";
import clsx from "clsx";
import ArrowRight from "../../../images/icon/arrow-icon.svg";
import { UserInfoParams } from "../../../service/user/userModel";

const AccountSetting: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfoParams>(
    {} as UserInfoParams,
  );

  const itemsClass = clsx(
    "flex items-center justify-between py-[32px] px-[24px] text-[28px]",
  );

  const itemsTextClass = clsx("flex items-center text-[26px] text-[#909399]");

  const logoutButtonClass = clsx(
    "mt-[20px] h-[104px] leading-[104px] text-center text-[28px] bg-[#ffffff] text-[#fa5151] rounded-[12px]",
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
    <View className="py-[20px] px-[24px] overflow-hidden bg-[#f5f7fa] h-screen">
      <View className="bg-[#ffffff] rounded-[16px]">
        <View className={itemsClass + " border-b-[1px] border-[#edeff2]"}>
          <Text>手机号</Text>
          <View className={itemsTextClass}>
            <View>{userInfo.phone ?? ""}</View>
            <Image src={ArrowRight} className="arrow-icon" />
          </View>
        </View>
        <View
          className={itemsClass}
          key="password"
          onClick={() =>
            Taro.navigateTo({
              url: "/pages/profile/AccountSetting/AccountSettingEdit?title=password",
            })
          }
        >
          <Text>登录密码</Text>
          <View className={itemsTextClass}>
            <View>{userInfo.password ?? ""}</View>
            <Image src={ArrowRight} className="arrow-icon" />
          </View>
        </View>
      </View>
      <View className={logoutButtonClass} onClick={logout}>
        退出登录
      </View>
    </View>
  );
};

export default AccountSetting;
