import { View, Text, Image, Checkbox } from "@tarojs/components";
import { useDidHide, useDidShow } from "@tarojs/taro";
import {
  getShippingScheduleLogPage,
  getShippingScheduleQuery,
} from "../../service/shippingSchedule/shippingScheduleApi";
import Taro from "@tarojs/taro";
import clsx from "clsx";
import IconStartPort from "../../images/icon/start-port.svg";
import IconLine from "../../images/icon/shipping-line.svg";
import IconEndPort from "../../images/icon/end-port.svg";
import ArrowRight from "../../images/icon/arrow-icon.svg";
// import IconClose from "../../images/icon/shippingSchedule-close-icon.svg";
import { useCallback, useEffect, useState } from "react";
import type {
  ShippingScheduleItem,
  ShippingScheduleLogType,
  ShippingScheduleMatchingDataType,
  ShippingScheduleParams,
} from "../../service/shippingSchedule/shippingScheduleModel";
import ShippingScheduleResult from "./shippingScheduleResult";

export type ShippingScheduleDetailType = {
  straight: {
    carrierGroup: number;
    carrierLength: number;
    shippingScheduleLength: number;
    rawData?: ShippingScheduleMatchingDataType[];
    list?: ShippingScheduleItem[];
  } | null;
  transfer: {
    carrierGroup: number;
    carrierLength: number;
    shippingScheduleLength: number;
    rawData?: ShippingScheduleMatchingDataType[];
    list?: ShippingScheduleItem[];
  } | null;
};

