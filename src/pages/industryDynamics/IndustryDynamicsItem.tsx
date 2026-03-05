import { View, Text, Image } from "@tarojs/components";
import { IndustryNewsDetailType } from "../../service/industry-trends/industry-trendsModel";
import Taro from "@tarojs/taro";
import { previewImage } from "../../utils/tools";

const IndustryDynamicsItem: React.FC<{
  item: IndustryNewsDetailType;
}> = ({ item }) => {
  const handleClick = (item: IndustryNewsDetailType) => {
    Taro.setStorageSync(
      item.url ? "url" : "content",
      item.url ? item.url : JSON.stringify(item.content),
    );
    Taro.setStorageSync("wxTitle", item.title);
    Taro.navigateTo({
      url: `/pages/webview/index?content=${item.url ? item.url : item.content}&type=${
        item.url ? "website" : "markdown"
      }&title=${item.title}`,
    });
  };
  return (
    <View
      key={item.id}
      className="flex items-center mb-[32rpx] font-semibold text-[28px] text-[#303133]"
    >
      <Image
        src={item.mainImagePath}
        className="max-w-[200px] h-[148px] mr-[20px]"
        mode="aspectFill"
        onClick={() => previewImage(item.mainImagePath, [item.mainImagePath])}
      />
      <View className="flex flex-col" onClick={() => handleClick(item)}>
        <Text className="line-clamp-2">{item.title}</Text>
        <View className="flex items-center text-[28px] font-normal text-[#909399]">
          <Text className="text-[#ff6632] mb-[8px]">{item.groupName}</Text>
          <Text className="ml-[12px]">{item.updateTime}</Text>
        </View>
      </View>
    </View>
  );
};

export default IndustryDynamicsItem;
