import { View } from "@tarojs/components";
import { useDidShow } from "@tarojs/taro";
import { useState } from "react";
// import clsx from "clsx";
import { IndustryNewsDetailType } from "../../service/industry-trends/industry-trendsModel";
import {
  getIndustryNewsList,
  getIndustryColumnGroupList,
} from "../../service/industry-trends/industry-trendsApi";
import "./index.scss";
import IndustryDynamicsItem from "./IndustryDynamicsItem";

const IndustryDynamics: React.FC = () => {
  const [industryNews, setIndustryNews] = useState<IndustryNewsDetailType[]>(
    [],
  );

  const [activeId, setActiveId] = useState("");

  const [columnGroup, setColumnGroup] = useState<
    { id: string; name: string }[]
  >([]);
  useDidShow(() => {
    console.log("useDidShow");
    init();
  });

  const init = async () => {
    try {
      await Promise.all([
        getIndustryNewsList(),
        getIndustryColumnGroupList(),
      ]).then((res: any) => {
        setIndustryNews(res[0] ?? []);
        setColumnGroup([{ id: "", name: "全部" }].concat(res[1]) ?? []);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const changeActiveId = async (id: string) => {
    setActiveId(id);
    try {
      await getIndustryNewsList({ groupId: id }).then((res: any) => {
        setIndustryNews(res ?? []);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="h-full bg-[#f5f7fa] industryDynamics">
      <View
        className="bg-[#ffffff] flex items-center overflow-x-scroll whitespace-nowrap"
        style={{ padding: "26rpx 24rpx 26rpx 0" }}
      >
        {columnGroup.map((item) => (
          <View
            key={item.id}
            className={
              activeId === item.id
                ? "industryDynamics-tab-item active"
                : "industryDynamics-tab-item"
            }
            onClick={() => changeActiveId(item.id)}
          >
            {item.name}
          </View>
        ))}
      </View>
      <View className="industryDynamics-content p-[24px] mt-[20px] bg-[#ffffff]">
        {industryNews.map((item) => (
          <IndustryDynamicsItem key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

export default IndustryDynamics;
