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
