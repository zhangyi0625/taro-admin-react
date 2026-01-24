import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Text, Image } from "@tarojs/components";
import { add, minus, asyncAdd } from "../../actions/counter";
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
import V1 from "../../images/icon/v2.png";
import V2 from "../../images/icon/v2.png";
import V3 from "../../images/icon/v3.png";
import V4 from "../../images/icon/v4.png";
import V5 from "../../images/icon/v5.png";

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number;
  };
};

type PageDispatchProps = {
  add: () => void;
  dec: () => void;
  asyncAdd: () => any;
};

type PageOwnProps = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Index {
  props: IProps;
}

type indexFunItemsType = {
  title: string;
  icon: string;
  url: string;
};

const Index: React.FC = () => {
  const dispatch = useDispatch();

  const counter = useSelector((state) => state.counter);

  const levelOptions = [V1, V2, V3, V4, V5];

  const [memberUnit, setMemberUnit] = useState<any>([
    {
      name: "浙江中外运有限公司",
      level: 5,
      logo: "",
    },
    {
      name: "宁波港东南物流集团有限公司",
      level: 4,
      logo: "",
    },
    {
      name: "宁波外运国际集装箱货运有限公司",
      level: 3,
      logo: "",
    },
    {
      name: "宁波中远海运物流有限公司",
      level: 2,
      logo: "",
    },
  ]);

  const FunItemsOptions: indexFunItemsType[] = [
    {
      title: "协会概况",
      icon: ArrowRight,
      url: "/pages/message/index",
    },
    {
      title: "入会申请",
      icon: ArrowRight,
      url: "/pages/affiliate/index",
    },
    {
      title: "咨询热线",
      icon: ArrowRight,
      url: "/pages/collection/index",
    },
  ];

  // 可以使用所有的 React Hooks
  useEffect(() => {
    console.log("useEffect");
    init();
  }, []);

  const init = async () => {
    try {
      const res = await Taro.request({
        url: "https://www.zaicang.net/api/customer/query/rights/base/module?module=REALTIME_RATE",
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
      });
      setMemberUnit(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 对应 onReady
  useReady(() => {
    console.log("useReady");
  });

  // 对应 onShow
  useDidShow(() => {
    console.log("useDidShow");
  });

  // 对应 onHide
  useDidHide(() => {
    console.log("useDidHide");
  });

  // Taro 对所有小程序页面生命周期都实现了对应的自定义 React Hooks 进行支持
  // 详情可查阅：【Hooks】
  usePullDownRefresh(() => {
    console.log("usePullDownRefresh");
  });

  return (
    <View className="index">
      <View className="index-title">
        <View className="index-banner">
          <Image src={BannerImg} className="banner" />
        </View>
        <View className="index-function">
          {FunItemsOptions.map((item) => (
            <View className="index-function-item" key={item.title}>
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
            onClick={() => Taro.navigateTo({ url: "/pages/memberUnit/index" })}
          >
            更多
            <Image src={ArrowRight} className="arrow-icon" />
          </View>
        </View>
        <View className="index-memberUnit-content">
          {memberUnit.map((item) => (
            <View className="index-memberUnit-item" key={item.name}>
              <Image src={item.logo} className="logo" />
              <View className="index-memberUnit-item-name">
                <Text>{item.name}</Text>
                <Text className="index-memberUnit-item-level" key={item.name}>
                  <Image src={levelOptions[item.level - 1]} className="level" />
                  <Text className="level-text">{item.level}</Text>
                </Text>
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
            onClick={() => Taro.navigateTo({ url: "/pages/memberUnit/index" })}
          >
            更多
            <Image src={ArrowRight} className="arrow-icon" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Index;
