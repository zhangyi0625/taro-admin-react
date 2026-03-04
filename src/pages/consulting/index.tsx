import { View, Image, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import clsx from "clsx";
import ConsultingBg from "../../images/consulting-bg.png";

const Consulting: React.FC = () => {
  const phoneNumber = "0574-87292367";

  const btnClass = clsx({
    "w-full": true,
    "h-[88px]": true,
    "bg-[#1677ff]": true,
    "text-[#ffffff]": true,
    "font-bold": true,
    "text-[32px]": true,
    "text-center": true,
    "py-[6px]": true,
  });
  return (
    <View className="h-full bg-[#ffffff]" style={{ padding: "20rpx 0 80rpx" }}>
      <View style={{ margin: "240rpx 112rpx 0" }}>
        <Image className="w-[526px] h-[360px]" src={ConsultingBg} />
        <View className="text-[32px] font-semibold text-[#303133] py-[40px] text-center">
          服务热线：{phoneNumber}
        </View>
        <Button
          className={btnClass}
          onClick={() => Taro.makePhoneCall({ phoneNumber: phoneNumber })}
        >
          立即咨询
        </Button>
      </View>
    </View>
  );
};
export default Consulting;
