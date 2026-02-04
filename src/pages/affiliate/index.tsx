import { View, Text, Image } from "@tarojs/components";
import "./index.scss";
import ArrowRight from "../../images/icon/arrow-icon.svg";
import { useCallback, useEffect, useState } from "react";
import Taro, { useDidShow } from "@tarojs/taro";
import {
  getAffiliateInfoDetail,
  postAffiliateImage,
} from "../../service/affiliate/affiliateApi";
import { AffiliateInfoType } from "../../service/affiliate/affiliateModel";
import {
  getMemberUnitCustomerList,
  getMemberUnitImage,
} from "../../service/memberUnit/memberUnitApi";
import { UserInfoParams } from "../../service/user/userModel";
import DefaultLogo from "../../images/icon/default-logo.svg";
import Avatar from "../../images/icon/avatar.svg";
import Edit from "../../images/icon/plus-circle-filled.svg";
import UploadIcon from "../../images/icon/upload.svg";

export type affiliateMemberType = {
  logo: string | null;
  name: string;
  phone: string;
  position: string;
  avatarId: string | null;
  avatarPath: string | null;
};

export type AdvantageOptionsType = {
  label: string;
  value: string[];
  key: string;
  jumpUrl: string;
};

const Affiliate: React.FC = () => {
  const [affiliateInfo, setAffiliateInfo] = useState<
    Partial<AffiliateInfoType>
  >({});

  const [userInfo, setUserInfo] = useState<Partial<UserInfoParams>>({});

  const [customerList, setCustomerList] = useState<affiliateMemberType[]>([]);

  const [imageList, setImageList] = useState<any[]>([]);

  const getValueByKey = useCallback(
    (key: string) => {
      if (key === "advantageBusiness") {
        return affiliateInfo[key]?.split(",") || [];
      } else {
        return affiliateInfo[key]
          ? affiliateInfo[key].map((i) =>
              key === "routeList" ? i.name : i.cnName,
            )
          : [];
      }
    },
    [affiliateInfo],
  );

  const AdvantageOptions: AdvantageOptionsType[] = [
    {
      label: "优势业务",
      value: getValueByKey("advantageBusiness"),
      key: "advantageBusiness",
      jumpUrl:
        "/pages/affiliate/editAffiliateAdvantage/index?type=business&name=优势业务&changeType=choose",
    },
    {
      label: "优势起运港",
      value: getValueByKey("porList"),
      key: "porList",
      jumpUrl:
        "/pages/affiliate/editAffiliateAdvantage/index?type=por&name=优势起运港&changeType=choose",
    },
    {
      label: "优势目的港",
      value: getValueByKey("fndList"),
      key: "fndList",
      jumpUrl:
        "/pages/affiliate/editAffiliateAdvantage/index?type=fnd&name=优势目的港&changeType=choose",
    },
    {
      label: "优势航线",
      value: getValueByKey("routeList"),
      key: "routeList",
      jumpUrl:
        "/pages/affiliate/editAffiliateAdvantage/index?type=route&name=优势航线&changeType=choose",
    },
    {
      label: "优势船东",
      value: getValueByKey("carrierList"),
      key: "carrierList",
      jumpUrl:
        "/pages/affiliate/editAffiliateAdvantage/index?type=carrier&name=优势船东&changeType=choose",
    },
  ];

  useDidShow(() => {
    getAffiliateInfo();
    setUserInfo({
      ...userInfo,
      ...Taro.getStorageSync("userInfo"),
    });
  });

  const getAffiliateInfo = async () => {
    Taro.showLoading({
      title: "加载中",
    });
    const companyId = Taro.getStorageSync("userInfo")?.companyId;
    try {
      Promise.all([
        getAffiliateInfoDetail(companyId),
        getMemberUnitCustomerList({
          companyId: companyId || "",
        }),
        getMemberUnitImage({ companyId: companyId || "" }),
      ]).then((res: any) => {
        setAffiliateInfo(res[0] || {});
        setCustomerList(
          res[1].filter(
            (i) => i.phone !== Taro.getStorageSync("userInfo")?.phone || "",
          ) ?? [],
        );
        setImageList(res[2] ?? []);
      });
      setTimeout(function () {
        Taro.hideLoading();
      }, 2000);
    } catch (err) {
      console.log(err);
      setTimeout(function () {
        Taro.hideLoading();
      }, 2000);
    }
  };

  const editCustomer = (item?: affiliateMemberType) => {
    Taro.navigateTo({
      url:
        "/pages/affiliate/editCustomer/index?info=" +
        JSON.stringify(item ? item : {}),
    });
  };

  const jumpToAdvantage = (url: string) => {
    if (!userInfo.companyMaster) return;
    Taro.navigateTo({ url });
    // Taro.setStorageSync("advantageSelected", "");
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
                companyId: affiliateInfo.id || "",
              });
              const result: any = await getMemberUnitImage({
                companyId: affiliateInfo.id || "",
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

  return (
    <View className="affiliate">
      <View className="affiliate-baseInfo">
        <View
          className="affiliate-baseInfo-title"
          onClick={() =>
            userInfo.companyMaster &&
            Taro.navigateTo({
              url:
                "/pages/affiliate/editAffiliateBase/index?id=" +
                affiliateInfo.id,
            })
          }
        >
          企业基本信息
          {userInfo.companyMaster && (
            <View className="inline-flex edit">
              <Text>编辑</Text>
              <Image src={ArrowRight} className="arrow-icon" />
            </View>
          )}
        </View>
        <View className="affiliate-baseInfo-content">
          <View className="inline-flex">
            <Image
              src={affiliateInfo?.logoPath ?? DefaultLogo}
              className="logo"
            />
            <Text
              className="gray"
              style={{ fontWeight: 600, fontSize: "32rpx" }}
            >
              {affiliateInfo.name ?? "未填写"}
            </Text>
          </View>
          <View
            className="inline-flex"
            style={{ whiteSpace: "nowrap", marginTop: "24rpx" }}
          >
            <View>
              成立时间：
              <Text className="gray">
                {affiliateInfo.establishmentDate ?? "未填写"}
              </Text>
            </View>
            <View style={{ marginLeft: "80rpx" }}>
              联系电话：
              <Text className="gray">
                {affiliateInfo.contactPhone ?? "未填写"}
              </Text>
            </View>
          </View>
          <View style={{ margin: "24rpx 0" }}>
            邮箱：
            <Text className="gray">{affiliateInfo.email ?? "未填写"}</Text>
          </View>
          <View>
            地址：
            <Text className="gray">{affiliateInfo.address ?? "未填写"}</Text>
          </View>
        </View>
        <View className="affiliate-baseInfo-content">
          <View className="affiliate-baseInfo-remark">企业简介：</View>
          <View>
            <Text className="gray">
              {affiliateInfo.enterpriseDescription ?? "未填写"}
            </Text>
          </View>
        </View>
      </View>
      <View className="affiliate-baseInfo">
        <View className="affiliate-baseInfo-title">业务信息标签</View>
        {AdvantageOptions.map((item) => (
          <>
            <View
              className="affiliate-baseInfo-advantage"
              onClick={() => jumpToAdvantage(item.jumpUrl)}
            >
              <Text>{item.label}</Text>
              {userInfo.companyMaster && (
                <View className="inline-flex edit">
                  <Text>编辑</Text>
                  <Image src={ArrowRight} className="arrow-icon" />
                </View>
              )}
            </View>
            <View
              className="flex-wrap"
              style={{ padding: "0 24rpx" }}
              key={item.key}
            >
              {item.value.map((item) => (
                <View className="affiliate-baseInfo-advantage-tag" key={item}>
                  <Text>{item}</Text>
                </View>
              ))}
            </View>
          </>
        ))}
      </View>
      <View className="affiliate-baseInfo">
        <View
          className="affiliate-baseInfo-title"
          onClick={() =>
            userInfo.companyMaster &&
            Taro.navigateTo({
              url:
                "/pages/affiliate/editAffiliateImage/index?id=" +
                affiliateInfo.id,
            })
          }
        >
          企业图鉴
          {userInfo.companyMaster && (
            <View className="inline-flex edit">
              <Text>编辑</Text>
              <Image src={ArrowRight} className="arrow-icon" />
            </View>
          )}
        </View>
        <View className="affiliate-baseInfo-image">
          <View className="upload" onClick={() => changeImage()}>
            <Image src={UploadIcon} className="icon" />
            <Text>点击上传</Text>
          </View>
          {imageList.map((item) => (
            <Image
              src={item.imagePath || ""}
              className="image"
              mode="aspectFit"
              key={item.imagePath}
            />
          ))}
        </View>
      </View>
      <View className="affiliate-baseInfo">
        <View className="affiliate-baseInfo-title">
          企业成员
          <View className="inline-flex" onClick={() => editCustomer()}>
            <Image src={Edit} className="edit-icon" />
            <Text style={{ color: "#167fff" }} className="text-normal">
              增加成员
            </Text>
          </View>
        </View>
        {customerList.map((item) => (
          <View className="affiliate-baseInfo-member" key={item.name}>
            <View className="inline-flex">
              <Image src={item.avatarPath ?? Avatar} className="avatar" />
              <View className="flex-col">
                <Text>
                  {item.name}
                  <Text className="job">{item.position}</Text>
                </Text>
                <Text>电话：{item.phone}</Text>
              </View>
            </View>
            <View
              className="inline-flex edit"
              onClick={() => editCustomer(item)}
            >
              <Text>编辑</Text>
              <Image src={ArrowRight} className="arrow-icon" />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Affiliate;
