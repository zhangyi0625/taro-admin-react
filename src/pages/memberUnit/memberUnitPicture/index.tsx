import { View, Image } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { useState } from "react";
import "./index.scss";
import { getMemberUnitImage } from "../../../service/memberUnit/memberUnitApi";

const MemberUnitPicture: React.FC = () => {
  const [imageList, setImageList] = useState<string[]>([]);

  useLoad((options) => {
    init(options.id || "");
  });

  const init = async (id?: string) => {
    try {
      const res: any = await getMemberUnitImage({ companyId: id || "" });
      setImageList(res.map((i) => i.imagePath) ?? []);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View className="memberUnitPicture">
      <View className="memberUnitPicture-image">
        {imageList.map((item) => (
          <Image src={item} className="image" mode="widthFix" key={item} />
        ))}
      </View>
    </View>
  );
};

export default MemberUnitPicture;
