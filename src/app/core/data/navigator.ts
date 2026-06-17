export interface SeItem {
  code: string
  id?: string;
  title?: string;
  subtitle?: string;
  type:
  | 'basic'
  | 'collapsable'
  | 'head'
  hidden?: (item: SeItem) => boolean;
  active?: boolean;
  disabled?: boolean;
  link?: string;
  externalLink?: boolean;
  exactMatch?: boolean;
  isActiveMatchOptions?: SeItem;
  function?: (item: SeItem) => void;
  icon?: string;
  children?: SeItem[];
  ischildActive?: boolean
  role?: string | string[]
  skipCondition?: boolean;
}

export const routes: SeItem[] = [
  {
    id: 'example',
    code: '0013',
    title: 'example',
    type: 'basic',
    icon: 'shield',
    link: '/app/example',
    children: []
  }
]
