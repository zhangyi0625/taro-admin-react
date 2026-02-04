export interface BusinessAdvantageType {
  code: string;
  name: string;
}

export interface RouteAdvantageType {
  id: string;
  code: string;
  name: string;
  parent_id?: string;
}

export interface PortAdvantageSearchParams {
  routeId?: string;
  isPor?: boolean | number;
  isFnd?: boolean | number;
  order?: string;
  sort?: string;
  keyword?: string;
  enabled?: boolean | number;
}

export interface PortAdvantageType {
  areaCode: string;
  areaName: string;
  countryCode: string;
  countryLocalName: string;
  countryName: string;
  id: number;
  localName: string;
  name: string;
  unlocode: string;
}
