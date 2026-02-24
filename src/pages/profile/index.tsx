import React, { useCallback, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import "./index.scss";
import Taro, { useDidShow } from "@tarojs/taro";
import ArrowRight from "../../images/icon/arrow-icon.svg";
import Avatar from "../../images/icon/avatar.svg";
import Setting from "../../images/icon/setting.svg";
import Message from "../../images/icon/profile.svg";
import Affiliate from "../../images/icon/affiliate.svg";
import Collection from "../../images/icon/collect.svg";
import Communication from "../../images/icon/communicate.svg";
import SendCommunication from "../../images/icon/send-communication.svg";
import { UserInfoParams } from "../../service/user/userModel";
import { wechatLogin } from "../../service/auth/authApi";

type ProfileItemsType = {
  title: string;
  icon: string;
  url: string;
  isShow: boolean;
};

const Profile: React.FC = () => {
  const [userInfo, setUserInfo] = useState<Partial<UserInfoParams>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useDidShow(() => {
    refreshUserInfo();
  });

  const refreshUserInfo = async () => {
    setLoading(true);
    try {
      await Taro.login({
        success: async function (res) {
          if (res.code) {
            const resp: any = await wechatLogin({ wxCode: res.code });
            if (resp) {
              console.log(resp.data, "resp.data");
              Taro.setStorageSync("token", resp.accessToken);
              setUserInfo(resp.customer || {});
              Taro.setStorageSync("userInfo", resp.customer);
            }
            Taro.setStorageSync("isFirstLogin", resp ? true : false);
          }
        },
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const getIsShow = useCallback(
    (type: string) => {
      return userInfo[type] ? true : false;
    },
    [userInfo],
  );

  const ProfileItems = useCallback(() => {
    return [
      {
        title: "我的信息",
        icon: Message,
        url: "/pages/message/index",
        isShow: true,
      },
      {
        title: "企业管理",
        icon: Affiliate,
        url: "/pages/affiliate/index",
        isShow: getIsShow("companyMaster"),
      },
    ];
  }, [userInfo]);

  const ProfileLastItems = useCallback(() => {
    return [
      {
        title: "收藏企业",
        icon: Collection,
        url: "/pages/collection/index",
        isShow: getIsShow("name"),
      },
      {
        title: "收到的留言",
        icon: Communication,
        url: "/pages/dynamic/index?direction=2",
        isShow: getIsShow("name"),
      },
      {
        title: "发出的留言",
        icon: SendCommunication,
        url: "/pages/dynamic/index?direction=1",
        isShow: getIsShow("name"),
      },
    ];
  }, [userInfo]);

  const jumpItem = (item: ProfileItemsType) => {
    Taro.navigateTo({ url: item.url });
  };

  return (
    <View className="profile">
      <View className="profile-title">
        <View className="inline-flex">
          {loading ? (
            <>
              <View className="skeleton-avatar"></View>
              <View className="flex-col">
                <View className="skeleton skeleton-nickname"></View>
                <View className="skeleton skeleton-phone"></View>
              </View>
            </>
          ) : (
            <>
              <Image
                src={userInfo?.avatarPath ?? Avatar}
                mode="aspectFill"
                className="avatar"
              />
              {userInfo?.name ? (
                <View className="flex-col">
                  <Text className="nickname">{userInfo?.name}</Text>
                  <Text className="phone">{userInfo?.phone}</Text>
                </View>
              ) : (
                <View
                  onClick={() => Taro.navigateTo({ url: "/pages/login/index" })}
                >
                  登录/注册
                </View>
              )}
            </>
          )}
        </View>
        {!loading && userInfo.name && (
          <View
            className="setting"
            onClick={() =>
              Taro.navigateTo({
                url: "/pages/profile/AccountSetting/index",
              })
            }
          >
            <Image src={Setting} className="setting-icon" />
            账号设置
          </View>
        )}
      </View>
      <View className="profile-content">
        {ProfileItems().map(
          (item) =>
            item.isShow && (
              <View
                className="profile-content-item"
                key={item.title}
                onClick={() => jumpItem(item)}
              >
                <View className="inline-flex">
                  <Image src={item.icon} className="icon" />
                  <Text>{item.title}</Text>
                </View>
                <Image src={ArrowRight} className="arrow-icon" />
              </View>
            ),
        )}
      </View>
      <View className="profile-content">
        {ProfileLastItems().map(
          (item) =>
            item.isShow && (
              <View
                className="profile-content-item"
                key={item.title}
                onClick={() => jumpItem(item)}
              >
                <View className="inline-flex">
                  <Image src={item.icon} className="icon" />
                  <Text>{item.title}</Text>
                </View>
                <Image src={ArrowRight} className="arrow-icon" />
              </View>
            ),
        )}
      </View>
    </View>
  );
};

export default Profile;
