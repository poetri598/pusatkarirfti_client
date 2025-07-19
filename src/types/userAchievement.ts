export interface UserAchievementItem {
  user_achievement_id: number;
  user_achievement_name: string;
  user_achievement_date: string;
  user_achievement_created_at: string;
  user_achievement_updated_at: string;
  user_id: number;
  company_id: number;

  company_name?: string;
  company_img?: string;
}
