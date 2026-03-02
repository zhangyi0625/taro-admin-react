import { View, Image, Text } from "@tarojs/components";
import type { MemberUnitDetailType } from "../../service/memberUnit/memberUnitModel";
import DefaultLogo from "../../images/icon/default-logo.svg";
import { levelOptions, memberUnitLevelOptions } from "../index/config";
import Taro from "@tarojs/taro";
import { previewImage } from "../../utils/tools";

export type CollectionItemProps = {
  item: MemberUnitDetailType;
};

const CollectionItem: React.FC<CollectionItemProps> = ({ item }) => {
  return (
    <View
      key={item.id}
      className="bg-[#ffffff] py-[38px] px-[24px] border-b-[1px] border-[#edeff2]"
    >
      <View
        className="flex items-center"
        onClick={() =>
          Taro.navigateTo({
            url: "/pages/memberUnit/memberUnitDetail/index?id=" + item.id,
          })
        }
      >
        <Image
          className="w-[112rpx] h-[112rpx] mr-[20px]"
          mode="aspectFill"
          // style={{ borderRadius: "12rpx" }}
          src={item.logoPath ?? DefaultLogo}
        />
        <View className="flex flex-col">
          <Text className="text-[32px] font-semibold">{item.name}</Text>
          <View className="flex items-center" key={item.name}>
            <Image
              src={
                levelOptions.find((i) => i.value === item?.memberLevel)?.icon
              }
              className="w-[86rpx] h-[36rpx] mr-[8rpx]"
            />
            <Text className="text-[26px] text-[#909399] mt-[8px] font-normal">
              {memberUnitLevelOptions.find((i) => i.value === item?.unitLevel)
                ?.label || ""}
            </Text>
          </View>
        </View>
      </View>
      {item.advantageBusiness && (
        <View
          className="grid grid-cols-5 gap-[8px]"
          style={{ margin: "32px 0 20px" }}
        >
          {item.advantageBusiness.split(",")?.map((content: string) => (
            <View
              key={content}
              className="text-[26px] font-normal text-[#ff6632] px-[12px] py-[10px] text-center rounded-[14px] bg-[#fff0eb] whitespace-nowrap"
            >
              {content}
            </View>
          ))}
        </View>
      )}
      <View className="grid grid-cols-3 gap-[8px]">
        {item.images?.slice(0, 3)?.map((img) => (
          <View key={img.id} className="w-full h-[164rpx]">
            <Image
              className="w-full h-full"
              src={img.imagePath}
              mode="aspectFill"
              onClick={() =>
                previewImage(
                  img.imagePath,
                  item.images.slice(0, 3).map((i) => i.imagePath),
                )
              }
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default CollectionItem;
