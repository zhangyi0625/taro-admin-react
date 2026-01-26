import { View, Text, Button, Input, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import "./index.scss";
import ArrowRight from "../../images/icon/arrow-icon.svg";

type paramsType = {
  logo?: string;
  name: string;
  phone?: string;
  email?: string;
  company?: string;
  position: string;
};

const Message: React.FC = () => {
  const [params, setParams] = useState<paramsType>({
    name: "",
    position: "",
  });

  const changeAvatar = () => {
    Taro.chooseImage({
      count: 1,
      success: (res) => {
        console.log(res);
        setParams({ ...params, logo: res.tempFilePaths[0] });
      },
    });
  };

  const saveMessage = async () => {
    if (!params.name) {
      Taro.showToast({
        title: "请输入姓名",
        icon: "none",
      });
      return;
    }
    if (!params.position) {
      Taro.showToast({
        title: "请输入职务",
        icon: "none",
      });
      return;
    }
    try {
      const res = await Taro.request({
        url: "/api/user/save",
        method: "POST",
        data: params,
      });
      Taro.showToast({
        title: "保存成功",
        icon: "success",
      });
    } catch (error) {
      Taro.showToast({
        title: "保存失败",
        icon: "none",
      });
    }
  };
  return (
    <View className="message">
      <View className="message-form">
        <View className="message-form-item">
          <Text className="message-form-item-label">头像</Text>
          <View
            className="inline-flex message-form-item-input"
            style={{ justifyContent: "space-between" }}
            onClick={changeAvatar}
          >
            {!params.logo ? (
              <View>
                <Input placeholder="修改" disabled={true} />
              </View>
            ) : (
              <Image
                className="message-form-item-avatar"
                src={params.logo as string}
              />
            )}
            <Image className="arrow-icon" src={ArrowRight} />
          </View>
        </View>
        <View className="message-form-item">
          <Text className="message-form-item-label">
            <Text style={{ color: "red" }}>*</Text>姓名
          </Text>
          <Input
            value={params.name}
            onInput={(e) => setParams({ ...params, name: e.detail.value })}
            className="message-form-item-input"
            placeholder="输入姓名"
          />
        </View>
        <View className="message-form-item">
          <Text className="message-form-item-label">
            <Text style={{ color: "red" }}>*</Text>职务
          </Text>
          <Input
            value={params.position}
            onInput={(e) => setParams({ ...params, position: e.detail.value })}
            className="message-form-item-input"
            placeholder="输入你的职位"
          />
        </View>
        <View className="message-form-item">
          <Text className="message-form-item-label">邮箱</Text>
          <Input
            value={params.email}
            onInput={(e) => setParams({ ...params, email: e.detail.value })}
            className="message-form-item-input"
            placeholder="输入常用邮箱"
          />
        </View>
        <View className="message-form-item">
          <Text className="message-form-item-label">企业</Text>
          <Input
            value={params.company}
            onInput={(e) => setParams({ ...params, company: e.detail.value })}
            className="message-form-item-input"
            placeholder="未绑定（请联系企业管理员进行绑定）"
            disabled={true}
          />
        </View>
      </View>
      <Button className="message-btn" onClick={saveMessage}>
        保存
      </Button>
    </View>
  );
};

export default Message;
