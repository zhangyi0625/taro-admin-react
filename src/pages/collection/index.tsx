import { View, Image } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { useState } from "react";
import "./index.scss";
import CollectionItem from "./CollectionItem";
import IconEmpty from "../../images/icon/empty.svg";
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
      {collection.length ? (
        <>
          {collection.map((item: MemberUnitDetailType) => (
            <CollectionItem key={item.id} item={item} />
          ))}
        </>
      ) : (
        <View className="flex-col flex items-center text-[#909399] pt-[200px]">
          <Image
            src={IconEmpty}
            mode="aspectFill"
            className="w-[190px] h-[200px] mb-[20px]"
          ></Image>
          暂无数据
        </View>
      )}
    </View>
  );
};

export default Collection;
