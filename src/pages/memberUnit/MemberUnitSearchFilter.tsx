import { View, Image, Input, Text } from "@tarojs/components";
import { useImperativeHandle, useState } from "react";
import type { MemberUnitSearchParams } from "src/service/memberUnit/memberUnitModel";
import ArrowRight from "../../images/icon/arrow-icon.svg";
import Collapse from "../../images/icon/collapse.svg";
import Expand from "../../images/icon/expand.svg";
import "./index.scss";
import Taro, { useDidHide, useDidShow, useLoad } from "@tarojs/taro";
import React from "react";
import CloseIcon from "../../images/icon/clear-icon.png";

export type MemberUnitSearchFilterProps = {
  onSearchFilterChange: (searchFilter: MemberUnitSearchParams) => void;
  navigateTo: (url: string) => void;
  onChangeSearchFilter: (searchFilter: MemberUnitSearchParams) => void;
  onClickClear: (key: string) => void;
};

export type SearchFilterOptionsType = {
  label: string;
  value: string;
  key: string;
  jumpUrl: string;
  selectedKey: string;
  searchValue: string;
};

export type MemberUnitSearchFilterRef = {
  onRefresh: () => void;
};

const MemberUnitSearchFilter = React.forwardRef<
  MemberUnitSearchFilterRef,
  MemberUnitSearchFilterProps
>(
  (
    { onSearchFilterChange, navigateTo, onChangeSearchFilter, onClickClear },
    ref,
  ) => {
    const [isCollapse, setIsCollapse] = useState<boolean>(true);

    const [searchFilter, setSearchFilter] = useState<MemberUnitSearchParams>({
      advantagePor: "",
      advantageFnd: "",
      advantageCarrier: "",
      advantageRoute: "",
    });

    const searchKey = {
      porCode: "advantagePor",
      fndCode: "advantageFnd",
      carrier: "advantageCarrier",
      route: "advantageRoute",
    };

    const [searchFilterOptions, setSearchFilterOptions] = useState<
      SearchFilterOptionsType[]
    >([
      {
        label: "起运港",
        value: "",
        key: "porCode",
        selectedKey: "porSelected",
        jumpUrl:
          "/pages/affiliate/editAffiliateAdvantage/index?type=por&name=优势起运港&changeType=search",
        searchValue: "",
      },
      {
        label: "目的港",
        value: "",
        key: "fndCode",
        selectedKey: "fndSelected",
        jumpUrl:
          "/pages/affiliate/editAffiliateAdvantage/index?type=fnd&name=优势目的港&changeType=search",
        searchValue: "",
      },
      {
        label: "船公司",
        value: "",
        key: "carrier",
        selectedKey: "carrierSelected",
        jumpUrl:
          "/pages/affiliate/editAffiliateAdvantage/index?type=carrier&name=优势船东&changeType=search",
        searchValue: "",
      },
      {
        label: "航线",
        value: "",
        key: "route",
        selectedKey: "routeSelected",
        jumpUrl:
          "/pages/affiliate/editAffiliateAdvantage/index?type=route&name=优势航线&changeType=search",
        searchValue: "",
      },
    ]);

    useImperativeHandle(ref, () => ({
      onRefresh: () => refresh(),
    }));

    const refresh = () => {
      searchFilterOptions.forEach((item) => {
        item.value = "";
        item.searchValue = "";
        // setTimeout(() => {
        Taro.removeStorageSync(`${item.selectedKey}`);
        // }, 3000);
      });
    };

    useLoad(() => {
      // console.log("useLoad");
    });

    useDidShow(() => {
      searchFilterOptions.forEach((item) => {
        let items = Taro.getStorageSync(`${item.selectedKey}`) ?? null;
        console.log("zzzzzz", items);
        if ((item.key === "porCode" || item.key === "fndCode") && items) {
          item.value = items["cnName"] + " - " + items["enName"];
          item.searchValue = items["unlocode"];
          if (item.key === "porCode") {
            setSearchFilter({
              ...searchFilter,
              advantagePor: items["unlocode"],
            });
            // onChangeSearchFilter({
            //   ...searchFilter,
            //   advantagePor: items["unlocode"],
            // });
          } else {
            setSearchFilter({
              ...searchFilter,
              advantageFnd: items["unlocode"],
            });
            // onChangeSearchFilter({
            //   ...searchFilter,
            //   advantageFnd: items["unlocode"],
            // });
          }
        } else if (item.key === "route") {
          item.value = items?.name ?? "";
          item.searchValue = items?.name ?? "";
          setSearchFilter({
            ...searchFilter,
            advantageRoute: items?.name ?? "",
          });
          // onChangeSearchFilter({
          //   ...searchFilter,
          //   advantageRoute: items?.name ?? "",
          // });
        } else {
          item.value = items?.cnName ?? "";
          item.searchValue = items?.cnName ?? "";
          setSearchFilter({
            ...searchFilter,
            advantageCarrier: items?.cnName ?? "",
          });
          // onChangeSearchFilter({
          //   ...searchFilter,
          //   advantageCarrier: items?.cnName ?? "",
          // });
        }
      });
      // console.log(searchFilterOptions);
      setSearchFilterOptions([...searchFilterOptions]);
      // setTimeout(() => {
      //   console.log(searchFilter, "onChangeSearchFilter");
      onChangeSearchFilter(searchFilter);
      // }, 1500);
    });

    const clearValue = (key: SearchFilterOptionsType, event: any) => {
      event.stopPropagation();
      Taro.removeStorageSync(`${key.selectedKey}`);
      setSearchFilter({
        ...searchFilter,
        [searchKey[key.key]]: "",
      });
      searchFilterOptions.map((item) => {
        if (item.key === key.key) {
          item.value = "";
          item.searchValue = "";
        }
      });
      setSearchFilterOptions([...searchFilterOptions]);
      // onChangeSearchFilter({
      //   ...searchFilter,
      //   [searchKey[key.key]]: "",
      // });
      onClickClear(key.key);
    };
    return (
      <View className="memberUnit-filter">
        {(isCollapse
          ? searchFilterOptions.slice(0, 2)
          : searchFilterOptions
        ).map((item) => (
          <View className="memberUnit-filter-item" key={item.key}>
            <View
              className="inline-flex"
              style={{ flex: 1 }}
              onClick={() => navigateTo(item.jumpUrl)}
            >
              <View className="memberUnit-filter-item-label">{item.label}</View>
              <Input
                value={item.value}
                disabled={true}
                className="memberUnit-filter-item-input"
                placeholder={`请选择${item.label}`}
              />
              {item.value && (
                <Image
                  className="clear-icon"
                  onClick={(e) => clearValue(item, e)}
                  src={CloseIcon}
                />
              )}
            </View>
            <Image className="arrow-icon" src={ArrowRight} />
          </View>
        ))}
        <View
          className="inline-flex memberUnit-filter-collapse"
          onClick={() => setIsCollapse(!isCollapse)}
        >
          <Text className="">{isCollapse ? "展开更多查找条件" : "收起"}</Text>
          <Image className="arrow-icon" src={isCollapse ? Expand : Collapse} />
        </View>
      </View>
    );
  },
);

export default MemberUnitSearchFilter;
