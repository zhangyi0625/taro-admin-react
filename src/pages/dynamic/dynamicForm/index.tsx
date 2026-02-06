import { View, Textarea, Button } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { useState } from "react";
import "./index.scss";
import Taro from "@tarojs/taro";
import {
  replyCustomerMessage,
  submitCustomerMessage,
} from "../../../service/dynamic/dynamicApi";

const dynamicForm = () => {
  const [customerId, setCustomerId] = useState<string>("");

  const [isReply, setIsReply] = useState<boolean>(false);

  const [dynamicFormInfo, setDynamicFormInfo] = useState<{
    content: string;
  }>({
    content: "",
  });
  useLoad((options) => {
    console.log(options, "options");
    if (options?.type === "reply") {
      setCustomerId(options.id || "");
      setIsReply(true);
    } else {
      setCustomerId(options.id || "");
      setIsReply(false);
    }
    setDynamicFormInfo({ content: "" });
  });

  const saveDynamicForm = async () => {
    if (!dynamicFormInfo.content) {
      Taro.showToast({
        title: "请输入留言内容",
        icon: "none",
      });
      return;
    }
    try {
      const res: any = isReply
        ? await replyCustomerMessage({
            id: customerId,
            replyContent: dynamicFormInfo.content,
          })
        : await await submitCustomerMessage({
            receiverId: customerId,
            content: dynamicFormInfo.content,
          });
      if (res.code === 200) {
        Taro.showToast({
          title: isReply ? "回复成功" : "提交成功",
          icon: "success",
        });
        setTimeout(() => {
          Taro.navigateBack();
        }, 2000);
      }
    } catch (error) {
      Taro.showToast({
        title: error.errMsg || "无法给自己留言",
        icon: "none",
      });
    }
  };
  return (
    <View className="dynamicForm">
      <View className="dynamicForm-form">
        <View className="dynamicForm-form-item">
          <Textarea
            value={dynamicFormInfo.content}
            onInput={(e) =>
              setDynamicFormInfo({
                ...dynamicFormInfo,
                content: e.detail.value,
              })
            }
            style={{ height: "552rpx" }}
            placeholder="请输入你的留言内容"
            className="dynamicForm-form-item-textarea"
          />
        </View>
      </View>
      <Button className="dynamicForm-btn" onClick={saveDynamicForm}>
        发送
      </Button>
    </View>
  );
};

export default dynamicForm;
