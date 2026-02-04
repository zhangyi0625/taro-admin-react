import { Button, Input, View, Text } from "@tarojs/components";
import "./applicationForm.scss";
import { useState } from "react";
import Taro from "@tarojs/taro";
import { saveApplication } from "../../../service/affiliate/affiliateApi";

export type ApplicationFormType = {
  companyName: string;
  contactName: string;
  contactPhone: string;
  address: string;
};

const ApplicationForm: React.FC = () => {
  const [form, setForm] = useState<ApplicationFormType>({
    companyName: "",
    contactName: "",
    contactPhone: "",
    address: "",
  });

  const saveForm = async () => {
    if (
      !form.companyName ||
      !form.contactName ||
      !form.contactPhone ||
      !form.address
    ) {
      Taro.showToast({
        title: "请填写完整信息",
        icon: "none",
      });
      return;
    }
    try {
      const resp = await saveApplication(form);
      console.log(resp, "resp");
      Taro.showModal({
        title: "提交成功",
        content: "工作人员将会主动与您联系，请耐心等待！",
        success(result) {
          if (result.confirm) {
            Taro.navigateBack();
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
              value={form.contactName}
              className="applicationForm-form-item-input"
              onInput={(e) => setForm({ ...form, contactName: e.detail.value })}
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
              value={form.contactPhone}
              className="applicationForm-form-item-input"
              onInput={(e) =>
                setForm({ ...form, contactPhone: e.detail.value })
              }
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
