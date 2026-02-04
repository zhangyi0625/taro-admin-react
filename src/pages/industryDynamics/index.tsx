import { View, Text, Image } from "@tarojs/components";
import { useDidShow } from "@tarojs/taro";
import { useState } from "react";
import { IndustryNewsDetailType } from "../../service/memberUnit/memberUnitModel";
import {
  getIndustryNewsList,
  getIndustryColumnGroupList,
} from "../../service/memberUnit/memberUnitApi";
import "./index.scss";
import Taro from "@tarojs/taro";

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
        // setIndustryNews(res);
        console.log(res[1], "res", columnGroup, industryNews);
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

  const handleClick = (item: IndustryNewsDetailType) => {
    Taro.navigateTo({
      url: `/pages/webview/index?content=${item.url ? item.url : item.content}&type=${
        item.url ? "website" : "markdown"
      }&title=${item.title}`,
    });
  };

  return (
    <View className="industryDynamics">
      <View className="industryDynamics-tab">
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
      <View className="industryDynamics-content">
        {industryNews.map((item) => (
          <View
            key={item.id}
            className="industryDynamics-content-item"
            onClick={() => handleClick(item)}
          >
            <Image
              src={item.mainImagePath}
              className="image"
              mode="aspectFill"
            />
            <View className="flex-col">
              <Text className="text-container">{item.title}</Text>
              <View className="inline-flex">
                <Text className="name">{item.groupName}</Text>
                <Text className="date">{item.updateTime}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default IndustryDynamics;
