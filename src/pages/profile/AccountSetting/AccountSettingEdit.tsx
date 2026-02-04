import { View, Text, Input } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { useLoad } from "@tarojs/taro";
import "./accountSettingEdit.scss";
import { useState } from "react";
import { sendCode, updatePassword } from "../../../service/user/userApi";
import { UserInfoParams } from "../../../service/user/userModel";

const AccountSettingEdit: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfoParams>(
    {} as UserInfoParams,
  );

  const regex = /^1[3-9]\d{9}$/;

  const [isCounting, setIsCounting] = useState<boolean>(false);

  const [code, setCode] = useState(0);

  const [form, setForm] = useState<{ code: string; password: string }>({
    code: "",
    password: "",
  });

  useLoad((options) => {
    Taro.setNavigationBarTitle({
      title: options.title === "phone" ? "修改手机号" : "修改登录密码",
    });
  });

  useDidShow(() => {
    setUserInfo(Taro.getStorageSync("userInfo") ?? {});
  });

  const handleSendCode = async () => {
    if (!regex.test(userInfo.phone)) {
      Taro.showToast({
        title: "请输入正确的手机号",
        icon: "none",
      });
      return;
    }
    try {
      const resp: any = await sendCode({ phone: userInfo.phone });
      if (resp.code === 200) {
        Taro.showToast({
          title: "验证码发送成功",
          icon: "success",
        });
        let countdown = 60;
        setCode(60);
        setIsCounting(true);

        // 使用定时器倒计时
        const timer = setInterval(() => {
          countdown -= 1;
          setCode(countdown);
          if (countdown === 0) {
            clearInterval(timer);
            setIsCounting(false);
            setCode(60);
          }
        }, 1000);
      }
    } catch (err) {
      Taro.showToast({
        title: err.message || "验证码发送失败失败",
        icon: "none",
      });
    }
  };

  const save = async () => {
    if (!form.code) {
      Taro.showToast({
        title: "请输入验证码",
        icon: "none",
      });
      return;
    } else if (!form.password) {
      Taro.showToast({
        title: "请输入登录密码",
        icon: "none",
      });
      return;
    }
    try {
      await updatePassword({
        code: form.code,
        password: form.password,
      });
      Taro.showToast({
        title: "修改成功",
        icon: "success",
      });
    } catch {}
  };
  return (
    <View className="accountSettingEdit">
      <View className="accountSettingEdit-form">
        <View className="accountSettingEdit-form-item">
          <Text className="accountSettingEdit-form-item-label">手机号</Text>
          <View className="right">
            <Input
              value={userInfo.phone}
              onInput={(e) =>
                setUserInfo({ ...userInfo, phone: e.detail.value })
              }
              type="number"
              className="accountSettingEdit-form-item-input"
              placeholder="请输入手机号"
              disabled
            />
          </View>
        </View>
        <View className="accountSettingEdit-form-item">
          <Text className="accountSettingEdit-form-item-label">验证码</Text>
          <View className="right">
            <Input
              value={form.code}
              onInput={(e) => setForm({ ...form, code: e.detail.value })}
              type="number"
              className="accountSettingEdit-form-item-input"
              placeholder="请输入验证码"
            />
            <View>
              {!isCounting && (
                <Text className="send-code" onClick={handleSendCode}>
                  发送验证码
                </Text>
              )}
              {isCounting && (
                <Text className="send-code">再次获取({code})</Text>
              )}
            </View>
          </View>
        </View>
        <View className="accountSettingEdit-form-item">
          <Text className="accountSettingEdit-form-item-label">登录密码</Text>
          <View className="right">
            <Input
              value={form.password}
              onInput={(e) => setForm({ ...form, password: e.detail.value })}
              className="accountSettingEdit-form-item-input"
              placeholder="输入登录密码"
            />
          </View>
        </View>
      </View>
      <View className="confirm-btn" onClick={save}>
        保存
      </View>
    </View>
  );
};

export default AccountSettingEdit;
