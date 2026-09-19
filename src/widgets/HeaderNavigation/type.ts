import { Category } from "@/shared/types"

export interface HeaderNavigationProps {
  onAbout?: () => void,
  categories: Category[]
}