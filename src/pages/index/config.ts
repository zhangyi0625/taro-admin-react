import V1 from "../../images/icon/v1.png";
import V2 from "../../images/icon/v2.png";
import V3 from "../../images/icon/v3.png";
import V4 from "../../images/icon/v4.png";
import IconUnitGeneral from "../../images/icon/unitGeneral.svg";
import IconApplication from "../../images/icon/logistics.svg";
import IconConsulting from "../../images/icon/consulting.svg";

export type indexFunItemsType = {
  title: string;
  icon: string;
  url: string;
};

export const levelOptions = [
  {
    value: 1,
    icon: V1,
  },
  {
    value: 2,
    icon: V2,
  },
  {
    value: 3,
    icon: V3,
  },
  {
    value: 4,
    icon: V4,
  },
];

export const memberUnitLevelOptions = [
  {
    label: "会员单位",
    value: 1,
  },
  {
    label: "理事/监事单位",
    value: 3,
  },
  {
    label: "副会长单位",
    value: 5,
  },
  {
    label: "会长单位",
    value: 7,
  },
];

export const FunItemsOptions: indexFunItemsType[] = [
  {
    title: "协会概况",
    icon: IconUnitGeneral,
    url: "/pages/unitGeneral/index",
  },
  {
    title: "箱货跟踪",
    icon: IconApplication,
    url: "/pages/logistics-tracking/index",
  },
  {
    title: "咨询热线",
    icon: IconConsulting,
    url: "/pages/consulting/index",
  },
];
