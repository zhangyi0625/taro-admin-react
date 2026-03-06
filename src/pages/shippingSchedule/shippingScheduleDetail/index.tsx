import { View, Text, Image } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { useState, useCallback } from "react";
import IconChoose from "../../../images/icon/choose.svg";
import IconArrival from "../../../images/icon/arrival.svg";
import IconClose from "../../../images/icon/shippingSchedule-close-icon.svg";
import { ShippingScheduleMatchingDataType } from "../../../service/shippingSchedule/shippingScheduleModel";
import { formatTime } from "../../../utils/format";

const ShippingScheduleDetail: React.FC = () => {
  const [detail, setDetail] = useState<ShippingScheduleMatchingDataType>(
    {} as ShippingScheduleMatchingDataType,
  );

  const [currentCarrier, setCurrentCarrier] = useState<string>("");

  const [visible, setVisible] = useState<boolean>(false);

  const [currentItem, setCurrentItem] = useState<any>(null);

  useLoad((options) => {
    let item = JSON.parse(options.item) ?? null;
    if (item) {
      setDetail(item);
      setCurrentCarrier(item.carrierName[0].carrier);
    }
  });

  const getCarrierList = useCallback(() => {
    return detail?.carrierName?.map((i) => i.carrier) ?? [];
  }, [detail?.carrierName]);

  const getCarrierDetail = useCallback(() => {
    return detail?.data?.filter((i) => i.carrierCode === currentCarrier) ?? [];
  }, [detail?.data, currentCarrier]);

  return (
    <>
      <View className="h-full bg-[#F5F7FA] pb-[40px]">
        <View className="p-[24px] bg-[#ffffff] border-b border-[#F5F7FA]">
          <View className="font-semibold">共舱船公司</View>
          <View className="flex flex-wrap items-center w-full mt-[4px]">
            {(detail?.carrierName ?? []).map((i, carrierIndex) => (
              <Text key={carrierIndex} className="text-[#303133]">
                {i.carrier}
                <Text className="text-[#909399]">
                  ({i.routeCode})
                  {carrierIndex < detail.carrierName.length - 1 && (
                    <Text>/</Text>
                  )}
                </Text>
              </Text>
            ))}
          </View>
        </View>
        <View className="p-[24px] bg-[#ffffff]">
          <View className="font-semibold mb-[8px]">官方船期</View>
          <View className="flex flex-wrap items-center">
            {(getCarrierList() ?? []).map((item) => (
              <View
                key={item}
                onClick={() => setCurrentCarrier(item)}
                className={`text-[26px] relative font-normal px-[24px] mr-[14px] py-[10px] rounded-[8px] ${currentCarrier === item ? "bg-[#E7F1FF] text-[#167fff]" : "bg-[#F5F7FA] text-[#606266]"}`}
              >
                {item}
                {currentCarrier === item && (
                  <Image
                    src={IconChoose}
                    className="absolute w-[40px] h-[40px] right-0 bottom-0"
                  />
                )}
              </View>
            ))}
          </View>
        </View>
        <View className="p-[20px]">
          {getCarrierDetail().map((i) => (
            <View
              key={i.routeCode}
              className="p-[24px] bg-[#ffffff] rounded-[12px] mb-[20px] cursor-pointer"
              onClick={() => {
                setCurrentItem(i);
                setVisible(true);
              }}
            >
              <View className="flex items-center mb-[20px]">
                <View className="text-[#167fff] font-semibold">
                  {i.vesselName}
                </View>
                <View className="font-normal ml-[12px]">{i.voyage}</View>
              </View>
              <View className="flex justify-between items-center">
                <View className="flex flex-col items-center text-center max-w-[220px]">
                  <View className="font-semibold">
                    {formatTime(i?.etd as unknown as string, "M/D")}({i.etdWeek}
                    )
                  </View>
                  <View>{i?.polTerminal}</View>
                </View>
                <View className="flex flex-col items-center text-center">
                  <View className="text-[#FA8C16]">
                    {Number(i.totalDuration).toFixed(0)}天
                  </View>
                  <Image
                    src={IconArrival}
                    className="w-[112px] h-[10px]"
                  ></Image>
                </View>
                <View className="flex flex-col items-center text-center max-w-[220px]">
                  <View className="font-semibold">
                    {formatTime(i?.eta as unknown as string, "M/D")}({i.etaWeek}
                    )
                  </View>
                  <View>{i?.podTerminal}</View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
      {visible && currentItem && (
        <View className="flex fixed inset-0 z-50 justify-center items-end">
          <View
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setVisible(false)}
          />
          <View
            style={{ zIndex: 61 }}
            className="bg-[#ffffff] rounded-t-[20px] w-full max-h-[80vh] overflow-y-auto shadow-lg"
          >
            <View className="flex justify-between items-center p-[34px] border-b border-gray-200">
              <Text className="text-[28px] m-auto text-center">船期详情</Text>
              <Image
                src={IconClose}
                className="w-[36px] h-[36px]"
                onClick={() => setVisible(false)}
              />
            </View>
            <View className="px-[24px] py-[28px] overflow-hidden">
              <View className="mb-[16px]">
                <Text className="text-[#909399]">
                  {!currentItem?.isTransit ? "中转" : "直航"}：
                </Text>
                <Text>
                  {currentItem?.pol?.cnName || "-"} -{" "}
                  {currentItem?.pod?.cnName || "-"}
                </Text>
              </View>
              <View className="mb-[16px]">
                <Text className="text-[#909399]">共舱船公司：</Text>
                <Text>
                  {(detail?.carrierName ?? [])
                    .map((i) => `${i.carrier}(${i.routeCode})`)
                    .join("/") || "-"}
                </Text>
              </View>
              <View className="mb-[16px]">
                <Text className="text-[#909399]">船名航次：</Text>
                <Text>
                  {currentItem?.vesselName || "-"} {currentItem?.voyage || "-"}
                </Text>
              </View>
              <View className="mb-[16px]">
                <Text className="text-[#909399]">起运码头：</Text>
                <Text>{currentItem?.polTerminal || "-"}</Text>
              </View>
              <View className="mb-[16px]">
                <Text className="text-[#909399]">截港时间：</Text>
                <Text>{currentItem?.cutOff || "-"}</Text>
              </View>
              <View className="mb-[16px]">
                <Text className="text-[#909399]">截单时间：</Text>
                <Text>{currentItem?.siCutoff || "-"}</Text>
              </View>
              <View className="mb-[16px]">
                <Text className="text-[#909399]">截VGM时间：</Text>
                <Text>{currentItem?.vgmCutoff || "-"}</Text>
              </View>
              <View className="mb-[16px]">
                <Text className="text-[#909399]">ETD：</Text>
                <Text>
                  {currentItem?.etd}({currentItem?.etdWeek || "-"})
                </Text>
              </View>
              <View className="mb-[16px]">
                <Text className="text-[#909399]">航程：</Text>
                <Text>
                  {currentItem?.totalDuration
                    ? Number(currentItem?.totalDuration).toFixed(0) + "天"
                    : "-"}
                </Text>
              </View>
              <View className="mb-[16px]">
                <Text className="text-[#909399]">ETA：</Text>
                <Text>
                  {currentItem?.eta}({currentItem?.etaWeek || "-"})
                </Text>
              </View>
              <View className="mb-[16px]">
                <Text className="text-[#909399]">目的码头：</Text>
                <Text>{currentItem?.podTerminal || "-"}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default ShippingScheduleDetail;
