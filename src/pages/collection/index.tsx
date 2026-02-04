import { View, Text, Image } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { useState } from "react";
import "./index.scss";
import CollectionItem from "./CollectionItem";
import { MemberUnitDetailType } from "../../service/memberUnit/memberUnitModel";
import { getFavoriteCompanyList } from "../../service/collection/collectionApi";

const Collection: React.FC = () => {
  const [collection, setCollection] = useState<Partial<MemberUnitDetailType>[]>(
    [],
  );

  useDidShow(() => {
    init();
  });

  const init = async () => {
    Taro.showLoading({
      title: "加载中",
    });
    try {
      const res: any = await getFavoriteCompanyList();
      setCollection(res ?? []);
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
