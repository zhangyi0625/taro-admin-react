import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useLoad } from "@tarojs/taro";
import { useState } from "react";
import "./index.scss";
import AffiliatePorAdvantage from "./AffiliatePorAdvantage";
import AffiliateAdvantage from "./AffiliateAdvantage";
import AffiliateFndAdvantage from "./AffiliateFndAdvantage";

const editAffiliateAdvantage: React.FC = () => {
  const [type, setType] = useState<string>("");

  const [changeType, setChangeType] = useState<"choose" | "search">("choose");

  useLoad((options) => {
    const { name, type, changeType } = options;
    Taro.setNavigationBarTitle({
      title: name,
    });
    setType(type);
    setChangeType(changeType || "choose");
  });
  return (
    <View className="editAffiliateAdvantage">
      {type === "por" ? (
        <AffiliatePorAdvantage changeType={changeType} />
      ) : type === "fnd" ? (
        <AffiliateFndAdvantage changeType={changeType} />
      ) : (
        <AffiliateAdvantage type={type} changeType={changeType} />
      )}
    </View>
  );
};

export default editAffiliateAdvantage;
