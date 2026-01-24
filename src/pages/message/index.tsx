import { View, Text } from "@tarojs/components";

const Message: React.FC = () => {
  return (
    <View className="message">
      <View className="message-title">
        <Text>我的信息</Text>
      </View>
    </View>
  );
};

export default Message;
