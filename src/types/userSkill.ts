export interface UserSkillItem {
  user_skill_id: number;
  user_skill_created_at: string;
  user_skill_updated_at: string;
  user_id: number;
  skill_id: number;
  skill_level_id: number;

  user_fullname?: string;
  skill_name?: string;
  skill_level_name?: string;
}
