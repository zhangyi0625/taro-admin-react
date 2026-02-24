import { View, Text, Image, Input, Button } from "@tarojs/components";
import "./index.scss";
import Taro, { useDidShow } from "@tarojs/taro";
import Logo from "../../images/logo.png";
import { useRef, useState } from "react";
import {
  passwordLogin,
  phoneLogin,
  postBindWechat,
  sendCode,
  wechatLogin,
} from "../../service/auth/authApi";

const Login: React.FC = () => {
  const regex = /^1[3-9]\d{9}$/;

  const [loading, setLoading] = useState(false);

  const [code, setCode] = useState(0);

  const [isCounting, setIsCounting] = useState<boolean>(false);

  const [loginParams, setLoginParams] = useState<any>({
    phone: "",
    code: "",
    password: "",
  });

  const [isFirstLogin, setIsFirstLogin] = useState<boolean>(false);

  const [loginType, setLoginType] = useState<"password" | "phone">("phone");

  const timerRef = useRef(null);

  // const setLoginTypeActive = (type: "password" | "phone") => {
  //   setLoginType(type);
  // };

  // 对应 onShow
  useDidShow(() => {
    setIsFirstLogin(Taro.getStorageSync("isFirstLogin") ?? false);
    console.log(
      "useDidShow",
      isFirstLogin,
      Taro.getStorageSync("isFirstLogin"),
    );
  });

  const handleLogin = async () => {
    if (!loginParams.phone || loginParams.phone.length !== 11) {
      Taro.showToast({
        title: "请输入正确的手机号",
        icon: "none",
      });
      return;
    }
    if (loginType === "phone") {
      if (!loginParams.code) {
        Taro.showToast({
          title: "请输入验证码",
          icon: "none",
        });
        return;
      }
    } else if (loginType === "password") {
      if (!loginParams.password) {
        Taro.showToast({
          title: "请输入登录密码",
          icon: "none",
        });
        return;
      }
    }
    setLoading(true);
    try {
      const res: any =
        loginType === "phone"
          ? await phoneLogin(loginParams)
          : await passwordLogin(loginParams);
      if (res.data.code === 200) {
        Taro.setStorageSync("token", res.data.data.accessToken);
        Taro.setStorageSync("userInfo", res.data.data.customer);
        Taro.showToast({
          title: "登录成功",
          icon: "success",
        });
        setTimeout(() => {
          Taro.navigateBack();
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      Taro.showToast({
        title: err.message || "登录失败",
        icon: "none",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendCode = async () => {
    if (!loginParams.phone || !regex.test(loginParams.phone)) {
      Taro.showToast({
        title: "请输入正确的手机号",
        icon: "none",
      });
      return;
    }
    try {
      const resp: any = await sendCode({ phone: loginParams.phone });
      // console.log(resp, "resp");
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

  const loginByWechat = async (e) => {
    try {
      await Taro.login({
        success: async function (res) {
          if (res.code) {
            console.log(e, "res", res);
            const resp: any = e.detail.code
              ? await postBindWechat({
                  wxPhoneCode: e.detail.code,
                  wxCode: res.code,
                })
              : await wechatLogin({ wxCode: res.code });
            console.log(resp, "res, resp");
            if (resp) {
              Taro.showToast({
                title: "登录成功",
                icon: "success",
              });
              Taro.setStorageSync("token", resp.accessToken);
              Taro.setStorageSync("userInfo", resp.customer);
            }
            setTimeout(() => {
              Taro.navigateBack();
            }, 2000);
          }
        },
      });
    } catch (err) {
      Taro.showToast({
        title: err.message || "登录失败",
        icon: "none",
      });
    }
  };

  return (
    <View className="login">
      <Image src={Logo} className="login-logo" />
      <View className="login-form">
        <View className="inline-flex">
          <View
            className={`login-form-tab ${loginType === "phone" ? "active" : ""}`}
            onClick={() => loginType !== "phone" && setLoginType("phone")}
          >
            验证码登录
          </View>
          <View
            className={`login-form-tab ${loginType === "password" ? "active" : ""}`}
            onClick={() => loginType !== "password" && setLoginType("password")}
          >
            密码登录
          </View>
        </View>
        <View className="login-form-item">
          <Text className="login-form-item-label">手机号</Text>
          <Input
            value={loginParams.phone}
            onInput={(e) =>
              setLoginParams({ ...loginParams, phone: e.detail.value })
            }
            type="number"
            className="login-form-item-input"
            placeholder="请输入手机号"
          />
        </View>
        {loginType === "phone" ? (
          <View className="login-form-item">
            <Text className="login-form-item-label">验证码</Text>
            <Input
              value={loginParams.code}
              onInput={(e) =>
                setLoginParams({ ...loginParams, code: e.detail.value })
              }
              type="number"
              className="login-form-item-input"
              placeholder="请输入验证码"
            />
            {loginType === "phone" && (
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
            )}
          </View>
        ) : (
          <View className="login-form-item">
            <Text className="login-form-item-label">登录密码</Text>
            <Input
              value={loginParams.password}
              onInput={(e) =>
                setLoginParams({ ...loginParams, password: e.detail.value })
              }
              className="login-form-item-input"
              placeholder="请输入登录密码"
            />
          </View>
        )}
        <Button
          className="login-btn-primary"
          type="primary"
          onClick={handleLogin}
          loading={loading}
        >
          {loginType === "phone" ? "登录/注册" : "登录"}
        </Button>
        {isFirstLogin ? (
          <Button
            className="login-btn-wx"
            open-type="getPhoneNumber"
            onGetPhoneNumber={loginByWechat}
          >
            一键登录
          </Button>
        ) : (
          <Button className="login-btn-wx" onClick={loginByWechat}>
            一键登录
          </Button>
        )}
      </View>
    </View>
  );
};

export default Login;
