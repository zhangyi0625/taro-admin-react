import { View, Text, Image, Input, Button } from "@tarojs/components";
import "./index.scss";
import Taro from "@tarojs/taro";
import Logo from "../../images/logo.png";
import { useState } from "react";

const Login: React.FC = () => {
  const regex = /^1[3-9]\d{9}$/;
  const [loading, setLoading] = useState(false);

  const [code, setCode] = useState(60);
  const [isCounting, setIsCounting] = useState(false);

  const [loginParams, setLoginParams] = useState<any>({
    phone: "",
    code: "",
    password: "",
  });

  const [loginType, setLoginType] = useState<"password" | "phone">("phone");

  // const setLoginTypeActive = (type: "password" | "phone") => {
  //   setLoginType(type);
  // };

  const handleLogin = () => {
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
      // const res = await Taro.request({
      //   url: "https://test.com/sendCode",
      //   method: "POST",
      //   data: {
      //     phone: loginParams.phone,
      //   },
      // });

      let countdown = 60;
      setCode(countdown);
      setIsCounting(true);

      // 使用定时器倒计时
      const timer = setInterval(() => {
        countdown -= 1;
        console.log(countdown, "code");
        setCode(countdown);
        if (countdown === 0) {
          clearInterval(timer);
          setIsCounting(false);
          setCode(60);
        }
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const loginByWechat = async () => {
    try {
      const res = await Taro.login({
        success: function (res) {
          console.log(res);
          if (res.code) {
            //发起网络请求
            Taro.request({
              url: "https://test.com/onLogin",
              data: {
                code: res.code,
              },
            });
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        },
      });
    } catch (err) {
      console.log(err);
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
                {!isCounting ? (
                  <Text className="send-code" onClick={handleSendCode}>
                    发送验证码
                  </Text>
                ) : (
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
        <Button className="login-btn-wx" onClick={loginByWechat}>
          一键登录
        </Button>
      </View>
    </View>
  );
};

export default Login;
