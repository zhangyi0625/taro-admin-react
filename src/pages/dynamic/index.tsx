import { View, Text, Image, Textarea } from "@tarojs/components";
import "./index.scss";
import { useState } from "react";
import Taro, { useDidShow, useLoad } from "@tarojs/taro";
import IconEmpty from "../../images/icon/empty.svg";
import {
  getCustomerMessageList,
  replyCustomerMessage,
} from "../../service/dynamic/dynamicApi";
import AvatarIcon from "../../images/icon/avatar.svg";
import IconReply from "../../images/icon/reply.svg";
import CloseIcon from "../../images/icon/close-icon.svg";

const Dynamic: React.FC = () => {
  const [dynamic, setDynamic] = useState<any>([]);

  const [direction, setDirection] = useState<number>(1);

  // 回复弹窗相关状态
  const [replyVisible, setReplyVisible] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [currentItem, setCurrentItem] = useState<any>(null);

  useLoad((options) => {
    init(options.direction || "");
    setDirection(Number(options.direction || 1));
    Taro.setNavigationBarTitle({
      title: Number(options.direction) === 1 ? "发出的留言" : "收到的留言",
    });
  });

  useDidShow(() => {
    direction === 2 && init(2);
  });

  const init = async (direction?: number) => {
    Taro.showLoading({
      title: "加载中",
    });
    try {
      const res: any = await getCustomerMessageList({
        direction: Number(direction),
      });
      setDynamic(res || []);
      setTimeout(function () {
        Taro.hideLoading();
      }, 2000);
    } catch (err) {
      console.log(err);
      setTimeout(function () {
        Taro.hideLoading();
      }, 2000);
    }
  };

  // 打开回复弹窗
  const reply = (item: any) => {
    setCurrentItem(item);
    setReplyContent("");
    setReplyVisible(true);
  };

  // 发送回复
  const handleSendReply = async () => {
    if (!replyContent.trim()) {
      Taro.showToast({
        title: "请输入回复内容",
        icon: "none",
      });
      return;
    }

    Taro.showLoading({
      title: "发送中...",
    });

    try {
      await replyCustomerMessage({
        id: currentItem.id,
        replyContent: replyContent,
      });

      // 更新本地列表
      setDynamic((prev) =>
        prev.map((item: any) => {
          if (item.id === currentItem.id) {
            return { ...item, replyContent };
          }
          return item;
        }),
      );

      setReplyVisible(false);
      setReplyContent("");
      setCurrentItem(null);

      Taro.showToast({
        title: "回复成功",
        icon: "success",
      });
    } catch (error) {
      console.error("回复失败:", error);
      Taro.showToast({
        title: "回复失败，请重试",
        icon: "none",
      });
    } finally {
      Taro.hideLoading();
    }
  };
  return (
    <View className="dynamic">
      {dynamic.length ? (
        <>
          {dynamic.map((item: any) => (
            <View key={item.id} className="dynamic-item">
              <View className="inline-flex">
                <Image
                  className="dynamic-item-avatar"
                  src={
                    direction === 1
                      ? (item.receiverAvatar ?? AvatarIcon)
                      : (item.senderAvatar ?? AvatarIcon)
                  }
                />
                <View className="flex-col">
                  <View>
                    {direction === 2 ? item.senderName : item.receiverName}
                    <Text style={{ color: "#FA8C16", marginLeft: "12rpx" }}>
                      {direction === 2
                        ? item.senderPosition
                        : item.receiverPosition}
                    </Text>
                  </View>
                  <View
                    className="dynamic-item-time"
                    style={{ marginBottom: "none" }}
                  >
                    {direction === 2
                      ? item.senderCompanyName
                      : item.receiverCompanyName}
                  </View>
                </View>
              </View>
              {direction === 2 && (
                <View className="dynamic-item-phone">
                  电话：{item.senderPhone}
                </View>
              )}
              <View className="dynamic-item-content">{item.content}</View>
              <View className="dynamic-item-time">时间：{item.createTime}</View>
              {direction === 2 && !item.replyContent && (
                <View
                  className="inline-flex"
                  style={{ justifyContent: "flex-end", marginTop: "12rpx" }}
                >
                  <View
                    className="dynamic-item-btn"
                    onClick={() => reply(item)}
                  >
                    <Image className="icon" src={IconReply} />
                    回复
                  </View>
                </View>
              )}
              {item.replyContent && (
                <View className="dynamic-item-replyContent">
                  <View>{direction === 2 ? "我的回复" : "对方的回复"}</View>
                  <View className="text-normal">{item.replyContent}</View>
                </View>
              )}
            </View>
          ))}
        </>
      ) : (
        <View className="flex-col flex items-center text-[#909399] pt-[200px]">
          <Image
            src={IconEmpty}
            mode="aspectFill"
            className="w-[190px] h-[200px] mb-[20px]"
          ></Image>
          暂无数据
        </View>
      )}

      {/* 回复弹窗 */}
      {replyVisible && (
        <View className="reply-modal">
          <View
            className="reply-modal-overlay"
            onClick={() => setReplyVisible(false)}
          />
          <View className="reply-modal-content">
            <View className="reply-modal-header">
              <Text className="reply-modal-title">
                回复
                {direction === 2
                  ? currentItem?.senderName
                  : currentItem?.receiverName}
              </Text>
              <Image
                className="reply-modal-close"
                src={CloseIcon}
                onClick={() => setReplyVisible(false)}
              />
            </View>
            <Textarea
              className="reply-modal-input"
              placeholder="请输入回复内容"
              value={replyContent}
              onInput={(e) => setReplyContent(e.detail.value)}
            />
            <View className="reply-modal-footer">
              <View className="reply-modal-send" onClick={handleSendReply}>
                发送
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Dynamic;
