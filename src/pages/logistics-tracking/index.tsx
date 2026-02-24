import { View, Input, Image, Text } from "@tarojs/components";
import { useState } from "react";
import "./index.scss";
import ArrowRight from "../../images/icon/arrow-icon.svg";
import { useDidHide, useDidShow } from "@tarojs/taro";
import Taro from "@tarojs/taro";
import {
  getLogisticsTrackingList,
  getLogisticsTrackingQuery,
} from "../../service/logistics-tracking/logistics-trackingApi";
import clearIcon from "../../images/icon/clear-icon.png";

const LogisticsTracking = () => {
  const [startPort, setStartPort] = useState<any>({});

  const [orderNo, setOrderNo] = useState("");

  const [logisticsTracking, setLogisticsTracking] = useState<any>([]);

  useDidShow(() => {
    let info = Taro.getStorageSync("porSelected");
    // setStartPort(info?.advantagePor || "");
    // setOrderNo(info?.advantageFnd || "");
    console.log(info, "info");
    setStartPort(info ?? {});
    init();
  });

  const init = async () => {
    Taro.showLoading({
      title: "加载中",
    });
    try {
      const resp: any = await getLogisticsTrackingList();
      setLogisticsTracking(resp ?? []);
      Taro.hideLoading();
    } catch (err) {
      Taro.hideLoading();
      console.log(err);
    }
  };
  useDidHide(() => {
    setTimeout(() => {
      Taro.removeStorageSync("porSelected");
    }, 2000);
  });

  const onSearch = async () => {
    if (!startPort.code) {
      Taro.showToast({
        title: "请选择起运港",
        icon: "none",
      });
      return;
    }
    if (!orderNo) {
      Taro.showToast({
        title: "提单号/箱号格式错误，请输入正确的提单号",
        icon: "none",
      });
      return;
    }

    try {
      await getLogisticsTrackingQuery({
        number: orderNo,
        place: startPort.code,
        ieflag: "E",
      });
      init();
    } catch (err) {
      console.log(err);
      Taro.showToast({
        title: err.message || "查询失败",
        icon: "none",
      });
    }
  };

  const changePort = () => {
    Taro.setStorageSync("isOther", "true");
    Taro.navigateTo({
      url: "/pages/affiliate/editAffiliateAdvantage/index?type=por&name=优势起运港&changeType=search&isOther=true",
    });
  };
  return (
    <>
      <View className="logistics-tracking">
        <View className="logistics-tracking-search">
          <View className="search-item">
            <Input
              className="input-item"
              data-type="1"
              disabled={true}
              placeholder="请选择起运港"
              type="text"
              onClick={() => changePort()}
              value={
                startPort.cnName
                  ? startPort.cnName + "-" + startPort.enName
                  : ""
              }
            />
            <View className="inline-flex">
              {startPort.cnName && (
                <Image
                  src={clearIcon}
                  className="clear-icon"
                  onClick={() => setStartPort({})}
                />
              )}
              <Image src={ArrowRight} className="arrow-icon" />
            </View>
          </View>
          <View className="search-item" style={{ marginTop: "20rpx" }}>
            <Input
              className="input-item"
              data-type="1"
              placeholder="请输入正确的提单号/箱号"
              type="text"
              value={orderNo}
              onInput={(e) => setOrderNo(e.detail.value)}
            />
          </View>
          <View className="btn" onClick={onSearch}>
            查询
          </View>
        </View>
        <View className="logistics-tracking-text">历史查询</View>
        {logisticsTracking.map((item) => (
          <View key="item.id" className="logistics-tracking-item">
            <View className="head">
              <Text>{item.number}</Text>
              <Text className="time">{item.updateTime}更新</Text>
            </View>
            <View className="content">
              <View className="flex-col content-item">
                <View className="inline-flex">
                  <View className="circle"></View>
                  <Text className="value">
                    {item.results[item.results.length - 1].state || ""}
                  </Text>
                </View>
                <Text className="name">
                  {item.results[item.results.length - 1].departureTime}
                </Text>
              </View>
              <View
                className="inline-flex"
                onClick={() =>
                  Taro.navigateTo({
                    url:
                      "/pages/logistics-tracking/logistics-tracking-detail/index?id=" +
                      item.id,
                  })
                }
              >
                详情
                <Image src={ArrowRight} className="arrow-icon" />
              </View>
            </View>
          </View>
        ))}
      </View>
    </>
  );
};

export default LogisticsTracking;
