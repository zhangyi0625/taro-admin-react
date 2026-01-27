import { View, Text } from "@tarojs/components";
import "./index.scss";

const Application: React.FC = () => {
  const processSteps = [
    { id: 1, name: "提交申请", desc: "填写入会申请表格" },
    { id: 2, name: "预约上门走访", desc: "等待工作人员联系" },
    { id: 3, name: "理事会审核同意", desc: "等待理事会审批" },
    { id: 4, name: "发给会员证书（缴纳会费）", desc: "完成入会流程" },
  ];

  return (
    <View className="application">
      <View className="process-section">
        <View className="process-title">
          <Text>入会流程</Text>
        </View>
        <View className="process-steps">
          {processSteps.map((step, index) => (
            <View
              key={step.id}
              className={`process-step ${index === processSteps.length - 1 ? "last-step" : ""}`}
            >
              <View className="step-number">
                {step.id.toString().padStart(2, "0")}
              </View>
              <View className="step-content">
                <Text className="step-name">{step.name}</Text>
                <Text className="step-desc">{step.desc}</Text>
              </View>
              {index < processSteps.length - 1 && (
                <View className="step-line"></View>
              )}
            </View>
          ))}
        </View>
        <View className="process-title">
          <Text>会费标准</Text>
        </View>
        <View>
          目前执行的会费标准由2023年3月17日召开的第五届五次会员大会采用无记名投票表决方式通过。具体如下：
        </View>
        <View>
          会长单位：<Text>30000元/年</Text>
        </View>
        <View>
          副会长（监事长）单位：<Text>15000元/年</Text>
        </View>
        <View>
          理事（监事）单位：<Text>6000元/年</Text>
        </View>
        <View>
          会员单位：<Text>2000元/年</Text>
        </View>
      </View>

      <View className="application-fixed">
        <View className="btn">提交申请</View>
      </View>
    </View>
  );
};

export default Application;
