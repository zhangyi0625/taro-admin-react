import { View, Image } from "@tarojs/components";
import "../../index.scss";
import { previewImage } from "../../../../../utils/tools";

export type MemberUnitPictureProps = {
  imageList: string[];
};

const MemberUnitPicture: React.FC<MemberUnitPictureProps> = ({ imageList }) => {
  return (
    <>
      <View className="imageList">
        {imageList.map((item) => (
          <Image
            src={item}
            className="image"
            mode="aspectFill"
            key={item}
            onClick={() => previewImage(item, imageList)}
          />
        ))}
      </View>
    </>
  );
};

export default MemberUnitPicture;
