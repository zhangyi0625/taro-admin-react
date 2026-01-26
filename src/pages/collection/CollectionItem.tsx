import { View, Image, Text } from "@tarojs/components";
import type { MemberUnitDetailType } from "../../service/memberUnit/memberUnitModel";
import V1 from "../../images/icon/v2.png";
import V2 from "../../images/icon/v2.png";
import V3 from "../../images/icon/v3.png";
import V4 from "../../images/icon/v4.png";
import V5 from "../../images/icon/v5.png";
import DefaultLogo from "../../images/icon/default-logo.svg";
import "./index.scss";

export type CollectionItemProps = {
  item: MemberUnitDetailType;
};

const CollectionItem: React.FC<CollectionItemProps> = ({ item }) => {
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
    <View key={item.id} className="collection-item">
      <View className="inline-flex">
        <Image
          className="collection-item-logo"
          src={item.logo ?? DefaultLogo}
        />
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
        {item.content?.map((content: string) => (
          <View key={content} className="collection-item-content-tag">
            {content}
          </View>
        ))}
      </View>
      <View className="collection-item-img">
        {item.imgList?.map((img: string) => (
          <View key={img} className="collection-item-img-item">
            <Image style={{ width: "100%", height: "100%" }} src={img} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default CollectionItem;
