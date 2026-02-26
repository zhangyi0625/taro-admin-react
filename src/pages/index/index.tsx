import React, { useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import "./index.scss";
import {
  useDidHide,
  useDidShow,
  usePullDownRefresh,
  useReady,
} from "@tarojs/taro";
import Taro from "@tarojs/taro";
import BannerImg from "../../images/banner.png";
import ArrowRight from "../../images/icon/arrow-icon.svg";
import defaultLogo from "../../images/icon/default-logo.svg";

import type { MemberUnitDetailType } from "../../service/memberUnit/memberUnitModel";
import { getIndustryNewsList } from "../../service/industry-trends/industry-trendsApi";
import { getMemberUnitList } from "../../service/memberUnit/memberUnitApi";
import { getEffectiveAnnouncementList } from "../../service/advertising/advertisingApi";
import { IndustryNewsDetailType } from "../../service/industry-trends/industry-trendsModel";
import { wechatLogin } from "../../service/auth/authApi";
import {
  FunItemsOptions,
  levelOptions,
  memberUnitLevelOptions,
} from "./config";
import { previewImage } from "../../utils/tools";
import { AdvertisementContentType } from "../../service/advertising/advertisingModel";

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

const Index: React.FC = () => {
  const [memberUnit, setMemberUnit] = useState<Partial<MemberUnitDetailType>[]>(
    [],
  );

  const [industryNews, setIndustryNews] = useState<IndustryNewsDetailType[]>(
    [],
  );

  const [advertisement, setAdvertisement] = useState<
    AdvertisementContentType[]
  >([]);

  // 可以使用所有的 React Hooks
  useEffect(() => {}, []);

  const init = async () => {
    try {
      await Promise.all([
        getMemberUnitList({
          isShow: true,
          sort: "sort",
          order: "desc",
        }),
        getIndustryNewsList(),
      ]).then((res: any) => {
        setMemberUnit(res[0]);
        setIndustryNews(res[1]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  // 对应 onReady
  useReady(() => {
    // console.log("useReady");
  });

  // 对应 onShow
  useDidShow(() => {
    // console.log("useDidShow");
    getFirstLogin();
    setTimeout(() => {
      init();
      loadAdvertisement();
    }, 1000);
  });

  const loadAdvertisement = async () => {
    try {
      const resp: any = await getEffectiveAnnouncementList();
      setAdvertisement(
        resp ? [resp] : [{ imagePath: BannerImg, link: "", title: "" }],
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getFirstLogin = async () => {
    await Taro.login({
      success: async function (res) {
        if (res.code) {
          const resp: any = await wechatLogin({ wxCode: res.code });
          if (resp) {
            Taro.setStorageSync("token", resp.accessToken);
            Taro.setStorageSync("userInfo", resp.customer);
          }
          Taro.setStorageSync("isFirstLogin", resp ? true : false);
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      },
    });
  };

  // 对应 onHide
  useDidHide(() => {
    // console.log("useDidHide");
  });

  // Taro 对所有小程序页面生命周期都实现了对应的自定义 React Hooks 进行支持
  // 详情可查阅：【Hooks】
  usePullDownRefresh(() => {
    // console.log("usePullDownRefresh");
  });

  const handleClick = (item: IndustryNewsDetailType) => {
    Taro.setStorageSync(
      item.url ? "url" : "content",
      item.url ? item.url : JSON.stringify(item.content),
    );
    Taro.setStorageSync("wxTitle", item.title);
    Taro.navigateTo({
      url: `/pages/webview/index?content=${item.url ? item.url : item.content}&type=${
        item.url ? "website" : "markdown"
      }`,
    });
  };

  const jumpEither = () => {
    Taro.setStorageSync("url", advertisement?.[0]?.link || "");
    Taro.setStorageSync("wxTitle", advertisement?.[0]?.title || "");
    Taro.navigateTo({
      url: `/pages/webview/index?content=${advertisement?.[0]?.link || ""}&type=${"website"}`,
    });
    Taro.navigateTo({ url: advertisement?.[0]?.link || "" });
  };

  return (
    <View className="index">
      <View className="index-title">
        <View className="index-banner">
          <Image
            src={advertisement?.[0]?.imagePath}
            onClick={jumpEither}
            // className="banner"
            className="w-[100%] h-[100%]"
          />
        </View>
        <View className="index-function">
          {FunItemsOptions.map((item) => (
            <View
              className="index-function-item"
              key={item.title}
              onClick={() =>
                Taro.navigateTo({ url: item.url + "?name=" + item.title })
              }
            >
              <Image src={item.icon} className="icon" />
              <Text>{item.title}</Text>
            </View>
          ))}
        </View>
      </View>
      <View className="index-memberUnit">
        <View className="index-memberUnit-title">
          <Text>会员中心</Text>
          <View
            className="more"
            onClick={() =>
              Taro.switchTab({
                url: "/pages/memberUnit/index",
              })
            }
          >
            更多
            <Image src={ArrowRight} className="arrow-icon" />
          </View>
        </View>
        <View className="index-memberUnit-content">
          {memberUnit.slice(0, 10).map((item) => (
            <View
              className="index-memberUnit-item"
              key={item.name}
              onClick={() =>
                Taro.navigateTo({
                  url: "/pages/memberUnit/memberUnitDetail/index?id=" + item.id,
                })
              }
            >
              <Image
                src={item.logoPath ?? defaultLogo}
                className="logo"
                mode="aspectFit"
              />
              <View className="index-memberUnit-item-name">
                <Text className="text-large">{item.name}</Text>
                <View className="index-memberUnit-item-level" key={item.name}>
                  <Image
                    src={
                      levelOptions.find((i) => i.value === item?.memberLevel)
                        ?.icon
                    }
                    className="level"
                  />
                  <Text className="level-text">
                    {memberUnitLevelOptions.find(
                      (i) => i.value === item?.unitLevel,
                    )?.label || ""}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View className="index-dynamic">
        <View
          className="index-memberUnit-title"
          style={{ borderBottom: "none" }}
        >
          <Text>行业动态</Text>
          <View
            className="more"
            onClick={() =>
              Taro.navigateTo({ url: "/pages/industryDynamics/index" })
            }
          >
            更多
            <Image src={ArrowRight} className="arrow-icon" />
          </View>
        </View>
        <View className="index-memberUnit-content">
          {industryNews.slice(0, 5).map((item) => (
            <View className="index-memberUnit-item" key={item.id}>
              <Image
                src={item.mainImagePath ?? defaultLogo}
                className="main-image"
                mode="aspectFill"
                onClick={() =>
                  previewImage(item.mainImagePath, [item.mainImagePath])
                }
              />
              <View
                className="index-memberUnit-item-name"
                onClick={() => handleClick(item)}
              >
                <Text className="line-clamp-2">{item.title}</Text>
                <View className="index-memberUnit-item-level" key={item.id}>
                  <Text className="group-name">{item.groupName}</Text>
                  <Text className="level-text">{item.updateTime}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Index;
