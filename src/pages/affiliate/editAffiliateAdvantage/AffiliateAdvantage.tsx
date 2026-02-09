import { View, Button, Checkbox, Image } from "@tarojs/components";
import { useEffect, useState } from "react";
import "./index.scss";
import {
  getBusinessAdvantage,
  getCarrierAdvantage,
  getPortAdvantage,
  getRouteAdvantage,
} from "../../../service/advantage/advantageApi";
import type {
  BusinessAdvantageType,
  PortAdvantageType,
  RouteAdvantageType,
} from "../../../service/advantage/advantageModel";
import Taro, { useDidShow } from "@tarojs/taro";
import IconClose from "../../../images/icon/close.svg";
import {
  getAffiliateInfoDetail,
  updateAffiliateInfo,
} from "../../../service/affiliate/affiliateApi";
import { AffiliateInfoType } from "../../../service/affiliate/affiliateModel";
import { otherPortOptions } from "./config";

export type AffiliateAdvantageProps = {
  type: string;
  keyword?: string;
  changeType: "choose" | "search";
};

const MemberUnitManageAdvantageOptions = [
  {
    label: "租船",
    value: "租船",
  },
  {
    label: "海运整箱",
    value: "海运整箱",
  },
  {
    label: "海运拼箱",
    value: "海运拼箱",
  },
  {
    label: "航空运输",
    value: "航空运输",
  },
  {
    label: "特种箱",
    value: "特种箱",
  },
  {
    label: "冷冻箱",
    value: "冷冻箱",
  },
  {
    label: "TANK箱",
    value: "TANK箱",
  },
  {
    label: "液袋运输",
    value: "液袋运输",
  },
  {
    label: "滚装散杂",
    value: "滚装散杂",
  },
  {
    label: "大件运输",
    value: "大件运输",
  },
  {
    label: "展会运输",
    value: "展会运输",
  },
  {
    label: "欧亚铁路",
    value: "欧亚铁路",
  },
  {
    label: "项目物流",
    value: "项目物流",
  },
  {
    label: "多式联运",
    value: "多式联运",
  },
  {
    label: "危险品海运",
    value: "危险品海运",
  },
  {
    label: "危险品空运",
    value: "危险品空运",
  },
  {
    label: "危险品陆运",
    value: "危险品陆运",
  },
  {
    label: "海外代理",
    value: "海外代理",
  },
  {
    label: "集卡陆运",
    value: "集卡陆运",
  },
  {
    label: "仓储服务",
    value: "仓储服务",
  },
  {
    label: "装箱服务",
    value: "装箱服务",
  },
  {
    label: "报关报检",
    value: "报关报检",
  },
  {
    label: "FBA物流",
    value: "FBA物流",
  },
  {
    label: "国际快递",
    value: "国际快递",
  },
  {
    label: "国际搬家",
    value: "国际搬家",
  },
  {
    label: "供应链金融",
    value: "供应链金融",
  },
  {
    label: "货运保险",
    value: "货运保险",
  },
  {
    label: "法律咨询",
    value: "法律咨询",
  },
  {
    label: "物流软件",
    value: "物流软件",
  },
  {
    label: "内贸运输",
    value: "内贸运输",
  },
  {
    label: "拖车",
    value: "拖车",
  },
  {
    label: "框架",
    value: "框架",
  },
  {
    label: "目的港拖车",
    value: "目的港拖车",
  },
  {
    label: "SOC",
    value: "SOC",
  },
  {
    label: "进口清关",
    value: "进口清关",
  },
  {
    label: "演艺物流",
    value: "演艺物流",
  },
  {
    label: "特种工程项目物流",
    value: "特种工程项目物流",
  },
  {
    label: "ATA报关",
    value: "ATA报关",
  },
  {
    label: "直客",
    value: "直客",
  },
];

const ApiMap = {
  por: getPortAdvantage,
  // business: getBusinessAdvantage,
  route: getRouteAdvantage,
  carrier: getCarrierAdvantage,
};

