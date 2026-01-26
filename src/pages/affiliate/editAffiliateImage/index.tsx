import { View, Text, Image } from "@tarojs/components";
import Upload from "../../../images/icon/upload.svg";
import "./editAffiliateImage.scss";
import { useEffect, useState } from "react";

const EditAffiliateImage: React.FC = () => {
  const [imageList, setImageList] = useState<any[]>([]);

  useEffect(() => {
    setImageList([]);
  }, []);
  return (
    <View className="editAffiliateImage">
      <View className="editAffiliateImage-upload">
        <Image src={Upload} className="icon" />
        <Text>上传图片</Text>
      </View>
      <View className="editAffiliateImage-image">
        {imageList.map((item) => (
          <View className="editAffiliateImage-image-item" key={item}>
            <Image src={item} className="image" />
          </View>
        ))}
      </View>
    </View>
  );
};

export default EditAffiliateImage;
