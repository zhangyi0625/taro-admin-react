import { View, Text, Image, Button } from "@tarojs/components";
import "./index.scss";
import ConsultingBg from "../../images/consulting-bg.png";
import Taro from "@tarojs/taro";

const Consulting: React.FC = () => {
  const phoneNumber = "0574-87292367";
  return (
    <View className="consulting">
      <View className="consulting-content">
        <Image className="bg" src={ConsultingBg} />
        <View className="phone">服务热线：{phoneNumber}</View>
        <Button
          className="btn"
          onClick={() => Taro.makePhoneCall({ phoneNumber: phoneNumber })}
        >
          立即咨询
        </Button>
      </View>
    </View>
  );
};
export default Consulting;
