import { View, Image } from "@tarojs/components";
import "./index.scss";
import { useLoad } from "@tarojs/taro";
import Taro from "@tarojs/taro";
import "@tarojs/taro/html.css";
import "@tarojs/taro/html5.css";
import { getIndustryColumnList } from "../../service/memberUnit/memberUnitApi";
import BannerImg from "../../images/unitGeneral-bg.png";
import { useCallback, useState } from "react";
import { UnitGeneralIndustryColumnType } from "../../service/memberUnit/memberUnitModel";

const unitGeneral: React.FC = () => {
  const [industryColumnList, setIndustryColumnList] = useState<
    UnitGeneralIndustryColumnType[]
  >([]);

  const [defaultUnitGeneral, setDefaultUnitGeneral] = useState<string>("");

  const [contentType, setContentType] = useState<string>("content");

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
      setContentType(
        !!industryColumnList.filter(
          (i) => i.columnName === resp?.[0]?.columnName,
        )[0].content
          ? "content"
          : "image",
      );
    } catch {}
  };

  const changeDefaultUnitGeneral = (columnName: string) => {
    setDefaultUnitGeneral(columnName);
    setContentType(
      !!industryColumnList.filter((i) => i.columnName === columnName)[0].content
        ? "content"
        : "image",
    );
  };

  const getContent = useCallback(() => {
    if (!industryColumnList.length || !defaultUnitGeneral) {
      return "";
    }
    const items: UnitGeneralIndustryColumnType = industryColumnList.filter(
      (i) => i.columnName === defaultUnitGeneral,
    )[0] as UnitGeneralIndustryColumnType;
    if (items.content) {
      console.log(items.content, "items.content", Taro.options);
      return (
        <View
          className="unitGeneral-content-item taro_html"
          dangerouslySetInnerHTML={{ __html: items.content }}
        />
      );
    } else {
      // setContentType("image");
      return getImageList(items.imagePath ?? []);
    }
  }, [defaultUnitGeneral, industryColumnList]);

  const previewImage = (imageId: string) => {
    Taro.previewImage({
      urls: [imageId],
      current: imageId,
    });
  };

  const getImageList = (imageIds: string[]) => {
    console.log(
      imageIds,
      "imageIds",
      imageIds.filter((_, index) => index % 2 === 0),
      industryColumnList.findIndex((i) => i.columnName === defaultUnitGeneral),
    );

    return imageIds.map((item) => (
      <Image
        src={item}
        onClick={() => previewImage(item)}
        className={`unitGeneral-image unitGeneral-image-${industryColumnList.findIndex((i) => i.columnName === defaultUnitGeneral)}`}
        mode={
          industryColumnList.findIndex(
            (i) => i.columnName === defaultUnitGeneral,
          ) === 2
            ? "heightFix"
            : "aspectFill"
        }
      />
    ));
    // return <View>11111</View>;

    // return (
    //   <View className="waterfall-container">
    //     1111
    //     <View className="waterfall-column">
    //       {imageIds
    //         .filter((_, index) => index % 2 === 0)
    //         .map((item, index) => {
    //           return (
    //             <Image
    //               key={item}
    //               src={item}
    //               className="waterfall-item"
    //               mode="widthFix"
    //             />
    //           );
    //         })}
    //     </View>
    //     <View className="waterfall-column">
    //       {imageIds
    //         .filter((_, index) => index % 2 === 1)
    //         .map((item, index) => (
    //           <Image
    //             key={item}
    //             src={item}
    //             className="waterfall-item"
    //             mode="widthFix"
    //           />
    //         ))}
    //     </View>
    //   </View>
    // );
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
        <View
          className={
            contentType === "content"
              ? "unitGeneral-content-item"
              : "unitGeneral-content-item unitGeneral-content-image"
          }
        >
          {getContent()}
        </View>
      </View>
    </View>
  );
};

export default unitGeneral;
