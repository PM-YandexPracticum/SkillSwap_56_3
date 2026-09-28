import type {
  Skill,
  UserCard as UserCardType,
} from '@/shared/types';

export interface SkillDetailsSectionProps {
  skill: Skill;
  author: UserCardType;
}
