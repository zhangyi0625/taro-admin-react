export type AffiliateInfoType = {
  id: string;
  logo: string | null;
  logoPath: string | null;
  name: string;
  position: string;
  enterpriseDescription: string;
  contactPhone: string;
  email: string;
  address: string;
  establishmentDate: string;
  businessAdvantage: string[] | null;
  porAdvantage: string[] | null;
  fndAdvantage: string[] | null;
  advantageFnd: string;
  advantageRoute: string;
  advantagePor: string;
  advantageCarrier: string;
  routeAdvantage: string[] | null;
  shippingAdvantage: string[] | null;
  affiliateImage: string[] | null;
  // affiliateMember: affiliateMemberType[] | null;
};

export interface ApplicationFormType {
  contactName: string;
  contactPhone: string;
  companyName: string;
  address: string;
}
