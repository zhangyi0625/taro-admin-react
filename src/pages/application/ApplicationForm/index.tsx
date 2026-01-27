import { Button, Input, View, Text } from "@tarojs/components";
import "./applicationForm.scss";
import { useState } from "react";
import Taro from "@tarojs/taro";

export type ApplicationFormType = {
  companyName: string;
  name: string;
  phone: string;
  address: string;
};

const ApplicationForm: React.FC = () => {
  const [form, setForm] = useState<ApplicationFormType>({
    companyName: "",
    name: "",
    phone: "",
    address: "",
  });

  const saveForm = async () => {
    console.log(form, "form");
    if (!form.companyName || !form.name || !form.phone || !form.address) {
      Taro.showToast({
        title: "请填写完整信息",
        icon: "none",
      });
      return;
    }
    try {
      // const res = await Taro.request({
      //   url: "/api/application/save",
      //   method: "POST",
      //   data: form,
      // });
      Taro.showModal({
        title: "提交成功",
        content: "工作人员将会主动与您联系，请耐心等待！",
        success(result) {
          if (result.confirm) {
            Taro.navigateBack({
              delta: 1,
            });
          }
        },
      });
    } catch (error) {
      Taro.showToast({
        title: "保存失败",
        icon: "none",
      });
    }
  };
  return (
    <View className="applicationForm">
      <View className="applicationForm-form">
        <View className="applicationForm-form-item">
          <View className="applicationForm-form-item-label">
            <Text style={{ color: "red" }}>*</Text>企业名称
          </View>
          <View className="applicationForm-form-item-input">
            <Input
              placeholder="请输入企业名称"
              value={form.companyName}
              className="applicationForm-form-item-input"
              onInput={(e) => setForm({ ...form, companyName: e.detail.value })}
            />
          </View>
        </View>
        <View className="applicationForm-form-item">
          <View className="applicationForm-form-item-label">
            <Text style={{ color: "red" }}>*</Text>联系人
          </View>
          <View className="applicationForm-form-item-input">
            <Input
              placeholder="请输入联系人"
              value={form.name}
              className="applicationForm-form-item-input"
              onInput={(e) => setForm({ ...form, name: e.detail.value })}
            />
          </View>
        </View>
        <View className="applicationForm-form-item">
          <View className="applicationForm-form-item-label">
            <Text style={{ color: "red" }}>*</Text>联系电话
          </View>
          <View className="applicationForm-form-item-input">
            <Input
              placeholder="请输入企业联系电话"
              value={form.phone}
              className="applicationForm-form-item-input"
              onInput={(e) => setForm({ ...form, phone: e.detail.value })}
            />
          </View>
        </View>
        <View className="applicationForm-form-item">
          <View className="applicationForm-form-item-label">
            <Text style={{ color: "red" }}>*</Text>企业地址
          </View>
          <View className="applicationForm-form-item-input">
            <Input
              placeholder="请输入企业详细地址"
              value={form.address}
              className="applicationForm-form-item-input"
              onInput={(e) => setForm({ ...form, address: e.detail.value })}
            />
          </View>
        </View>
      </View>
      <Button className="applicationForm-btn" onClick={saveForm}>
        保存
      </Button>
    </View>
  );
};

export default ApplicationForm;
