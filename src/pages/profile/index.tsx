import React, { useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import ArrowRight from "../../images/icon/arrow-icon.svg";
import Avatar from "../../images/icon/avatar.svg";
import Setting from "../../images/icon/setting.svg";
import Message from "../../images/icon/profile.svg";
import Affiliate from "../../images/icon/affiliate.svg";
import Collection from "../../images/icon/collect.svg";
import Communication from "../../images/icon/communicate.svg";

type ProfileItemsType = {
  title: string;
  icon: string;
  url: string;
  isShow: boolean;
};

const Profile: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>({
    // nickname: "用户昵称",
    // phone: "用户手机号",
  });

  useEffect(() => {}, []);

  const ProfileItems: ProfileItemsType[] = [
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
      isShow: true,
    },
  ];

  const ProfileLastItems: ProfileItemsType[] = [
    {
      title: "收藏企业",
      icon: Collection,
      url: "/pages/collection/index",
      isShow: true,
    },
    {
      title: "收到的留言",
      icon: Communication,
      url: "/pages/dynamic/index",
      isShow: true,
    },
  ];

  const jumpItem = (item: ProfileItemsType) => {
    Taro.navigateTo({ url: item.url });
  };

  return (
    <View className="profile">
      <View className="profile-title">
        <View className="inline-flex">
          <Image src={Avatar} className="avatar" />
          {userInfo.nickname ? (
            <View className="flex-col">
              <Text className="nickname">{userInfo.nickname}</Text>
              <Text className="phone">{userInfo.phone}</Text>
            </View>
          ) : (
            <View
              onClick={() => Taro.navigateTo({ url: "/pages/login/index" })}
            >
              登陆/注册
            </View>
          )}
        </View>
        <View className="setting">
          <Image src={Setting} className="setting-icon" />
          账号设置
        </View>
      </View>
      <View className="profile-content">
        {ProfileItems.map((item) => (
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
        ))}
      </View>
      <View className="profile-content">
        {ProfileLastItems.map((item) => (
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
        ))}
      </View>
    </View>
  );
};

export default Profile;
