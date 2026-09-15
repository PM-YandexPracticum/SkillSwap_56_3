import type { Category } from "@/shared/types";

export type SkillsPopoverProps = {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
};