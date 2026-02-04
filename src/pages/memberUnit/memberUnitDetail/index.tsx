import { View, Text, Image, Button } from "@tarojs/components";
import "./index.scss";
import { useDidShow, useLoad } from "@tarojs/taro";
import { useCallback, useState } from "react";
import type {
  IndustryNewsDetailType,
  MemberUnitCustomerType,
  MemberUnitDetailType,
} from "../../../service/memberUnit/memberUnitModel";
import IconShare from "../../../images/icon/share.svg";
import defaultLogo from "../../../images/icon/default-logo.svg";
import { levelOptions, memberUnitLevelOptions } from "../../index/config";
import {
  getMemberUnitCustomerList,
  getMemberUnitImage,
  getMemberUnitDetail,
} from "../../../service/memberUnit/memberUnitApi";
import Taro from "@tarojs/taro";
import ArrowRight from "../../../images/icon/arrow-icon.svg";
import IconChange from "../../../images/icon/change.svg";
import FavoriteIcon from "../../../images/icon/favorite.svg";
import {
  cancelFavoriteCompany,
  favoriteCompany,
  getFavoriteCompanyList,
} from "../../../service/collection/collectionApi";

const MemberUnitDetail = () => {
  const [memberUnitDetail, setMemberUnitDetail] =
    useState<MemberUnitDetailType>();

  const [id, setId] = useState<string>();

  const getToken = useCallback(() => {
    return Taro.getStorageSync("token");
  }, []);

  const [isCollection, setIsCollection] = useState<boolean>(false);

  const [customerList, setCustomerList] = useState<MemberUnitCustomerType[]>(
    [],
  );

  const [imageList, setImageList] = useState<string[]>([]);

  useLoad((options) => {
    setId(options.id ?? "");
    setTimeout(() => {
      init(options.id || "");
      getToken() && loadMyCollection(options.id || "");
    }, 1000);
  });

  // 获取我的收藏列表 比较该企业是否在其中判断
  const loadMyCollection = async (id: string) => {
    try {
      const res: any = await getFavoriteCompanyList();
      setIsCollection(res?.find((i) => i.id === id)?.id !== undefined);
    } catch (err) {
      console.log(err);
    }
  };

  const changeCollection = async () => {
    try {
      if (!isCollection) {
        await favoriteCompany({ companyId: id || "" });
        Taro.showToast({
          title: "收藏成功",
          icon: "success",
        });
        setIsCollection(true);
      } else {
        await cancelFavoriteCompany(id || "");
        Taro.showToast({
          title: "取消收藏成功",
          icon: "success",
        });
        setIsCollection(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useDidShow(() => {
    // init()
    Taro.setBackgroundColor({
      backgroundColor: "#167fff",
    });
  });

  const init = async (id?: string) => {
    try {
      Promise.all([
        getMemberUnitDetail({ id: id || "" }),
        getMemberUnitCustomerList({
          companyId: id || "",
        }),
        getMemberUnitImage({ companyId: id || "" }),
      ]).then((res: any) => {
        setMemberUnitDetail(res[0]);
        setCustomerList(
          res[1].filter((i) => i.id !== Taro.getStorageSync("userInfo")?.id) ??
            [],
        );
        setImageList(
          res[2].map((i: { imagePath: string }) => i.imagePath) ?? [],
        );
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getAdvanceBusiness = useCallback(() => {
    return memberUnitDetail?.advantageBusiness
      ? memberUnitDetail?.advantageBusiness.split(",")
      : [];
  }, [memberUnitDetail]);

  const getOtherAdvance = useCallback(
    (key: string, name: string) => {
      return memberUnitDetail?.[key]
        ? memberUnitDetail?.[key].map((i) => i[name])
        : [];
    },
    [memberUnitDetail],
  );

  const onShareAppMessage = () => {
    // Taro.sha
    return {
      title: "自定义转发标题",
      path: `/pages/memberUnit/memberUnitDetail/index?id=${id}`,
    };
    Taro.showToast({
      title: "分享成功",
      icon: "success",
    });
  };

  const getRandomThree = useCallback(() => {
    if (customerList.length < 3) {
      return customerList;
    }
    const result: MemberUnitCustomerType[] = [];
    while (result.length < 3) {
      const randomIndex = Math.floor(Math.random() * customerList.length);
      const randomElement = customerList[randomIndex];
      if (!result.find((i) => i.id === randomElement.id)) {
        // 确保不重复添加元素到结果数组中
        result.push(randomElement);
      }
    }
    return result ?? [];
  }, [customerList]);

  const goToDynamic = (id: string) => {
    Taro.navigateTo({
      url: "/pages/dynamic/dynamicForm/index?id=" + id,
    });
  };

  return (
    <View className="memberUnitDetail">
      <View className="memberUnitDetail-title"></View>
      <View className="memberUnitDetail-baseInfo">
        <View className="logo">
          <Image
            src={memberUnitDetail?.logoPath ?? defaultLogo}
            className="logo-img"
          />
        </View>
        {/* {getToken() && ( */}
        <View
          className={
            !getToken()
              ? "visibility-hidden"
              : "memberUnitDetail-baseInfo-position"
          }
        >
          <View
            className={isCollection ? "collection un-collection" : "collection"}
            onClick={changeCollection}
          >
            <Image src={FavoriteIcon} className="collection-icon" />
            <Text className="collection-text">收藏</Text>
          </View>
          <Button
            openType="share"
            className="share-btn"
            onClick={onShareAppMessage}
          >
            <Image src={IconShare} className="share-icon" />
            <Text className="share-text">分享</Text>
          </Button>
        </View>
        {/* )} */}
        <View className="memberUnitDetail-baseInfo-content">
          <View>{memberUnitDetail?.name}</View>
          <View className="memberUnitDetail-baseInfo-content-level">
            <Image
              src={
                levelOptions.find(
                  (i) => i.value === memberUnitDetail?.memberLevel,
                )?.icon
              }
              className="level"
            />
            <Text className="level-text">
              单位类型:
              {memberUnitLevelOptions.find(
                (i) => i.value === memberUnitDetail?.unitLevel,
              )?.label || ""}
            </Text>
          </View>
          <View className="text">优势业务</View>
          <View className="flex-wrap" style={{ marginTop: "24rpx" }}>
            {getAdvanceBusiness().map((item) => (
              <View className="tag" key={item}>
                {item}
              </View>
            ))}
          </View>
          <View className="text inline-flex">
            成立时间：
            <Text className="text-normal">
              {memberUnitDetail?.establishmentDate}
            </Text>
            <View style={{ marginLeft: "48rpx" }}>
              联系电话：
              <Text className="text-normal">
                {memberUnitDetail?.contactPhone}
              </Text>
            </View>
          </View>
          <View className="text">
            邮箱：<Text className="text-normal">{memberUnitDetail?.email}</Text>
          </View>
          <View className="text">
            地址：
            <Text className="text-normal">{memberUnitDetail?.address}</Text>
          </View>
        </View>
      </View>
      <View className="memberUnitDetail-remark" style={{ marginTop: "0" }}>
        <View className="memberUnitDetail-remark-title">企业简介</View>
        <View>
          <Text className="gray">
            {memberUnitDetail?.enterpriseDescription ?? "未填写"}
          </Text>
        </View>
      </View>
      <View className="memberUnitDetail-remark">
        <View className="memberUnitDetail-remark-title">业务信息</View>
        <View className="memberUnitDetail-remark-nextTitle">优势业务</View>
        <View className="flex-wrap">
          {getAdvanceBusiness().map((item) => (
            <View className="tag" key={item}>
              {item}
            </View>
          ))}
        </View>
        <View className="memberUnitDetail-remark-nextTitle">优势起运港</View>
        <View className="flex-wrap">
          {getOtherAdvance("porList", "cnName").map((item) => (
            <View className="tag" key={item}>
              {item}
            </View>
          ))}
        </View>
        <View className="memberUnitDetail-remark-nextTitle">业务目的港</View>
        <View className="flex-wrap">
          {getOtherAdvance("fndList", "cnName").map((item) => (
            <View className="tag" key={item}>
              {item}
            </View>
          ))}
        </View>
        <View className="memberUnitDetail-remark-nextTitle">业务航线</View>
        <View className="flex-wrap">
          {getOtherAdvance("routeList", "name").map((item) => (
            <View className="tag" key={item}>
              {item}
            </View>
          ))}
        </View>
        <View className="memberUnitDetail-remark-nextTitle">优势船东</View>
        <View className="flex-wrap">
          {getOtherAdvance("carrierList", "cnName").map((item) => (
            <View className="tag" key={item}>
              {item}
            </View>
          ))}
        </View>
      </View>
      {imageList.length && (
        <View className="memberUnitDetail-remark">
          <View
            className="inline-flex"
            style={{ justifyContent: "space-between" }}
            onClick={() =>
              Taro.navigateTo({
                url: "/pages/memberUnit/memberUnitPicture/index?id=" + id,
              })
            }
          >
            <Text className="text-large">企业图鉴</Text>
            <View className="more">
              全部
              <Image src={ArrowRight} className="arrow-icon" />
            </View>
          </View>
          <View className="memberUnitDetail-remark-image">
            {imageList.slice(0, 3).map((item) => (
              <Image src={item} className="image" mode="widthFix" key={item} />
            ))}
          </View>
        </View>
      )}
      {getRandomThree().length && (
        <View className="memberUnitDetail-remark">
          <View
            className="inline-flex"
            style={{
              justifyContent: "space-between",
              borderBottom: "1rpx solid #EDEFF2",
              paddingBottom: "24rpx",
            }}
          >
            <Text className="text-large">企业成员</Text>
            <View
              className="inline-flex"
              onClick={() => setCustomerList(getRandomThree())}
              style={{ color: " #1677FF" }}
            >
              <Image src={IconChange} className="change-icon" />
              换一换
            </View>
          </View>
          {getRandomThree().map((item) => (
            <View className="customer-item" key={item.id}>
              <View className="inline-flex">
                <Image src={item.avatarId as string} className="avatar" />
                <View className="flex-col" style={{ marginTop: "6rpx" }}>
                  <View className="text-large">
                    {item.name}
                    <Text
                      className="text-normal"
                      style={{ marginLeft: "8rpx", color: "#909399" }}
                    >
                      {item.position}
                    </Text>
                  </View>
                  <View className="text-normal">
                    电话：{item.phone}
                    {!getToken() && (
                      <Text className="is-login">登录后查看</Text>
                    )}
                  </View>
                </View>
              </View>
              {getToken() && (
                <View
                  className="dynamic"
                  onClick={() => {
                    goToDynamic(item.id);
                  }}
                >
                  留言
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default MemberUnitDetail;
