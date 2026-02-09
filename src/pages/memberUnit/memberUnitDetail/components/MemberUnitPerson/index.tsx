import { View, Image, Text } from "@tarojs/components";
import Avatar from "../../../../../images/icon/avatar.svg";
import { MemberUnitCustomerType } from "../../../../../service/memberUnit/memberUnitModel";
import { useCallback } from "react";
import Taro from "@tarojs/taro";
import "../../index.scss";

export type MemberUnitPersonProps = {
  customerList: MemberUnitCustomerType[];
  goToDynamic: (id: string) => void;
};

const MemberUnitPerson: React.FC<MemberUnitPersonProps> = ({
  customerList,
  goToDynamic,
}) => {
  const getToken = useCallback(() => {
    return Taro.getStorageSync("token");
  }, []);
  return (
    <>
      {customerList.map((item) => (
        <View className="customer-item" key={item.id}>
          <View className="inline-flex">
            <Image
              src={(item.avatarPath as string) ?? Avatar}
              className="avatar"
            />
            <View className="flex-col" style={{ marginTop: "6rpx" }}>
              <View className="text-large">
                {item.name}
                <Text
                  className="text-normal"
                  style={{ marginLeft: "8rpx", color: "#909399" }}
                >
                  {item.position}
                </Text>
              </View>
              <View className="text-normal">
                电话：{item.phone}
                {!getToken() && <Text className="is-login">登录后查看</Text>}
              </View>
            </View>
          </View>
          <View
            className="dynamic"
            onClick={() => {
              goToDynamic(item.id);
            }}
          >
            留言
          </View>
        </View>
      ))}
    </>
  );
};

export default MemberUnitPerson;
