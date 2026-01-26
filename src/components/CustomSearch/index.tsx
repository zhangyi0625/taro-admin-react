import { View, Image, Input, Text } from "@tarojs/components";
import SearchIcon from "../../images/icon/search.svg";
import "./index.scss";

export type CustomSearchProps = {
  keyword: string;
  searchPlaceholder?: string;
  onSearch: (keyword: string) => void;
};

const CustomSearch: React.FC<CustomSearchProps> = ({
  keyword,
  onSearch,
  searchPlaceholder = "请输入",
}) => {
  const resetSearch = () => {
    onSearch("");
  };
  const keywordChange = () => {
    onSearch(keyword);
  };
  return (
    <>
      <View className="custom-search">
        <View className="search-item inline-flex">
          <Image className="icon" src={SearchIcon} />
          <Input
            value={keyword}
            onInput={(e) => onSearch(e.detail.value)}
            onBlur={keywordChange}
            className="search-input"
            placeholder={searchPlaceholder}
          />
        </View>
        <Text className="custom-search-cancel" onClick={resetSearch}>
          取消
        </Text>
      </View>
    </>
  );
};
export default CustomSearch;
