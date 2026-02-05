import { View, WebView } from "@tarojs/components";
import "./index.scss";
import Taro, { useLoad } from "@tarojs/taro";
import { useState } from "react";

const Webview: React.FC = () => {
  const [type, setType] = useState<"website" | "markdown">("website");

  const [content, setContent] = useState<string>("https://mp.weixin.qq.com/");
  useLoad((options) => {
    setType(options.type as "website" | "markdown");
    // setContent(JSON.parse(options.content));
    if (options.type === "markdown") {
      let htmlContent = JSON.parse(Taro.getStorageSync("content"));
      // 查找并修改img或image标签，添加或修改mode属性为widthFix
      if (htmlContent && typeof htmlContent === "string") {
        // 直接使用字符串替换的方式，更简单可靠
        htmlContent = htmlContent
          .split("<img")
          .join(
            '<img mode="widthFix" height="auto" width="100%" height="auto"',
          );
        htmlContent = htmlContent
          .split("<image")
          .join(
            '<image mode="widthFix" height="auto" width="100%" height="auto"',
          );
        console.log(htmlContent, "htmlContent");
        setContent(htmlContent);
      }
      // setContent(htmlContent);
    } else {
      setContent(Taro.getStorageSync("url"));
    }
    Taro.setNavigationBarTitle({
      title: Taro.getStorageSync("wxTitle"),
    });
    console.log(options, "options", type, content);
  });
  return (
    <View className="webview">
      {type === "website" && <WebView src={content} />}
      {type === "markdown" && (
        <View
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: content }}
        ></View>
      )}
    </View>
  );
};

export default Webview;
