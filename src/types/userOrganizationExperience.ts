export interface UserOrganizationExperienceDescription {
  user_organization_experience_description_id: number;
  user_organization_experience_description_name: string;
  user_organization_experience_description_created_at: string;
  user_organization_experience_description_updated_at: string;
  user_organization_experience_id: number;
}

export interface UserOrganizationExperienceItem {
  user_organization_experience_id: number;
  user_organization_experience_start_date: string;
  user_organization_experience_end_date: string | null;
  user_organization_experience_is_current: boolean;
  user_organization_experience_created_at: string;
  user_organization_experience_created_updated_at: string;
  user_id: number;
  company_id: number;
  position_id: number;
  user_organization_experience_descriptions: string | UserOrganizationExperienceDescription[];
  company_name?: string;
  position_name?: string;
}