const ShippingSchedule: React.FC = () => {
  const [shippingScheduleDetail, setShippingScheduleDetail] =
    useState<ShippingScheduleDetailType>({
      straight: {
        carrierGroup: 0,
        carrierLength: 0,
        shippingScheduleLength: 0,
      },
      transfer: {
        carrierGroup: 0,
        carrierLength: 0,
        shippingScheduleLength: 0,
      },
    });

  const [copyShippingScheduleData, setCopyShippingScheduleData] = useState<
    ShippingScheduleItem[]
  >([]);

  const [shippingScheduleLog, setShippingScheduleLog] = useState<
    ShippingScheduleLogType[]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [carrierList, setCarrierList] = useState<string[]>([]);

  const [searchParams, setSearchParams] = useState<ShippingScheduleParams>({
    porCode: "",
    porInfo: "",
    fndInfo: "",
    fndCode: "",
  });

  const [params, setParams] = useState<{ visible: boolean; carrier: string }>({
    visible: false,
    carrier: "",
  });

  const searchButtonClass = clsx(
    "h-[88rpx] leading-[88rpx] text-center text-[32rpx] mt-[32px] bg-[#FA8C16] text-[#ffffff] rounded-[12rpx]",
  );

  useDidShow(() => {
    setCarrierList([]);
    init();
    let porSelected = Taro.getStorageSync("porSelected") ?? null;
    let fndSelected = Taro.getStorageSync("fndSelected") ?? null;
    setSearchParams({
      porCode: porSelected?.code || "",
      porInfo: porSelected?.code
        ? porSelected?.enName + "-" + porSelected?.cnName
        : undefined,
      fndCode: fndSelected?.code || "",
      fndInfo: fndSelected?.code
        ? fndSelected?.enName + "-" + fndSelected?.cnName
        : undefined,
    });
  });

  useDidHide(() => {
    console.log("useDidHide");
  });

  const init = async () => {
    try {
      const res: any = await getShippingScheduleLogPage({
        page: 1,
        limit: 9999,
      });
      setShippingScheduleLog(res || []);
    } catch (err) {
      Taro.showToast({
        title: err.message || "船期查询日志分页查询失败",
        icon: "none",
      });
    }
  };

  const onSearch = async () => {
    if (!searchParams.porCode) {
      Taro.showToast({
        title: "请选择起运港",
        icon: "none",
      });
      return;
    }
    if (!searchParams.fndCode) {
      Taro.showToast({
        title: "请选择目的港",
        icon: "none",
      });
      return;
    }
    Taro.showLoading({
      title: "船期数据查询中",
    });
    try {
      const res: any = await getShippingScheduleQuery({
        porCode: searchParams.porCode,
        fndCode: searchParams.fndCode,
      });
      // 处理船期数据
      disposeShippingScheduleData(res || []);
      setCopyShippingScheduleData(res || []);
      setLoading(true);
      setTimeout(() => {
        Taro.removeStorageSync("porSelected");
        Taro.removeStorageSync("fndSelected");
      }, 5000);
    } catch (err) {
      Taro.showToast({
        title: err.message || "船期查询失败",
        icon: "none",
      });
      setShippingScheduleDetail({
        straight: null,
        transfer: null,
      });
      Taro.hideLoading();
    }
  };

  const disposeShippingScheduleData = (newArr: ShippingScheduleItem[]) => {
    // 直达
    const transit = newArr.filter((item) => !item.isTransit);
    // 中转
    const unTransit = newArr.filter((item) => item.isTransit);
    // 船公司筛选列表
    const carrierOptions = Array.from(
      new Set([...newArr.map((item) => item.carrierCode)]),
    ) as string[];
    setCarrierList(carrierOptions);
    console.log(transit, unTransit, "carrierOptions", carrierOptions);

    /**
     * 组合 共舱数据（规则）
     * 1、isTransit区分直航、中转船期
     * 2、根据船名、航次相同整合船公司（航线代码）
     * 3、排序根据更新时间
     */
    for (const key of Object.keys(shippingScheduleDetail) as Array<
      keyof typeof shippingScheduleDetail
    >) {
      const detail = shippingScheduleDetail[key];
      if (detail) {
        detail.carrierLength = new Set([
          ...(key === "straight" ? transit : unTransit).map(
            (item) => item.carrierCode,
          ),
        ]).size;
        key === "straight" && matchingShipSharing(transit, detail, "straight");
        key === "transfer" &&
          matchingShipSharing(unTransit, detail, "transfer");
      }
    }
  };

  const matchingShipSharing = (
    newData: ShippingScheduleItem[],
    info: any,
    key: "straight" | "transfer",
  ) => {
    let vesselNameArr: string[] = [];
    let voyageArr: string[] = [];
    let matchingData: Partial<ShippingScheduleMatchingDataType>[] = [];
    let carrierRouteArr: string[] = [];
    let carrierArr: string[] = [];
    let options: Omit<ShippingScheduleMatchingDataType, "voyage">[] = [];
    let shareCabinsInfoList: string[] = [];
    newData.forEach((item) => {
      if (
        key === "straight"
          ? !shareCabinsInfoList.includes(item.shareCabinsInfoList as string)
          : !vesselNameArr.includes(item.vesselName) &&
            !voyageArr.includes(item.voyage) &&
            !carrierArr.includes(item.carrierCode)
      ) {
        matchingData.push({
          carrierCode: item.carrierCode,
          routeCode: item.routeCode,
          vesselName: item.vesselName,
          voyage: item.voyage,
          carrierName: ([] as { carrier: string; routeCode: string }[]).concat({
            carrier: item.carrierCode,
            routeCode: item.routeCode,
          }),
          shareCabinsInfoList: item.shareCabinsInfoList as string,
          data: [item],
        });
        key === "transfer" && vesselNameArr.push(item.vesselName);
        key === "transfer" && voyageArr.push(item.voyage);
        key === "transfer" && carrierArr.push(item.carrierCode);
        key === "straight" &&
          shareCabinsInfoList.push(item.shareCabinsInfoList as string);
      } else {
        matchingData.forEach((ele) => {
          if (
            key === "straight"
              ? ele.shareCabinsInfoList === item.shareCabinsInfoList
              : ele.carrierCode === item.carrierCode
          ) {
            (ele.carrierName ||= []).push({
              carrier: item.carrierCode,
              routeCode: item.routeCode,
            });
            (ele.data ||= []).push(item);
            ele.data = ele.data.sort((a, b) => {
              // 转换日期格式为 iOS 支持的格式
              const formatDate = (dateStr: string) => {
                return dateStr.replace(/\s+/, "T");
              };
              return (
                new Date(formatDate(a.etd)).getTime() -
                new Date(formatDate(b.etd)).getTime()
              );
            });
          }
        });
      }
    });
    matchingData.map((item) => {
      item.carrierName =
        item.carrierName && item.carrierName.length > 0
          ? Array.from(
              new Set(item.carrierName.map((c: any) => JSON.stringify(c))),
            ).map((str) => JSON.parse(str))
          : [];
    });
    console.log(matchingData, "matchingData");

    setTimeout(() => {
      // key === 'straight' &&
      matchingData.map((i) => {
        if (carrierRouteArr.indexOf(i.carrierCode as string) === -1) {
          options.push({
            routeCode: i.routeCode ?? "",
            carrierCode: i.carrierCode ?? "",
            vesselName: i.vesselName ?? "",
            carrierName: i.carrierName || [],
            data:
              key === "straight"
                ? i.data && i.data[0]
                  ? [i.data[0]]
                  : []
                : i.data || [],
          });
          carrierRouteArr.push(i.carrierCode as string);
        } else {
          options.map((ele) => {
            // 特殊情况:routeCode为空 全部扔进一组
            if (ele.carrierCode === i.carrierCode || !i.routeCode) {
              // push individual items (spread) so we don't push an array into ele.data
              ele.data.push(
                ...(key === "straight"
                  ? i.data?.[0]
                    ? [i.data[0]]
                    : []
                  : i.data || []),
              );
            }
          });
        }
      });
      key === "transfer" &&
        options.map((i) => {
          // Convert the carrierName array into an object shape expected by the UI,
          // and cast to any to avoid TypeScript assignment errors when the original
          // type is an array.
          i.carrierName = [
            {
              carrier: i.carrierName[0]?.carrier,
              routeCode: (i.carrierName as any[])
                .map((e: any) => e.routeCode)
                .join(","),
            },
          ];
          return {
            ...i,
          };
        });
      info.carrierGroup =
        key === "straight" ? matchingData.length : options.length;
      info.shippingScheduleLength = (
        key === "straight" ? matchingData : options
      ).reduce((acc, val) => {
        return acc.concat(val.data as any);
      }, []).length;
      info.rawData = key === "straight" ? matchingData : options;
      console.log(options, info, shippingScheduleDetail, carrierList);
      Taro.hideLoading();
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    searchParams.porCode && searchParams.fndCode && onSearch();
  }, [searchParams]);

  const historySearch = (item: ShippingScheduleLogType) => {
    setSearchParams({
      porCode: item.porCode,
      porInfo: item.por?.enName + "-" + item.por?.cnName,
      fndCode: item.fndCode,
      fndInfo: item.fnd?.enName + "-" + item.fnd?.cnName,
    });
  };

  const jumpToDetail = (item: ShippingScheduleMatchingDataType) => {
    Taro.navigateTo({
      url:
        "/pages/shippingSchedule/shippingScheduleDetail/index?item=" +
        JSON.stringify(item),
    });
  };

  const changeCarrierModal = () => {
    setParams({ visible: true, carrier: params.carrier });
  };

  const searchFilterByCarrier = () => {
    setLoading(true);
    setParams({ visible: false, carrier: params.carrier });
    disposeShippingScheduleData(
      params.carrier
        ? copyShippingScheduleData.filter((item) =>
            params.carrier
              .split(",")
              .filter(Boolean)
              .includes(item.carrierCode),
          )
        : copyShippingScheduleData,
    );
  };

  const getCarrierList = useCallback(() => {
    return Array.from(
      new Set([...copyShippingScheduleData.map((item) => item.carrierCode)]),
    ) as string[];
  }, [copyShippingScheduleData]);

  return (
    <View className="bg-[#F5F7FA] h-fit px-[20px] py-[24px]">
      <View className="bg-[#ffffff] p-[20px] flex flex-col">
        <View className="flex items-center">
          <Image
            src={IconStartPort}
            mode="widthFix"
            className="w-[36px] h-[36px] my-[20px]"
          ></Image>
          <View
            onClick={() =>
              Taro.navigateTo({
                url: "/pages/affiliate/editAffiliateAdvantage/index?type=por&name=优势起运港&changeType=search&isOther=true",
              })
            }
            className="flex items-center  bg-[#F5F7FA] p-[24px] justify-between ml-[24px] w-full rounded-[8px]"
          >
            <Text
              className={
                searchParams.porCode
                  ? "text-[#303133] font-semibold"
                  : "text-[#909399] font-semibold"
              }
            >
              {searchParams.porInfo ?? "选择起运港"}
            </Text>
            <Image src={ArrowRight} className="arrow-icon" />
          </View>
        </View>
        <Image
          src={IconLine}
          mode="aspectFill"
          className="w-[20px] h-[34px] ml-[6px]"
        ></Image>
        <View className="flex items-center">
          <Image
            src={IconEndPort}
            mode="widthFix"
            className="w-[36px] h-[36px] my-[20px]"
          ></Image>
          <View
            onClick={() =>
              Taro.navigateTo({
                url: "/pages/affiliate/editAffiliateAdvantage/index?type=fnd&name=优势目的港&changeType=search",
              })
            }
            className="flex items-center bg-[#F5F7FA] p-[24px] justify-between ml-[24px] w-full rounded-[8px]"
          >
            <Text
              className={
                searchParams.fndCode
                  ? "text-[#303133] font-semibold"
                  : "text-[#909399] font-semibold"
              }
            >
              {searchParams.fndInfo ?? "选择目的港"}
            </Text>
            <Image src={ArrowRight} className="arrow-icon" />
          </View>
        </View>
        <View className={searchButtonClass} onClick={onSearch}>
          查询
        </View>
      </View>
      {shippingScheduleLog.length > 0 && carrierList.length === 0 && (
        <View className="mt-[20px] bg-[#ffffff] py-[30px] text-[28px]">
          <View className="font-semibold px-[24px] pb-[30px] border-b-[1px] border-[#F5F7FA]">
            历史记录
          </View>
          {shippingScheduleLog.map((item, index) => (
            <View
              key={index}
              className="py-[16px] px-[22px] border-b-[1px] border-[#F5F7FA] font-normal"
              onClick={() => historySearch(item)}
            >
              <Text>{item.por?.enName + " " + item.por?.cnName}</Text> -{" "}
              <Text>{item.fnd?.enName + " " + item.fnd?.cnName}</Text>
            </View>
          ))}
        </View>
      )}
      {!loading && carrierList.length > 0 && (
        <ShippingScheduleResult
          carrier={params.carrier}
          changeCarrierModal={changeCarrierModal}
          shippingScheduleDetail={shippingScheduleDetail}
          jumpToDetail={jumpToDetail}
        />
      )}
      {params.visible && (
        <View className="flex fixed inset-0 z-50 justify-center items-end">
          <View className="absolute inset-0 bg-black bg-opacity-50" />
          <View
            style={{ zIndex: 61 }}
            className="bg-[#ffffff] relative rounded-t-[20px] w-full max-h-[80vh] overflow-y-auto shadow-lg"
          >
            <View className="flex justify-between items-center p-[34px] border-b border-gray-200">
              <Text className="text-[28px] m-auto text-center">选择船公司</Text>
              {/* <Image
                src={IconClose}
                className="w-[36px] h-[36px]"
                onClick={() =>
                  setParams({ visible: false, carrier: params.carrier })
                }
              /> */}
            </View>
            <View className="overflow-y-scroll max-h-[1000px] pb-[216px]">
              {getCarrierList().map((item, index) => (
                <View
                  key={index}
                  className="flex items-center justify-between py-[30px] px-[32px] border-b-[1px] border-[#F5F7FA] font-normal"
                >
                  <Text>{item}</Text>
                  <Checkbox
                    className="checkbox-list__checkbox"
                    value={item}
                    checked={params.carrier.split(",").includes(item)}
                    onClick={() =>
                      setParams({
                        visible: true,
                        carrier: params.carrier.split(",").includes(item)
                          ? params.carrier.replace(item, "")
                          : params.carrier + "," + item,
                      })
                    }
                    color="#167fff"
                  ></Checkbox>
                </View>
              ))}
            </View>
            <View
              style={{ boxShadow: "0rpx -2rpx 4rpx 0rpx rgba(0,0,0,0.08)" }}
              className="absolute bottom-0 w-full flex items-center py-[28px] px-[24px] border-t-[1px] border-[#F5F7FA] font-normal"
            >
              <View
                onClick={() => setParams({ visible: true, carrier: "" })}
                className="text-center py-[22px] w-full bg-[#fff] font-semibold text-[32px] text-[##606266] border-[1px] border-[#BFC2CC] rounded-[8px]"
              >
                重置
              </View>
              <View
                onClick={searchFilterByCarrier}
                className="text-center py-[22px] ml-[20px] w-full bg-[#FA8C16] font-semibold text-[32px] text-[#fff] rounded-[8px]"
              >
                确定
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ShippingSchedule;
