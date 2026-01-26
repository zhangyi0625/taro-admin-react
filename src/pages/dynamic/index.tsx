import { View, Text, Image } from "@tarojs/components";
import "./index.scss";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";

const Dynamic: React.FC = () => {
  const [dynamic, setDynamic] = useState<any>(["1", "2"]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    Taro.showLoading({
      title: "加载中",
    });
    try {
      const res = await Taro.request({
        url: "/api/dynamic/query",
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
      });
      setDynamic(res.data || [""]);
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
  return (
    <View className="dynamic">
      {dynamic.map((item: any) => (
        <View key={item.id} className="dynamic-item">
          <View className="inline-flex">
            <Image className="dynamic-item-avatar" src={item.avatar} />
            <View className="flex-col">
              <View>
                后莎姬
                <Text style={{ color: "##FA8C16", marginLeft: "12rpx" }}>
                  市场部经理
                </Text>
              </View>
              <View
                className="dynamic-item-time"
                style={{ marginBottom: "none" }}
              >
                {"浙江中外运有限公司"}
              </View>
            </View>
          </View>
          <View className="dynamic-item-phone">电话：13188888888</View>
          <View className="dynamic-item-content">
            我们长期有电子产品需要发往美国，想了解一下贵司的海运和清关方案，不知您方便详细介绍一下吗？
          </View>
          <View className="dynamic-item-time">时间：2026-01-12 09:00:00</View>
        </View>
      ))}
    </View>
  );
};

export default Dynamic;
