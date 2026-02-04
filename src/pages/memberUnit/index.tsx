import React, { useEffect, useRef, useState } from "react";
import { View } from "@tarojs/components";
import {
  useDidHide,
  useDidShow,
  usePullDownRefresh,
  useReady,
  useTabItemTap,
} from "@tarojs/taro";
import MemberUnitSearchFilter, {
  MemberUnitSearchFilterRef,
} from "./MemberUnitSearchFilter";
import {
  MemberUnitDetailType,
  MemberUnitSearchParams,
} from "src/service/memberUnit/memberUnitModel";
import CustomSearch from "../../components/CustomSearch";
import Taro from "@tarojs/taro";
import CollectionItem from "../collection/CollectionItem";
import { getMemberUnitList } from "../../service/memberUnit/memberUnitApi";

const MemberUnit: React.FC = () => {
  const [searchFilter, setSearchFilter] = useState<MemberUnitSearchParams>({
    isShow: true,
  });

  const [memberUnitList, setMemberUnitList] = useState<MemberUnitDetailType[]>(
    [],
  );

  const searchFilterRef = useRef<MemberUnitSearchFilterRef>(null);

  const searchKey = {
    porCode: "advantagePor",
    fndCode: "advantageFnd",
    carrier: "advantageCarrier",
    route: "advantageRoute",
  };

  useTabItemTap(() => {
    searchFilterRef.current?.onRefresh();
  });

  // 可以使用所有的 React Hooks
  useEffect(() => {
    // console.log("useEffect");
  }, []);

  // 对应 onReady
  useReady(() => {
    // console.log("useReady");
  });

  // 对应 onShow
  useDidShow(() => {
    // console.log("useDidShow");
    // init();
  });

  const init = async () => {
    try {
      const resp: any = await getMemberUnitList({
        ...searchFilter,
        isShow: true,
      });
      setMemberUnitList(resp ?? []);
      console.log(resp, "resp", memberUnitList);
    } catch (err) {
      console.log(err);
    }
  };

  // 对应 onHide
  useDidHide(() => {
    // console.log("useDidHide");
  });

  // Taro 对所有小程序页面生命周期都实现了对应的自定义 React Hooks 进行支持
  // 详情可查阅：【Hooks】
  usePullDownRefresh(() => {
    // console.log("usePullDownRefresh");
  });

  const changeSearchFilter = (keyword: string) => {
    setSearchFilter({ ...searchFilter, keyword: keyword.trim() });
    // init();
  };

  useEffect(() => {
    init();
  }, [searchFilter]);

  const onChangeSearchFilter = (searchFilter: MemberUnitSearchParams) => {
    let porParams = Taro.getStorageSync("porSelected");
    let fndParams = Taro.getStorageSync("fndSelected");
    let routeParams = Taro.getStorageSync("routeSelected");
    let carrierParams = Taro.getStorageSync("carrierSelected");
    console.log(
      porParams,
      "porParams",
      fndParams,
      "fndParams",
      routeParams,
      "routeParams",
      carrierParams,
    );
    if (porParams) {
      setSearchFilter({ ...searchFilter, advantagePor: porParams.code });
    }
    if (fndParams) {
      setSearchFilter({ ...searchFilter, advantageFnd: fndParams.code });
    }
    if (routeParams) {
      setSearchFilter({ ...searchFilter, advantageRoute: routeParams.code });
    }
    if (carrierParams) {
      setSearchFilter({
        ...searchFilter,
        advantageCarrier: carrierParams.code,
      });
    }
  };

  return (
    <View className="memberUnit">
      <CustomSearch
        keyword={searchFilter?.keyword || ""}
        onSearch={(info) => changeSearchFilter(info)}
        searchPlaceholder="请输入关键词：公司、业务、航线等"
      />
      <MemberUnitSearchFilter
        ref={searchFilterRef}
        onSearchFilterChange={(info) => setSearchFilter(info)}
        onChangeSearchFilter={(info) => onChangeSearchFilter(info)}
        navigateTo={(url) => Taro.navigateTo({ url })}
        onClickClear={(key) => {
          setSearchFilter({
            ...searchFilter,
            [searchKey[key]]: "",
          });
        }}
      />
      {memberUnitList.map((item) => (
        <CollectionItem key={item.id} item={item} />
      ))}
    </View>
  );
};

export default MemberUnit;
