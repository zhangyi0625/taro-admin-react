import { View, Text, Image, Button, Checkbox } from "@tarojs/components";
import { useEffect, useState } from "react";
import { PortAdvantageType } from "../../../service/advantage/advantageModel";
import Taro, { useDidShow } from "@tarojs/taro";
import {
  getPortAdvantage,
  getRouteAdvantage,
} from "../../../service/advantage/advantageApi";
import CustomSearch from "../../../components/CustomSearch";
import IconClose from "../../../images/icon/close.svg";
import "./index.scss";
import {
  getAffiliateInfoDetail,
  updateAffiliateInfo,
} from "../../../service/affiliate/affiliateApi";
import { AffiliateInfoType } from "../../../service/affiliate/affiliateModel";

export type AffiliateFndAdvantageProps = {
  changeType?: "choose" | "search";
};

const AffiliateFndAdvantage: React.FC<AffiliateFndAdvantageProps> = ({
  changeType = "choose",
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  const [keyword, setKeyword] = useState<string>("");

  const [options, setOptions] = useState<PortAdvantageType[] | any>([]);

  const [copyOptions, setCopyOptions] = useState<PortAdvantageType[] | any>([]);

  const [fndOptions, setFndOptions] = useState<any>([]);

  const [routeId, setRouteId] = useState<string>("");

  const [affiliateInfo, setAffiliateInfo] = useState<
    Partial<AffiliateInfoType>
  >({});

  useEffect(() => {
    // setSelected([]);
    setOptions([]);
    init();
    console.log(keyword, "keyword");
  }, [keyword]);

  useDidShow(() => {
    loadCompanyInfo();
  });

  const loadCompanyInfo = async () => {
    try {
      const res: any = await getAffiliateInfoDetail(
        Taro.getStorageSync("userInfo").companyId,
      );
      setAffiliateInfo(res);

      const { advantageFnd } = res;
      setSelected(advantageFnd ? advantageFnd.split(",") || [] : []);
    } catch (err) {
      console.log(err, "err");
    }
  };

  const init = async () => {
    Taro.showLoading({
      title: "加载中",
    });
    try {
      const res: any = await getPortAdvantage({
        isFnd: 1,
        keyword: keyword ?? "",
        enabled: 1,
      });
      if (!keyword) {
        const resp: any = await getRouteAdvantage();
        let newArr: any[] = [];
        resp.map((item) => {
          item.children = [];
          if (!item.parentId) {
            newArr.push(item);
          } else {
            newArr.find((i) => i.id === item.parentId).children.push(item);
            item.children = [];
            item.children = res.filter((i) => i.routeCode === item.code);
          }
        });
        setRouteId(newArr[0].id);
        setFndOptions(newArr ?? []);
        setOptions(res ?? []);
        setCopyOptions(res ?? []);
        console.log("走这里？？？", keyword, typeof keyword);
      } else {
        console.log(res, "res");
        setFndOptions(res ?? []);
      }
      console.log(fndOptions, "fndOptions", keyword);

      Taro.hideLoading();
    } catch (err) {
      console.log(err, "err");
      // Taro.hideLoading();
    }
  };

  const changeSelected = (value: string | any) => {
    if (changeType === "search") {
      Taro.setStorageSync(`fndSelected`, value);
      Taro.navigateBack();
    } else {
      setSelected(
        selected.includes(value)
          ? selected.filter((i) => i !== value)
          : [...selected, value],
      );
    }
    console.log(value, "value", selected);
  };
  const saveSelected = async () => {
    console.log(selected, "selected");
    try {
      await updateAffiliateInfo({
        ...affiliateInfo,
        advantageFnd: selected.join(","),
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

  const changeSearch = (info: string) => {
    setKeyword(info);
    // Taro.showLoading({
    //   title: "加载中",
    // });
    // init();
  };
  return (
    <>
      <CustomSearch
        keyword={keyword}
        onSearch={(info) => changeSearch(info)}
        searchPlaceholder="请输入目的港"
      />
      {!keyword && (
        <View className="editAffiliateAdvantage-fnd-content">
          <View className="editAffiliateAdvantage-fnd-content-left">
            {fndOptions.map((routeItem) => (
              <View
                className={"editAffiliateAdvantage-fnd-content-left-item"}
                key={routeItem.id}
                onClick={() => setRouteId(routeItem.id)}
              >
                <View className={routeId === routeItem.id ? "active" : ""}>
                  <Text>{routeItem.name}</Text>
                </View>
              </View>
            ))}
          </View>
          <View className="editAffiliateAdvantage-fnd-content-right">
            {(fndOptions.find((i) => i.id === routeId)?.children || []).map(
              (item) => (
                <View
                  className="editAffiliateAdvantage-fnd-content-right-item"
                  key={item.code}
                >
                  {item.name}
                  {item.children?.map((child) => (
                    <View
                      key={child.code}
                      onClick={() => changeSelected(child)}
                      className="editAffiliateAdvantage-fnd-content-right-item-child"
                    >
                      {child.cnName}({child.enName})
                      {changeType === "choose" && (
                        <Checkbox
                          className="checkbox-list__checkbox"
                          value={child.code}
                          checked={selected.includes(child.code)}
                          onClick={() => changeSelected(child.code)}
                          color="#167fff"
                        ></Checkbox>
                      )}
                    </View>
                  ))}
                </View>
              ),
            )}
          </View>
        </View>
      )}
      {keyword && (
        <View
          className="editAffiliateAdvantage-list"
          style={{
            paddingBottom: changeType === "choose" ? "300rpx" : "80rpx",
          }}
        >
          {fndOptions.map((item) => (
            <View
              key={item.code}
              className="editAffiliateAdvantage-list-item"
              onClick={() => changeType === "search" && changeSelected(item)}
            >
              {item.cnName}({item.enName})
              {changeType === "choose" && (
                <Checkbox
                  className="checkbox-list__checkbox"
                  value={item.code}
                  checked={selected.includes(item.code)}
                  onClick={() => changeSelected(item.code)}
                  color="#167fff"
                ></Checkbox>
              )}
            </View>
          ))}
        </View>
      )}
      {changeType === "choose" && (
        <View className="editAffiliateAdvantage-fixed">
          <View style={{ marginBottom: "24rpx" }}>已选择</View>
          <View className="editAffiliateAdvantage-fixed-selected">
            {selected.map((item) => (
              <View
                className="editAffiliateAdvantage-fixed-selected-item"
                key={item}
              >
                {options.find((i) => i.code === item)?.cnName}
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

export default AffiliateFndAdvantage;
