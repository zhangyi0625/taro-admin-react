import { View, Image, Text } from "@tarojs/components";
import ArrowRight from "../../../images/icon/arrow-icon.svg";
import CloseIcon from "../../../images/icon/close-icon.svg";
import "./index.scss";
import { TrackingScheduleInfoBySort } from "../config";
import { useState } from "react";
import { useLoad } from "@tarojs/taro";
import {
  getLogisticsTrackingDetail,
  updateLogisticsTracking,
} from "../../../service/user/userApi";
import Taro from "@tarojs/taro";

const LogisticsTrackingDetail = () => {
  const [detail, setDetail] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useLoad((options) => {
    // setDetail(options);
    init(options.id);
  });

  const init = async (id?: string) => {
    try {
      const resp: any = await getLogisticsTrackingDetail(id ?? detail.id);
      setDetail(resp);
    } catch (err) {
      console.log(err);
    }
  };

  const update = async () => {
    await updateLogisticsTracking(detail.id);
    init();
    Taro.showToast({
      title: "更新成功",
      icon: "success",
    });
  };

  const openDetail = (item: any) => {
    console.log(item, "item");
    setSelectedItem(item);
    setModalVisible(true);
  };

  const getValue = () => {
    let arr =
      TrackingScheduleInfoBySort.find(
        (i: any) => i.state === selectedItem?.stateCode,
      )?.tableColumn ?? [];
    arr.map((i) => {
      if (selectedItem[i.prop]) {
        // i.value = selectedItem[i.prop];
        Reflect.set(i, "value", selectedItem[i.prop]);
      }
    });
    return arr;
  };
  return (
    <>
      <View className="logistics-tracking-detail">
        <View className="logistics-tracking-detail-title">
          {detail?.updateTime}更新
          <View className="btn" onClick={update}>
            更新
          </View>
        </View>
        <View className="logistics-tracking-detail-content">
          {TrackingScheduleInfoBySort.map((item) => (
            <View
              key={item.state}
              className="logistics-tracking-detail-content-item"
            >
              <View style={{ display: "flex", alignItems: "flex-start" }}>
                <View className="flex-col" style={{ marginRight: "12rpx" }}>
                  <View className="circle"></View>
                  <View className="line"></View>
                </View>
                <View className="text">
                  <Text style={{ fontWeight: 600, fontSize: "28rpx" }}>
                    {item.name}
                  </Text>
                  <View style={{ paddingBottom: "60rpx" }}>
                    {(detail?.results ?? []).find(
                      (i: any) => i.stateCode === item.state,
                    )?.businessDate ?? "暂无数据"}
                  </View>
                </View>
              </View>
              {(detail?.results ?? []).find(
                (i: any) => i.stateCode === item.state,
              )?.businessDate && (
                <View
                  className="inline-flex"
                  onClick={() =>
                    openDetail(
                      (detail?.results ?? []).find(
                        (i: any) => i.stateCode === item.state,
                      ),
                    )
                  }
                >
                  详情
                  <Image src={ArrowRight} className="arrow-icon" />
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
      {/* 自定义 Modal */}
      {modalVisible && (
        <View className="custom-modal">
          <View
            className="modal-overlay"
            onClick={() => setModalVisible(false)}
          ></View>
          <View className="modal-content">
            <View className="modal-header">
              <Text className="modal-title">
                {selectedItem?.state || "海关查验"}
              </Text>
              <View
                className="modal-close"
                onClick={() => setModalVisible(false)}
              >
                <Image src={CloseIcon} className="close-icon" />
              </View>
            </View>
            <View className="modal-body">
              {getValue().map((item: any) => (
                <View className="modal-item" key={item.label}>
                  <Text className="modal-label">{item.label}：</Text>
                  <Text className="modal-value">
                    {item.value || "暂无数据"}
                  </Text>
                </View>
              ))}
              {/* <View className="modal-item">
                <Text className="modal-label">船名：</Text>
                <Text className="modal-value">
                  {selectedItem?.vesselName || detail?.vesselName || "暂无数据"}
                </Text>
              </View>
              <View className="modal-item">
                <Text className="modal-label">航次：</Text>
                <Text className="modal-value">
                  {selectedItem?.voyage || detail?.voyage || "暂无数据"}
                </Text>
              </View>
              <View className="modal-item">
                <Text className="modal-label">提单号：</Text>
                <Text className="modal-value">
                  {selectedItem?.billNo || detail?.billNo || "暂无数据"}
                </Text>
              </View>
              <View className="modal-item">
                <Text className="modal-label">放行时间：</Text>
                <Text className="modal-value">
                  {selectedItem?.businessDate || "暂无数据"}
                </Text>
              </View>
              <View className="modal-item">
                <Text className="modal-label">状态：</Text>
                <Text className="modal-value">
                  {selectedItem?.status || "海关放行"}
                </Text>
              </View> */}
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default LogisticsTrackingDetail;
