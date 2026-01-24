import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Text } from "@tarojs/components";
import { add, minus, asyncAdd } from "../../actions/counter";
import {
  useDidHide,
  useDidShow,
  usePullDownRefresh,
  useReady,
} from "@tarojs/taro";

type PageStateProps = {
  counter: {
    num: number;
  };
};

type PageDispatchProps = {
  add: () => void;
  dec: () => void;
  asyncAdd: () => any;
};

type PageOwnProps = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Index {
  props: IProps;
}

const MemberUnit: React.FC = () => {
  const dispatch = useDispatch();

  const counter = useSelector((state) => state.counter);

  const handleAdd = () => {
    dispatch(add());
  };
  const handleReduce = () => {
    dispatch(minus());
  };
  const handleAsync = () => {
    dispatch(asyncAdd());
  };

  // 可以使用所有的 React Hooks
  useEffect(() => {
    console.log("useEffect");
  }, []);

  // 对应 onReady
  useReady(() => {
    console.log("useReady");
  });

  // 对应 onShow
  useDidShow(() => {
    console.log("useDidShow");
  });

  // 对应 onHide
  useDidHide(() => {
    console.log("useDidHide");
  });

  // Taro 对所有小程序页面生命周期都实现了对应的自定义 React Hooks 进行支持
  // 详情可查阅：【Hooks】
  usePullDownRefresh(() => {
    console.log("usePullDownRefresh");
  });

  return (
    <View className="index">
      <Button className="add_btn" onClick={handleAdd}>
        +++
      </Button>
      <Button className="dec_btn" onClick={handleReduce}>
        -
      </Button>
      <Button className="dec_btn" onClick={handleAsync}>
        async
      </Button>
      <View>
        <Text>{counter.num}</Text>
      </View>
      <View>
        <Text>Hello, World</Text>
      </View>
    </View>
  );
};

export default MemberUnit;
