import { GenderValue } from "../ui/gender-select"

// ─── Skill ───────────────────────────────────────────────
export type SkillType = 'teach' | 'learn'

export interface Skill {
  id: string
  title: string
  category: string
  subcategory: string
  description: string
  type: SkillType
  tags: string[]
  images: string[]
  imageUrl?: string | null
  authorId: string
  createdAt?: string
}

// ─── User ────────────────────────────────────────────────
export interface User {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  createdAt: string
}

// ─── Request ─────────────────────────────────────────────
export type RequestStatus = 'pending' | 'accepted' | 'rejected' | 'inProgress' | 'done'

export interface SwapRequest {
  id: string
  skillId: string
  fromUserId: string
  toUserId: string
  status: RequestStatus
  createdAt: string
  updatedAt: string
}

// ─── Auth ────────────────────────────────────────────────
export interface AuthUser {
  id: string
  name: string
  email: string
  token: string
  gender: GenderValue | null
  birthDate: string
  city: string
  aboutMe: string
  avatar: string
}

// ─── Subcategory ────────────────────────────────────────────────
export type Subcategory = {
  id: string
  name: string
}

// ─── Category ────────────────────────────────────────────────
export type Category = {
  id: string
  name: string
  icon: string
  subcategories: Subcategory[]
}

// ─── Filters ────────────────────────────────────────────────
export type SortOrder = 'newest' | 'oldest'

export type WantFilter = 'all' | 'learn' | 'teach'

export type Gender = 'all' | 'male' | 'female'

// ─── Users ────────────────────────────────────────────────

export interface WantFilterOption {
  id: WantFilter
  name: string
}

export interface GenderOption {
  id: Gender
  name: string
}

export interface CityOption {
  id: string
  name: string
}

export interface TeachSkill {
  id: string
  name: string
  category: string
  subcategory: string
}

export interface LearnSkill {
  name: string
  category: string
  subcategory: string
}

export interface UsersResponse {
  meta: Meta
  data: UserCard[]
}

export interface Meta {
  wantFilter: WantFilterOption[]
  genders: GenderOption[]
  cities: CityOption[]
  categories: Category[]
}

export interface UserCard {
  id: string
  name: string
  email: string
  birthDate: string
  gender: Gender
  city: string
  likesCount: number
  aboutMe: string
  createdAt: string
  teachSkill: TeachSkill
  learnSkills: LearnSkill[]
  avatar: string
}

// ─── Registration ────────────────────────────────────────
export interface Credentials {
  email: string
  password: string
}

export interface SkillSelection {
  category: string
  subcategories: string[]
}

export interface RegistrationDraft {
  email: string
  password: string
  name: string
  birthDate: string
  gender: GenderValue | null
  city: string
  avatar: string
  learnSelections: SkillSelection[]
  teachSelections: SkillSelection[]
  teachSkillName: string
  teachDescription: string
  teachImages: string[]
}

export interface Section {
  id: string
  label: string
  path?: string
}

export interface ExchangeNotification {
  userId: string
  createdAt: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface UpdateProfilePayload {
  name: string
  email: string
  birthDate: string
  gender: GenderValue | null
  city: string
  aboutMe: string
  avatar: string
  oldPassword?: string
  newPassword?: string
}