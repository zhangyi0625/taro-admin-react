import { View, Text, Image, Input } from "@tarojs/components";
import "./index.scss";
import AffiliateAdvantage from "./AffiliateAdvantage";
import { useState } from "react";
import CustomSearch from "../../../components/CustomSearch";

export type AffiliatePorAdvantageProps = {
  changeType?: "choose" | "search";
};

const AffiliatePorAdvantage: React.FC<AffiliatePorAdvantageProps> = ({
  changeType = "choose",
}) => {
  const [keyword, setKeyword] = useState<string>("");

  const resetSearch = () => {
    setKeyword("");
  };

  return (
    <>
      <CustomSearch
        keyword={keyword || ""}
        onSearch={(info) => setKeyword(info)}
        searchPlaceholder="请输入起运港"
      />
      <AffiliateAdvantage
        type="por"
        keyword={keyword}
        changeType={changeType}
      />
    </>
  );
};

export default AffiliatePorAdvantage;
