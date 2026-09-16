import {useState} from 'react';

interface SkillsMenuProps {
  categories: readonly string[];
  onCategorySelect: (category: string) => void;
}

export function SkillsMenu({categories, onCategorySelect} : SkillsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}> Все навыки</button>
      {isOpen && (
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <button onClick={() => onCategorySelect(category)}>
                {category}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
