import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import "./index.scss";
import V1 from "../../images/icon/v2.png";
import V2 from "../../images/icon/v2.png";
import V3 from "../../images/icon/v3.png";
import V4 from "../../images/icon/v4.png";
import V5 from "../../images/icon/v5.png";

type CollectionType = {
  level: string;
  content: string[] | null;
  imgList: string[] | null;
  unit: string;
  name: string;
  logo: string | null;
};

const Collection: React.FC = () => {
  const [collection, setCollection] = useState<Partial<CollectionType>[]>([
    {
      level: V1,
      name: "浙江中外运有限公司",
      logo: null,
      unit: "会长单位",
      content: [
        "海运整箱",
        "航空运输",
        "集卡陆运",
        "冷冻箱",
        "项目物流",
        "多式联运",
        "欧亚铁路",
      ],
      imgList: [""],
    },
    {
      level: V4,
      name: "宁波港东南物流集团有限公司",
      logo: null,
      unit: "副会长单位",
      content: ["海运整箱", "航空运输", "集卡陆运", "冷冻箱", "项目物流"],
      imgList: ["1", "2", "3"],
    },
  ]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    Taro.showLoading({
      title: "加载中",
    });
    try {
      const res = await Taro.request({
        url: "/api/collection/query",
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
      });
      setCollection(res.data ?? []);
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

  const getLevel = (level: string) => {
    switch (level) {
      case V1:
        return V1;
      case V2:
        return V2;
      case V3:
        return V3;
      case V4:
        return V4;
      case V5:
        return V5;
      default:
        return V1;
    }
  };

  return (
    <View className="collection">
      {collection.map((item: any) => (
        <View key={item.id} className="collection-item">
          <View className="inline-flex">
            <Image className="collection-item-logo" src={item.logo} />
            <View className="flex-col">
              <View>{item.name}</View>
              <View className="inline-flex">
                <Image
                  className="collection-item-level"
                  src={getLevel(item.level)}
                />
                <Text className="collection-item-level-text">{item.unit}</Text>
              </View>
            </View>
          </View>
          <View className="collection-item-content">
            {item.content.map((content: string) => (
              <View key={content} className="collection-item-content-tag">
                {content}
              </View>
            ))}
          </View>
          <View className="collection-item-img">
            {item.imgList.map((img: string) => (
              <View key={img} className="collection-item-img-item">
                <Image className="collection-item-img-img" src={img} />
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default Collection;
