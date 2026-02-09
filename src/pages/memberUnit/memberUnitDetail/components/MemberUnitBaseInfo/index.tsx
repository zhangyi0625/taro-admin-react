import { View, Text } from "@tarojs/components";
import { MemberUnitDetailType } from "../../../../../service/memberUnit/memberUnitModel";
import "../../index.scss";
import { useCallback } from "react";

export type MemberUnitBaseInfoProps = {
  memberUnitDetail: MemberUnitDetailType;
};

const MemberUnitBaseInfo: React.FC<MemberUnitBaseInfoProps> = ({
  memberUnitDetail,
}) => {
  const getAdvanceBusiness = useCallback(() => {
    return memberUnitDetail?.advantageBusiness
      ? memberUnitDetail?.advantageBusiness.split(",")
      : [];
  }, [memberUnitDetail]);

  const getOtherAdvance = useCallback(
    (key: string, name: string) => {
      return memberUnitDetail?.[key]
        ? memberUnitDetail?.[key].map((i) => i[name])
        : [];
    },
    [memberUnitDetail],
  );
  return (
    <>
      <View className="memberUnitDetail-remark" style={{ marginTop: "0" }}>
        <View className="memberUnitDetail-remark-title">企业简介</View>
        <View>
          <Text className="gray">
            {memberUnitDetail?.enterpriseDescription ?? "未填写"}
          </Text>
        </View>
      </View>
      <View className="memberUnitDetail-remark">
        <View className="memberUnitDetail-remark-title">业务信息</View>
        <View className="memberUnitDetail-remark-nextTitle">优势业务</View>
        <View className="tag-item">
          {getAdvanceBusiness().map((item) => (
            <View className="tag" key={item}>
              {item}
            </View>
          ))}
        </View>
        <View className="memberUnitDetail-remark-nextTitle">优势起运港</View>
        <View className="tag-item">
          {getOtherAdvance("porList", "cnName").map((item) => (
            <View className="tag" key={item}>
              {item}
            </View>
          ))}
        </View>
        <View className="memberUnitDetail-remark-nextTitle">业务目的港</View>
        <View className="tag-item">
          {getOtherAdvance("fndList", "cnName").map((item) => (
            <View className="tag" key={item}>
              {item}
            </View>
          ))}
        </View>
        <View className="memberUnitDetail-remark-nextTitle">业务航线</View>
        <View className="tag-item">
          {getOtherAdvance("routeList", "name").map((item) => (
            <View className="tag" key={item}>
              {item}
            </View>
          ))}
        </View>
        <View className="memberUnitDetail-remark-nextTitle">优势船东</View>
        <View className="tag-item">
          {getOtherAdvance("carrierList", "cnName").map((item) => (
            <View className="tag" key={item}>
              {item}
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

export default MemberUnitBaseInfo;
