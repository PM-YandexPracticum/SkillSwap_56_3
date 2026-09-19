export type TagTone = 'pink' | 'blue' | 'green' | 'purple' | 'yellow' | 'orange' | 'neutral'

export interface TagProps {
  label: string
  tone?: TagTone
}
