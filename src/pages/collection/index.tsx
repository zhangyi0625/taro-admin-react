import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import "./index.scss";
import V1 from "../../images/icon/v2.png";
import V2 from "../../images/icon/v2.png";
import V3 from "../../images/icon/v3.png";
import V4 from "../../images/icon/v4.png";
import V5 from "../../images/icon/v5.png";
import CollectionItem from "./CollectionItem";
import { MemberUnitDetailType } from "../../service/memberUnit/memberUnitModel";

const Collection: React.FC = () => {
  const [collection, setCollection] = useState<Partial<MemberUnitDetailType>[]>(
    [
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
        imgList: [V1, V2],
      },
      {
        level: V4,
        name: "宁波港东南物流集团有限公司",
        logo: null,
        unit: "副会长单位",
        content: ["海运整箱", "航空运输", "集卡陆运", "冷冻箱", "项目物流"],
        imgList: [V1, V2, V3, V4, V5],
      },
    ],
  );

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

  return (
    <View className="collection">
      {collection.map((item: MemberUnitDetailType) => (
        <CollectionItem key={item.id} item={item} />
      ))}
    </View>
  );
};

export default Collection;
