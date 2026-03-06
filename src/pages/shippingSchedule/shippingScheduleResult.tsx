import { View, Text, Image } from "@tarojs/components";
import ArrowRight from "../../images/icon/shippingSchedule-arrow-right.svg";
import React from "react";
import type { ShippingScheduleDetailType } from ".";
import { ShippingScheduleMatchingDataType } from "../../service/shippingSchedule/shippingScheduleModel";
import { formatTime } from "../../utils/format";

export type ShippingScheduleResultProps = {
  shippingScheduleDetail: ShippingScheduleDetailType;
  carrier: string;
  jumpToDetail: (item: ShippingScheduleMatchingDataType) => void;
  changeCarrierModal: () => void;
};

const ShippingScheduleResult: React.FC<ShippingScheduleResultProps> = ({
  shippingScheduleDetail,
  carrier,
  jumpToDetail,
  changeCarrierModal,
}) => {
  return (
    <>
      <View className="">
        <View
          onClick={changeCarrierModal}
          className="bg-[#E3EFFF] px-[24px] pb-[44px] relative top-[20px] z-[1] flex items-center justify-between rounded-[12px]"
        >
          <Text className="font-semibold text-[#1677FF] pt-[24px]">
            {carrier
              ? carrier.split(",").filter(Boolean).join("、")
              : "全部船公司"}
          </Text>
          <Image src={ArrowRight} className="arrow-icon pt-[24px]" />
        </View>
        {shippingScheduleDetail.straight && (
          <View className="bg-[#fff] rounded-[12px] z-[10] relative">
            <View className="flex items-center py-[20px] px-[24px] border-b-[1px] border-[#F5F7FA]">
              <View className="py-[8px] px-[12px] text-[#ffffff] rounded-[4px] bg-[#00C2A2] text-[24px] font-semibold">
                直航船期
              </View>
              <Text className="ml-[12px] font-normal">
                共{shippingScheduleDetail.straight.carrierGroup}组船，
                {shippingScheduleDetail.straight.carrierLength}家船公司，
                {shippingScheduleDetail.straight.shippingScheduleLength}条船期
              </Text>
            </View>
            <View className="p-[24px]">
              {shippingScheduleDetail.straight.rawData?.map((item, index) => (
                <View
                  key={index}
                  className="flex flex-col items-center mb-[24px]"
                >
                  <View className="flex flex-wrap items-center w-full">
                    {item.carrierName.map((i, carrierIndex) => (
                      <Text key={carrierIndex} className="text-[#303133]">
                        {i.carrier}
                        <Text className="text-[#909399]">
                          ({i.routeCode})
                          {carrierIndex < item.carrierName.length - 1 && (
                            <Text>/</Text>
                          )}
                        </Text>
                      </Text>
                    ))}
                  </View>
                  <View className="flex justify-between w-full items-center mt-[16px]">
                    <Text>
                      <Text className="text-[#1677FF]">
                        {formatTime(
                          item.data.filter(
                            (i) => i.isReferenceCarrier == "1",
                          )[0]?.etd as unknown as string,
                          "M/D",
                        )}
                        ({item.data[0]?.etaWeek}){" "}
                      </Text>
                      <Text className="text-[#FA8C16]">
                        {Number(item.data[0]?.totalDuration).toFixed(0)}天
                      </Text>
                    </Text>
                    <Text>
                      <Text className="text-[#1677FF]">
                        {formatTime(
                          item.data.filter(
                            (i) => i.isReferenceCarrier == "1",
                          )[1]?.etd as unknown as string,
                          "M/D",
                        )}
                        ({item.data[1]?.etaWeek}){" "}
                      </Text>
                      <Text className="text-[#FA8C16]">
                        {Number(item.data[1]?.totalDuration).toFixed(0)}天
                      </Text>
                    </Text>
                    <View
                      onClick={() => jumpToDetail(item)}
                      className="w-[112px] h-[56px] bg-[#1677FF] leading-[56px] text-center font-normal text-[#fff] rounded-[4px]"
                    >
                      更多
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
        {shippingScheduleDetail.transfer && (
          <View className="bg-[#fff] rounded-[12px] z-[10] relative mt-[20px]">
            <View className="flex items-center py-[20px] px-[24px] border-b-[1px] border-[#F5F7FA]">
              <View className="py-[8px] px-[12px] text-[#ffffff] rounded-[4px] bg-[#00C2A2] text-[24px] font-semibold">
                直航船期
              </View>
              <Text className="ml-[12px] font-normal">
                共{shippingScheduleDetail.transfer.carrierGroup}组船，
                {shippingScheduleDetail.transfer.carrierLength}家船公司，
                {shippingScheduleDetail.transfer.shippingScheduleLength}条船期
              </Text>
            </View>
            <View className="p-[24px]">
              {shippingScheduleDetail.transfer.rawData?.map((item, index) => (
                <View
                  key={index}
                  className="flex flex-col items-center mb-[24px]"
                >
                  <View className="flex flex-wrap items-center w-full">
                    {item.carrierName.map((i, carrierIndex) => (
                      <Text key={carrierIndex} className="text-[#303133]">
                        {i.carrier}
                        <Text className="text-[#909399]">
                          ({i.routeCode})
                          {carrierIndex < item.carrierName.length - 1 && (
                            <Text>/</Text>
                          )}
                        </Text>
                      </Text>
                    ))}
                  </View>
                  <View className="flex justify-between w-full items-center mt-[16px]">
                    <Text>
                      <Text className="text-[#1677FF]">
                        {formatTime(
                          item.data.filter(
                            (i) => i.isReferenceCarrier == "1",
                          )[0]?.etd as unknown as string,
                          "M/D",
                        )}
                        ({item.data[0]?.etaWeek}){" "}
                      </Text>
                      <Text className="text-[#FA8C16]">
                        {Number(item.data[0]?.totalDuration).toFixed(0)}天
                      </Text>
                    </Text>
                    <Text>
                      <Text className="text-[#1677FF]">
                        {formatTime(
                          item.data.filter(
                            (i) => i.isReferenceCarrier == "1",
                          )[1]?.etd as unknown as string,
                          "M/D",
                        )}
                        ({item.data[1]?.etaWeek}){" "}
                      </Text>
                      <Text className="text-[#FA8C16]">
                        {Number(item.data[1]?.totalDuration).toFixed(0)}天
                      </Text>
                    </Text>
                    <View
                      onClick={() => jumpToDetail(item)}
                      className="w-[112px] h-[56px] bg-[#1677FF] leading-[56px] text-center font-normal text-[#fff] rounded-[4px]"
                    >
                      更多
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export default ShippingScheduleResult;
