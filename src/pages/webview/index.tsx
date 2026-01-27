import { View, WebView } from "@tarojs/components";
import "./index.scss";

const Webview: React.FC = () => {
  return (
    <View className="webview">
      <WebView src="https://www.baidu.com" />
    </View>
  );
};

export default Webview;
