import { View, Image, Text } from "@tarojs/components";
import type { MemberUnitDetailType } from "../../service/memberUnit/memberUnitModel";
import DefaultLogo from "../../images/icon/default-logo.svg";
import "./index.scss";
import { levelOptions, memberUnitLevelOptions } from "../index/config";
import { useCallback } from "react";
import Taro from "@tarojs/taro";

export type CollectionItemProps = {
  item: MemberUnitDetailType;
};

const CollectionItem: React.FC<CollectionItemProps> = ({ item }) => {
  const getImageList = useCallback(() => {
    return item.images ? item.images.map((i) => i.id) : [];
  }, [item.images]);

  const previewImage = (imagePath: string) => {
    Taro.previewImage({
      urls: [imagePath],
      current: imagePath,
    });
  };
  return (
    <View
      key={item.id}
      className="collection-item"
      onClick={() =>
        Taro.navigateTo({
          url: "/pages/memberUnit/memberUnitDetail/index?id=" + item.id,
        })
      }
    >
      <View className="inline-flex">
        <Image
          className="collection-item-logo"
          src={item.logoPath ?? DefaultLogo}
        />
        <View className="collection-item-name">
          <Text>{item.name}</Text>
          <View className="inline-flex" key={item.name}>
            <Image
              src={
                levelOptions.find((i) => i.value === item?.memberLevel)?.icon
              }
              className="collection-item-level"
            />
            <Text className="collection-item-level-text">
              {memberUnitLevelOptions.find((i) => i.value === item?.unitLevel)
                ?.label || ""}
            </Text>
          </View>
        </View>
      </View>
      {item.advantageBusiness && (
        <View className="collection-item-content">
          {item.advantageBusiness.split(",")?.map((content: string) => (
            <View key={content} className="collection-item-content-tag">
              {content}
            </View>
          ))}
        </View>
      )}
      <View className="collection-item-img">
        {item.images?.slice(0, 3)?.map((img) => (
          <View key={img.id} className="collection-item-img-item">
            <Image
              style={{ width: "100%", height: "100%" }}
              src={img.imagePath}
              mode="aspectFill"
              onClick={() => previewImage(img.imagePath)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default CollectionItem;
