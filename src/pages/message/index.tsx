import { View, Text, Button, Input, Image } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { useEffect, useState } from "react";
import "./index.scss";
import ArrowRight from "../../images/icon/arrow-icon.svg";
import { UserInfoParams } from "../../service/user/userModel";
import { saveUserInfo } from "../../service/user/userApi";

const Message: React.FC = () => {
  const [params, setParams] = useState<Partial<UserInfoParams>>();

  const [imgList, setImgList] = useState<string>("");

  useDidShow(() => {
    // setParams({
    //   ...params,
    //   ...Taro.getStorageSync("userInfo"),
    // });
    // setImgList((params?.avatarPath as string) ?? "");
    // console.log(
    //   params,
    //   "params.avatarPath",
    //   imgList,
    //   Taro.getStorageSync("userInfo"),
    // );
  });

  useEffect(() => {
    setParams({
      ...Taro.getStorageSync("userInfo"),
    });
    setImgList(Taro.getStorageSync("userInfo")?.avatarPath ?? "");
    console.log(params, "params.avatarPath", imgList, {
      ...Taro.getStorageSync("userInfo"),
    });
  }, []);

  const changeAvatar = () => {
    Taro.chooseImage({
      count: 1,
      success: async (res) => {
        Taro.uploadFile({
          url: "https://xh.zaicang.net/api/app/file/upload",
          filePath: res.tempFilePaths[0],
          name: "file",
          header: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + Taro.getStorageSync("token"),
          },
          success: (res) => {
            let data = JSON.parse(res.data);
            console.log(res, "res", data);
            if (data.code === 200) {
              setParams({ ...params, avatarId: data.data.id });
              setImgList(data.data.path);
            }
          },
          fail: (err) => {
            console.log(err);
            Taro.showToast({
              title: err.errMsg || "上传失败",
              icon: "none",
            });
          },
        });
      },
    });
  };

  const saveMessage = async () => {
    if (!params?.name) {
      Taro.showToast({
        title: "请输入姓名",
        icon: "none",
      });
      return;
    }
    if (!params?.position) {
      Taro.showToast({
        title: "请输入职务",
        icon: "none",
      });
      return;
    }
    try {
      const res: any = await saveUserInfo(params as UserInfoParams);
      if (res.code === 200) {
        console.log(res);
        Taro.showToast({
          title: res.msg || "保存成功",
          icon: "success",
        });
        setTimeout(() => {
          Taro.navigateBack();
        }, 2000);
      }
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
            {!imgList && (
              <View>
                <Input placeholder="修改" disabled={true} />
              </View>
            )}
            {imgList && (
              <Image className="message-form-item-avatar" src={imgList} />
            )}
            <Image className="arrow-icon" src={ArrowRight} />
          </View>
        </View>
        <View className="message-form-item">
          <Text className="message-form-item-label">
            <Text style={{ color: "red" }}>*</Text>姓名
          </Text>
          <Input
            value={params?.name}
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
            value={params?.position as string}
            onInput={(e) => setParams({ ...params, position: e.detail.value })}
            className="message-form-item-input"
            placeholder="输入你的职位"
          />
        </View>
        <View className="message-form-item">
          <Text className="message-form-item-label">邮箱</Text>
          <Input
            value={params?.email as string}
            onInput={(e) => setParams({ ...params, email: e.detail.value })}
            className="message-form-item-input"
            placeholder="输入常用邮箱"
          />
        </View>
        <View className="message-form-item">
          <Text className="message-form-item-label">企业</Text>
          <Input
            value={params?.companyName as string}
            onInput={(e) =>
              setParams({ ...params, companyName: e.detail.value })
            }
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
