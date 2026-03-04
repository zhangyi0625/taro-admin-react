import { View, Text, Button, Input, Image } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import { useState } from "react";
import clsx from "clsx";
import ArrowRight from "../../images/icon/arrow-icon.svg";
import { UserInfoParams } from "../../service/user/userModel";
import { saveUserInfo } from "../../service/user/userApi";

const Message: React.FC = () => {
  const [params, setParams] = useState<Partial<UserInfoParams>>();

  const [imgList, setImgList] = useState<string>("");

  const itemsClass = clsx(
    "flex items-center text-[28px] px-[24px] py-[32px] border-b-[1rpx] border-[#f5f7fa]",
  );

  const saveButtonClass = clsx(
    "h-[88rpx] leading-[88rpx] text-center text-[32rpx] bg-[#1677ff] text-[#ffffff] rounded-[12rpx]",
  );

  useDidShow(() => {
    setParams({
      ...Taro.getStorageSync("userInfo"),
      name:
        Taro.getStorageSync("userInfo")?.name ===
        Taro.getStorageSync("userInfo")?.phone
          ? ""
          : Taro.getStorageSync("userInfo")?.name,
    });
    setImgList(Taro.getStorageSync("userInfo")?.avatarPath ?? "");
  });

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

  const handleChooseAvatar = (e: any) => {
    const { avatarUrl } = e.detail;
    if (avatarUrl) {
      setImgList(avatarUrl);
      console.log("头像更新成功:", avatarUrl);

      // 上传头像到服务器
      Taro.uploadFile({
        url: "https://xh.zaicang.net/api/app/file/upload",
        filePath: avatarUrl,
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
            Taro.showToast({
              title: "头像上传成功",
              icon: "success",
            });
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
    } else {
      console.log(e.detail, "选择头像事件");
    }
  };
  return (
    <View className="message h-screen bg-[#f5f5f5] overflow-hidden py-[20px] px-[24px]">
      <View className="message-form bg-[#ffffff] rounded-[16rpx] mb-[20px]">
        <View className={itemsClass}>
          <Text className="text-right pr-[24px] min-w-[80px] whitespace-nowrap">
            头像
          </Text>
          <Button
            className="flex items-center w-full"
            style={{ border: "unset", margin: "unset" }}
            open-type="chooseAvatar"
            hover-class="none"
            onChooseAvatar={handleChooseAvatar}
            plain={true}
          >
            <View
              className="flex flex-1 justify-between items-center w-full"
              // onClick={changeAvatar}
            >
              {!imgList && (
                <View>
                  <Input placeholder="修改" disabled={true} />
                </View>
              )}
              {imgList && (
                <Image
                  className="w-[120px] h-[120px] rounded-[50%]"
                  mode="aspectFill"
                  src={imgList}
                />
              )}
              <Image className="arrow-icon" src={ArrowRight} />
            </View>
          </Button>
        </View>
        <View className={itemsClass}>
          <Text className="text-right pr-[24px] min-w-[80px] whitespace-nowrap">
            <Text className="text-[#ff4949]">*</Text>姓名
          </Text>
          <Input
            value={params?.name}
            onInput={(e) => setParams({ ...params, name: e.detail.value })}
            className="flex-1 w-full"
            placeholder="输入姓名"
          />
        </View>
        <View className={itemsClass}>
          <Text className="text-right pr-[24px] min-w-[80px] whitespace-nowrap">
            <Text className="text-[#ff4949]">*</Text>职务
          </Text>
          <Input
            value={params?.position as string}
            onInput={(e) => setParams({ ...params, position: e.detail.value })}
            className="flex-1 w-full"
            placeholder="输入你的职位"
          />
        </View>
        <View className={itemsClass}>
          <Text className="text-right pr-[24px] min-w-[80px] whitespace-nowrap">
            手机号
          </Text>
          <Input
            value={params?.phone as string}
            onInput={(e) => setParams({ ...params, phone: e.detail.value })}
            className="flex-1 w-full"
            placeholder="输入常用手机号"
          />
        </View>
        <View className={itemsClass}>
          <Text className="text-right pr-[24px] min-w-[80px] whitespace-nowrap">
            固话
          </Text>
          <Input
            value={params?.telephone as string}
            onInput={(e) => setParams({ ...params, telephone: e.detail.value })}
            className="flex-1 w-full"
            placeholder="输入常用固话"
          />
        </View>
        <View className={itemsClass}>
          <Text className="text-right pr-[24px] min-w-[80px] whitespace-nowrap">
            邮箱
          </Text>
          <Input
            value={params?.email as string}
            onInput={(e) => setParams({ ...params, email: e.detail.value })}
            className="flex-1 w-full"
            placeholder="输入常用邮箱"
          />
        </View>
        <View className={itemsClass}>
          <Text className="text-right pr-[24px] min-w-[80px] whitespace-nowrap">
            企业
          </Text>
          <Input
            value={params?.companyName as string}
            onInput={(e) =>
              setParams({ ...params, companyName: e.detail.value })
            }
            className="flex-1 w-full"
            placeholder="未绑定（请联系企业管理员进行绑定）"
            disabled={true}
          />
        </View>
      </View>
      <Button className={saveButtonClass} onClick={saveMessage}>
        保存
      </Button>
    </View>
  );
};

export default Message;
