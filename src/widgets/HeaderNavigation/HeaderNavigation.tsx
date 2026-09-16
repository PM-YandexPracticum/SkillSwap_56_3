import { SkillsMenu } from '../../shared/ui/SkillsMenu/SkillsMenu';

interface HeaderNavigationProps {
  onAbout: () => void;
  categories: readonly string[];
  onCategorySelect: (category: string) => void;
}

export function HeaderNavigation({ onAbout, categories, onCategorySelect }: HeaderNavigationProps) {
  return (
    <nav>
      <button onClick={onAbout}>О проекте</button>
      <SkillsMenu categories={categories} onCategorySelect={onCategorySelect} />
    </nav>
  );
}
