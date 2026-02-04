import { View, WebView } from "@tarojs/components";
import "./index.scss";
import Taro, { useLoad } from "@tarojs/taro";
import { useState } from "react";

const Webview: React.FC = () => {
  const [type, setType] = useState<"website" | "markdown">("website");

  const [content, setContent] = useState<string>("https://mp.weixin.qq.com/");
  useLoad((options) => {
    setType(options.type as "website" | "markdown");
    setContent(options.content);
    Taro.setNavigationBarTitle({
      title: options.title,
    });
    console.log(options, "options", type, content);
  });
  return (
    <View className="webview">
      {type === "website" && <WebView src={content} />}
      {type === "markdown" && (
        <View dangerouslySetInnerHTML={{ __html: content }}></View>
      )}
    </View>
  );
};

export default Webview;
