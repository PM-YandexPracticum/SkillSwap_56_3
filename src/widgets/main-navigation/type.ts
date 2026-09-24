import { Category } from "@/shared/types"
import { PanelProps } from "@/shared/ui/popover/type"
import { ReactNode } from "react"

export interface NavigationProps {
  categories: Category[]
  variant: 'header' | 'footer'
  panel: PanelProps
  className?: string
  extraItems?: ReactNode
}