export interface CompanyItem {
  company_id: number;
  company_name: string;
  company_img: string;
  company_desc: string;
  company_is_partner: boolean;
  company_created_at: string; // ISO string

  // GROUP_CONCAT results
  industry_names: string;
}