const AffiliateAdvantage: React.FC<AffiliateAdvantageProps> = ({
  type,
  keyword,
  changeType,
}) => {
  const [selected, setSelected] = useState(["1", "2", "3"]);

  const [options, setOptions] = useState<
    BusinessAdvantageType[] | RouteAdvantageType[] | PortAdvantageType[] | any
  >([]);

  const [copyOptions, setCopyOptions] = useState<
    BusinessAdvantageType[] | RouteAdvantageType[] | PortAdvantageType[] | any
  >([]);

  const [affiliateInfo, setAffiliateInfo] = useState<
    Partial<AffiliateInfoType>
  >({});

  const [isOther, setIsOther] = useState(false);

  useEffect(() => {
    setOptions([]);
    setIsOther(Taro.getStorageSync("isOther") === "true");
    type && init();
  }, [type, keyword]);

  useDidShow(() => {
    loadCompanyInfo();
  });

  const keyType = {
    por: "advantagePor",
    fnd: "advantageFnd",
    business: "advantageBusiness",
    route: "advantageRoute",
    carrier: "advantageCarrier",
  };
  const loadCompanyInfo = async () => {
    try {
      const res: any = await getAffiliateInfoDetail(
        Taro.getStorageSync("userInfo").companyId,
      );
      setAffiliateInfo(res);
      const {
        advantageBusiness,
        advantagePor,
        advantageFnd,
        advantageRoute,
        advantageCarrier,
      } = res;
      console.log(
        advantageBusiness,
        advantagePor,
        advantageFnd,
        advantageRoute,
        advantageCarrier,
        "advantageBusiness, advantagePort, advantageRoute, advantageCarrier",
        type,
      );
      if (type === "business") {
        setSelected(
          advantageBusiness ? advantageBusiness.split(",") || [] : [],
        );
      } else if (type === "route") {
        setSelected(advantageRoute ? advantageRoute.split(",") || [] : []);
      } else if (type === "carrier") {
        setSelected(advantageCarrier ? advantageCarrier.split(",") || [] : []);
      } else if (type === "por") {
        setSelected(advantagePor ? advantagePor.split(",") || [] : []);
      } else if (type === "fnd") {
        setSelected(advantageFnd ? advantageFnd.split(",") || [] : []);
      }
      console.log(selected, "selected");
    } catch (err) {}
  };

  const init = async () => {
    Taro.showLoading({
      title: "加载中",
    });
    try {
      console.log(type, keyword);
      // return;
      let res: any = [];
      if (type === "business") {
        res = MemberUnitManageAdvantageOptions;
      } else {
        res = await ApiMap[type](
          type === "por"
            ? {
                isPor: 1,
                keyword: keyword || "",
                order: "desc",
                sort: "is_popularity",
              }
            : {},
        );
      }

      if (type === "route") {
        setOptions(res.filter((item) => item.parentId));
      } else setOptions(res ?? []);
      if (!keyword) {
        setCopyOptions(
          type === "route" ? res.filter((item) => item.parentId) : (res ?? []),
        );
      }
      console.log(res, "res", options, selected, type);
      console.log(copyOptions, "copyOptions", keyword);
      if (type === "por" && Taro.getStorageSync("isOther") === "true") {
        console.log(
          otherPortOptions,
          "otherPortOptions",
          isOther,
          Taro.getStorageSync("isOther") === "true",
        );
        setCopyOptions(otherPortOptions);
        setOptions(otherPortOptions);
      }
      setTimeout(() => {
        Taro.removeStorageSync("isOther");
      }, 500);
      Taro.hideLoading();
    } catch (err) {
      console.log(err, "err");
      Taro.hideLoading();
    }
  };

  const changeSelected = (value: string | any) => {
    console.log(value, "value", changeType);
    if (changeType === "search") {
      Taro.setStorageSync(`${type}Selected`, value);
      Taro.navigateBack();
    } else {
      setSelected(
        selected.includes(value)
          ? selected.filter((i) => i !== value)
          : [...selected, value],
      );
    }
  };

  const saveSelected = async () => {
    console.log(selected, "selected", type);
    try {
      await updateAffiliateInfo({
        ...affiliateInfo,
        [keyType[type]]: selected.join(","),
      });
      Taro.showToast({
        title: "保存成功",
        icon: "success",
      });
      setTimeout(() => {
        Taro.navigateBack();
      }, 2000);
    } catch (err) {
      console.log(err, "err");
    }
  };
  return (
    <>
      <View
        className="editAffiliateAdvantage-list"
        style={{ paddingBottom: changeType === "choose" ? "300rpx" : "80rpx" }}
      >
        {options.map((item) => (
          <View
            key={item.code}
            className="editAffiliateAdvantage-list-item"
            onClick={() => changeType === "search" && changeSelected(item)}
          >
            {type === "por"
              ? `${item.cnName}(${item.enName})`
              : (item.cnName ?? item.name ?? item.value)}
            {changeType === "choose" && (
              <Checkbox
                className="checkbox-list__checkbox"
                value={
                  item.type === "por" ? item.code : (item.code ?? item.value)
                }
                checked={selected.includes(
                  type === "por" ? item.code : (item.code ?? item.value),
                )}
                onClick={() =>
                  changeSelected(
                    type === "por" ? item.code : (item.code ?? item.value),
                  )
                }
                color="#167fff"
              ></Checkbox>
            )}
          </View>
        ))}
      </View>
      {changeType === "choose" && (
        <View className="editAffiliateAdvantage-fixed">
          <View style={{ marginBottom: "24rpx" }}>已选择</View>
          <View className="editAffiliateAdvantage-fixed-selected">
            {selected.map((item) => (
              <View
                className="editAffiliateAdvantage-fixed-selected-item"
                key={item}
              >
                {type === "por"
                  ? copyOptions.find((i) => i.code === item)?.cnName
                  : type === "route"
                    ? copyOptions.find((i) => i.code === item)?.name
                    : type === "business"
                      ? copyOptions.find((i) => i.value === item)?.label
                      : copyOptions.find((i) => i.code === item)?.cnName}
                <Image
                  className="close-icon"
                  src={IconClose}
                  onClick={() => changeSelected(item)}
                />
              </View>
            ))}
          </View>
          <Button
            className="btn"
            style={{ marginTop: "24rpx" }}
            onClick={saveSelected}
          >
            保存
          </Button>
        </View>
      )}
    </>
  );
};

export default AffiliateAdvantage;
