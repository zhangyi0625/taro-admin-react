import { View, Text, Image } from "@tarojs/components";
import "./index.scss";
import { useState } from "react";
import Taro, { useLoad } from "@tarojs/taro";
import { getCustomerMessageList } from "../../service/dynamic/dynamicApi";
import AvatarIcon from "../../images/icon/avatar.svg";

const Dynamic: React.FC = () => {
  const [dynamic, setDynamic] = useState<any>([]);

  const [direction, setDirection] = useState<number>(1);

  useLoad((options) => {
    init(options.direction || "");
    setDirection(Number(options.direction || 1));
    Taro.setNavigationBarTitle({
      title: Number(options.direction) === 1 ? "发出的留言" : "收到的留言",
    });
  });

  const init = async (direction?: number) => {
    Taro.showLoading({
      title: "加载中",
    });
    try {
      const res: any = await getCustomerMessageList({
        direction: Number(direction),
      });
      setDynamic(res || []);
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
            <Image
              className="dynamic-item-avatar"
              src={
                direction === 1
                  ? (item.receiverAvatar ?? AvatarIcon)
                  : (item.senderAvatar ?? AvatarIcon)
              }
            />
            <View className="flex-col">
              <View>
                {direction === 2 ? item.senderName : item.receiverName}
                <Text style={{ color: "##FA8C16", marginLeft: "12rpx" }}>
                  {direction === 2
                    ? item.senderPosition
                    : item.receiverPosition}
                </Text>
              </View>
              <View
                className="dynamic-item-time"
                style={{ marginBottom: "none" }}
              >
                {direction === 2
                  ? item.senderCompanyName
                  : item.receiverCompanyName}
              </View>
            </View>
          </View>
          {direction === 2 && (
            <View className="dynamic-item-phone">电话：{item.senderPhone}</View>
          )}
          <View className="dynamic-item-content">{item.content}</View>
          <View className="dynamic-item-time">时间：{item.createTime}</View>
        </View>
      ))}
    </View>
  );
};

export default Dynamic;
