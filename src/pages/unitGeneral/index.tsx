import { View, Image } from "@tarojs/components";
import "./index.scss";
import { useLoad } from "@tarojs/taro";
import Taro from "@tarojs/taro";
import { getIndustryColumnList } from "../../service/memberUnit/memberUnitApi";
import BannerImg from "../../images/unitGeneral-bg.png";
import { useCallback, useState } from "react";
import { UnitGeneralIndustryColumnType } from "../../service/memberUnit/memberUnitModel";

const unitGeneral: React.FC = () => {
  const [industryColumnList, setIndustryColumnList] = useState<
    UnitGeneralIndustryColumnType[]
  >([]);

  const [defaultUnitGeneral, setDefaultUnitGeneral] = useState<string>("");

  useLoad((options) => {
    Taro.setNavigationBarTitle({
      title: options.name || "协会概况",
    });
    init(options.name);
  });

  const init = async (groupName: string) => {
    try {
      const resp: any = await getIndustryColumnList({
        groupName: groupName,
        sort: "order",
      });
      setIndustryColumnList(resp || []);
      setDefaultUnitGeneral(resp?.[0]?.columnName || "");
    } catch {}
  };

  const changeDefaultUnitGeneral = (columnName: string) => {
    setDefaultUnitGeneral(columnName);
  };

  const getContent = useCallback(() => {
    if (!industryColumnList.length || !defaultUnitGeneral) {
      return "";
    }
    const items: UnitGeneralIndustryColumnType = industryColumnList.filter(
      (i) => i.columnName === defaultUnitGeneral,
    )[0] as UnitGeneralIndustryColumnType;
    if (items.content) {
      return (
        <View
          className="unitGeneral-content-item"
          dangerouslySetInnerHTML={{ __html: items.content }}
        />
      );
    } else {
      return getImageList(items.imagePath ?? []);
    }
  }, [defaultUnitGeneral, industryColumnList]);

  const getImageList = (imageIds: string[]) => {
    return imageIds.map((item) => {
      return <Image src={item} className="unitGeneral-image" mode="widthFix" />;
    });
  };

  return (
    <View className="unitGeneral">
      <Image src={BannerImg} className="bg" />
      <View className="unitGeneral-content">
        <View
          className="inline-flex"
          style={{ justifyContent: "space-between" }}
        >
          {industryColumnList.map((item) => (
            <View
              className={
                item.columnName === defaultUnitGeneral
                  ? "unitGeneral-item-title active"
                  : "unitGeneral-item-title"
              }
              key={item.id}
              onClick={() => changeDefaultUnitGeneral(item.columnName)}
            >
              {item.columnName}
            </View>
          ))}
        </View>
        <View className="unitGeneral-content-item">{getContent()}</View>
      </View>
    </View>
  );
};

export default unitGeneral;
