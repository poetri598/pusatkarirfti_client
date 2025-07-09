export interface CompanyItem {
  company_id: number;
  company_name: string;
  company_img: string;
  company_desc: string;
  company_link: string;
  company_is_partner: boolean;
  company_created_at: string; // ISO string
  company_updated_at: string;
  status_id: number;
  status_name: string;

  industry_ids: number[];
  industry_names: string;
}
