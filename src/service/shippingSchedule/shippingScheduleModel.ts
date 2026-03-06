import type { PortAdvantageType } from "../advantage/advantageModel";

export interface ShippingScheduleParams {
  porCode: string;
  fndCode: string;
  porInfo?: string;
  fndInfo?: string;
  carrierCode?: string;
  routeCode?: string;
}

export interface ShippingScheduleItem {
  isTransit: boolean;
  carrierCode: string;
  vesselName: string;
  voyage: string;
  routeCode: string;
  etd: string;
  eta: string;
  totalDuration?: string;
  siCutoff?: string;
  etaWeek?: string;
  etdWeek?: string;
  vgmCutoff?: string;
  polTerminal?: string;
  podTerminal?: string;
  shareCabinsInfoList?: string | { carrier: string; routeCode: string }[];
  isReferenceCarrier?: string;
  // pol?: LocationItem;
  // pod?: LocationItem;
  transferInfoList?: string;
  cutOff?: string;
  cyOpen?: string;
  sicutoff?: string;
}

export interface ShippingScheduleMatchingDataType extends Omit<
  ShippingScheduleItem,
  "isTransit" | "eta" | "etd"
> {
  carrierName: {
    carrier: string;
    routeCode: string;
    flag?: boolean;
  }[];
  data: ShippingScheduleItem[];
  expend?: false;
}

export interface ShippingScheduleLogType {
  por: PortAdvantageType;
  fnd: PortAdvantageType;
  porCode: string;
  fndCode: string;
}
