import { UserItem } from "@/types/user";
import { UserPlatformItem } from "@/types/userPlatform";
import { UserWorkExperienceItem } from "@/types/userWorkExperience";
import { UserOrganizationExperienceItem } from "@/types/userOrganizationExperience";
import { UserEducationItem } from "@/types/userEducation";
import { UserAchievementItem } from "@/types/userAchievement";
import { UserSkillItem } from "@/types/userSkill";

export interface CVItem {
  user: UserItem;
  platforms: UserPlatformItem[];
  work_experiences: UserWorkExperienceItem[];
  organization_experiences: UserOrganizationExperienceItem[];
  educations: UserEducationItem[];
  achievements: UserAchievementItem[];
  skills: UserSkillItem[];
}
