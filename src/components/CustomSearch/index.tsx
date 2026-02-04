import { View, Image, Input, Text } from "@tarojs/components";
import SearchIcon from "../../images/icon/search.svg";
import "./index.scss";
import { debounce } from "lodash-es";
import { useState } from "react";

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
  const [copyKeyword, setCopyKeyword] = useState<string>("");

  const resetSearch = () => {
    setCopyKeyword("");
    onSearch("");
  };

  const keywordChange = (e: any) => {
    // console.log(e.detail.value, "e.detail.value");
    // setKeyword(e.detail.value);
    setCopyKeyword(e.detail.value);
    // onSearch(e.detail.value);
  };

  const keywordConfirm = () => {
    onSearch(copyKeyword);
  };
  return (
    <>
      <View className="custom-search">
        <View className="search-item inline-flex">
          <Image className="icon" src={SearchIcon} />
          <Input
            value={copyKeyword}
            // onInput={(e) => onSearch(e.detail.value)}
            onInput={keywordChange}
            onConfirm={keywordConfirm}
            className="search-input"
            placeholder={searchPlaceholder}
            confirmType="search"
            type="text"
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
