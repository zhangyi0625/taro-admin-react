import { View, Text, Image } from "@tarojs/components";
import "./index.scss";
import ArrowRight from "../../images/icon/arrow-icon.svg";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";

export type AffiliateInfoType = {
  logo: string | null;
  name: string;
  position: string;
  remark: string;
  phone: string;
  email: string;
  address: string;
  establishedTime: string;
  businessAdvantage: string[] | null;
  porAdvantage: string[] | null;
  fndAdvantage: string[] | null;
  routeAdvantage: string[] | null;
  shippingAdvantage: string[] | null;
  affiliateImage: string[] | null;
  affiliateMember: affiliateMemberType[] | null;
};

export type affiliateMemberType = {
  logo: string | null;
  name: string;
  phone: string;
  job: string;
};

const Affiliate: React.FC = () => {
  const [affiliateInfo, setAffiliateInfo] = useState<
    Partial<AffiliateInfoType>
  >({
    logo: null,
    name: "",
    position: "",
    remark: "",
    phone: "",
    email: "",
    address: "",
    establishedTime: "",
    businessAdvantage: [
      "海运整箱",
      "航空运输",
      "集卡陆运",
      "冷冻箱",
      "项目物流",
      "多式联运",
      "欧亚铁路",
    ],
    porAdvantage: ["宁波", "上海", "青岛"],
    fndAdvantage: null,
    routeAdvantage: null,
    shippingAdvantage: null,
    affiliateImage: null,
    affiliateMember: [
      {
        logo: null,
        name: "何江",
        phone: "13088888888",
        job: "党委书记、总经理",
      },
      {
        logo: null,
        name: "先豪",
        phone: "13088888888",
        job: "党委书记、总经理",
      },
      {
        logo: null,
        name: "后莎姬",
        phone: "13088888888",
        job: "市场部经理",
      },
    ],
  });

  useEffect(() => {
    getAffiliateInfo();
  }, []);

  const getAffiliateInfo = async () => {
    Taro.showLoading({
      title: "加载中",
    });
    try {
      const res = await Taro.request({
        url: "/api/affiliate/query",
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
      });
      // setAffiliateInfo(res.data || {});
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

  const editAdvantage = (type: string) => {
    Taro.navigateTo({
      url: `/pages/affiliate/editAffiliateAdvantage/index?type=${type}`,
    });
  };
  return (
    <View className="affiliate">
      <View className="affiliate-baseInfo">
        <View
          className="affiliate-baseInfo-title"
          onClick={() =>
            Taro.navigateTo({ url: "/pages/affiliate/editAffiliateBase/index" })
          }
        >
          企业基本信息
          <View className="inline-flex edit">
            <Text>编辑</Text>
            <Image src={ArrowRight} className="arrow-icon" />
          </View>
        </View>
        <View className="affiliate-baseInfo-content">
          <View className="inline-flex">
            <Image src={affiliateInfo?.logo ?? ""} className="logo" />
            <Text>{affiliateInfo.name ?? "未填写"}</Text>
          </View>
          <View className="inline-flex">
            <View>成立时间：{affiliateInfo.position ?? "未填写"}</View>
            <View style={{ marginLeft: "120rpx" }}>
              联系电话：{affiliateInfo.phone ?? "未填写"}
            </View>
          </View>
          <View style={{ margin: "24rpx 0" }}>
            邮箱：{affiliateInfo.email ?? "未填写"}
          </View>
          <View>地址：{affiliateInfo.address ?? "未填写"}</View>
        </View>
        <View className="affiliate-baseInfo-content">
          <Text className="affiliate-baseInfo-remark">企业简介：</Text>
          <View>{affiliateInfo.remark ?? "未填写"}</View>
        </View>
      </View>
      <View className="affiliate-baseInfo">
        <View className="affiliate-baseInfo-title">业务信息标签</View>
        <View
          className="affiliate-baseInfo-advantage"
          onClick={() => editAdvantage("business")}
        >
          <Text>优势业务</Text>
          <View className="inline-flex edit">
            <Text>编辑</Text>
            <Image src={ArrowRight} className="arrow-icon" />
          </View>
        </View>
        <View className="flex-wrap" style={{ padding: "0 24rpx" }}>
          {affiliateInfo?.businessAdvantage?.map((item) => (
            <View className="affiliate-baseInfo-advantage-tag" key={item}>
              <Text>{item}</Text>
            </View>
          ))}
        </View>
        <View
          className="affiliate-baseInfo-advantage"
          onClick={() => editAdvantage("por")}
        >
          <Text>优势起运港</Text>
          <View className="inline-flex edit">
            <Text>编辑</Text>
            <Image src={ArrowRight} className="arrow-icon" />
          </View>
        </View>
        <View className="flex-wrap" style={{ padding: "0 24rpx" }}>
          {affiliateInfo?.porAdvantage?.map((item) => (
            <View className="affiliate-baseInfo-advantage-tag" key={item}>
              <Text>{item}</Text>
            </View>
          ))}
        </View>
        <View
          className="affiliate-baseInfo-advantage"
          onClick={() => editAdvantage("fnd")}
        >
          <Text>优势目的港</Text>
          <View className="inline-flex edit">
            <Text>编辑</Text>
            <Image src={ArrowRight} className="arrow-icon" />
          </View>
        </View>
        <View className="flex-wrap" style={{ padding: "0 24rpx" }}>
          {affiliateInfo?.fndAdvantage?.map((item) => (
            <View className="affiliate-baseInfo-advantage-tag" key={item}>
              <Text>{item}</Text>
            </View>
          ))}
        </View>
        <View
          className="affiliate-baseInfo-advantage"
          onClick={() => editAdvantage("route")}
        >
          <Text>优势航线</Text>
          <View className="inline-flex edit">
            <Text>编辑</Text>
            <Image src={ArrowRight} className="arrow-icon" />
          </View>
        </View>
        <View className="flex-wrap" style={{ padding: "0 24rpx" }}>
          {affiliateInfo?.routeAdvantage?.map((item) => (
            <View className="affiliate-baseInfo-advantage-tag" key={item}>
              <Text>{item}</Text>
            </View>
          ))}
        </View>
        <View
          className="affiliate-baseInfo-advantage"
          onClick={() => editAdvantage("shipping")}
        >
          <Text>优势船东</Text>
          <View className="inline-flex edit">
            <Text>编辑</Text>
            <Image src={ArrowRight} className="arrow-icon" />
          </View>
        </View>
        <View className="flex-wrap" style={{ padding: "0 24rpx" }}>
          {affiliateInfo?.shippingAdvantage?.map((item) => (
            <View className="affiliate-baseInfo-advantage-tag" key={item}>
              <Text>{item}</Text>
            </View>
          ))}
        </View>
      </View>
      <View className="affiliate-baseInfo">
        <View
          className="affiliate-baseInfo-title"
          onClick={() =>
            Taro.navigateTo({
              url: "/pages/affiliate/editAffiliateImage/index",
            })
          }
        >
          企业图鉴
          <View className="inline-flex edit">
            <Text>编辑</Text>
            <Image src={ArrowRight} className="arrow-icon" />
          </View>
        </View>
      </View>
      <View className="affiliate-baseInfo">
        <View className="affiliate-baseInfo-title">企业成员</View>
        {affiliateInfo?.affiliateMember?.map((item) => (
          <View className="affiliate-baseInfo-member" key={item.name}>
            <Image src={item.logo as string} className="avatar" />
            <View className="flex-col">
              <Text>
                {item.name}
                <Text className="job">{item.job}</Text>
              </Text>
              <Text>{item.phone}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Affiliate;
