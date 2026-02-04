import { View, Text, Image, Input, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import { useState } from "react";
import { affiliateMemberType } from "..";
import {
  addMemberUnitCustomer,
  removeMemberUnitCustomer,
} from "../../../service/memberUnit/memberUnitApi";

const EditCustomer: React.FC = () => {
  const [params, setParams] = useState<any>({
    name: "",
    position: "",
    email: "",
    phone: "",
  });

  useLoad((options) => {
    console.log(options, "options");
    setParams(JSON.parse(options.info || "{}"));
    // Taro.setNavigationBarTitle({
    //   title: options.title === "phone" ? "修改手机号" : "修改登录密码",
    // });
  });

  const saveCustomer = async () => {
    if (!params.name) {
      Taro.showToast({
        title: "请输入员工姓名",
        icon: "none",
      });
      return;
    }
    if (!params.phone) {
      Taro.showToast({
        title: "请输入员工手机号",
        icon: "none",
      });
      return;
    }
    if (!params.position) {
      Taro.showToast({
        title: "请输入员工职位",
        icon: "none",
      });
      return;
    }
    try {
      const resp = await addMemberUnitCustomer(params);
      Taro.showToast({
        title: "保存成功",
        icon: "success",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeCustomer = async () => {
    try {
      const resp = await removeMemberUnitCustomer({
        customerId: params.id as string,
      });
      Taro.showToast({
        title: "删除成功",
        icon: "success",
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View className="edit-customer">
      <View className="edit-customer-form">
        <View className="edit-customer-form-item">
          <Text className="edit-customer-form-item-label">
            <Text style={{ color: "red" }}>*</Text>姓名
          </Text>
          <Input
            value={params.name}
            onInput={(e) => setParams({ ...params, name: e.detail.value })}
            className="edit-customer-form-item-input"
            placeholder="请输入员工姓名"
          />
        </View>
        <View className="edit-customer-form-item">
          <Text className="edit-customer-form-item-label">
            <Text style={{ color: "red" }}>*</Text>手机号
          </Text>
          <Input
            value={params.phone as string}
            onInput={(e) => setParams({ ...params, phone: e.detail.value })}
            className="edit-customer-form-item-input"
            placeholder="请输入员工手机号"
          />
        </View>
        <View className="edit-customer-form-item">
          <Text className="edit-customer-form-item-label">
            <Text style={{ color: "red" }}>*</Text>职位
          </Text>
          <Input
            value={params.position as string}
            onInput={(e) => setParams({ ...params, position: e.detail.value })}
            className="edit-customer-form-item-input"
            placeholder="请输入员工职位"
            disabled={true}
          />
        </View>
        <View className="edit-customer-form-item">
          <Text className="edit-customer-form-item-label">邮箱</Text>
          <Input
            value={params.email as string}
            onInput={(e) => setParams({ ...params, email: e.detail.value })}
            className="edit-customer-form-item-input"
            placeholder="请输入员工邮箱"
          />
        </View>
      </View>
      <Button className="edit-customer-btn" onClick={saveCustomer}>
        保存
      </Button>
      {params.id && (
        <Button className="delete-customer-btn" onClick={removeCustomer}>
          删除员工
        </Button>
      )}
    </View>
  );
};

export default EditCustomer;
