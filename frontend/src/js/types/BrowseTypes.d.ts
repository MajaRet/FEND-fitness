export interface BrowsedProgram {
  _id: string;
  title: string;
  slug: { current: string };
  isFavorite: boolean;
  isActive: boolean;
  isNewProgram: boolean;
  isCompleted: boolean;
}

export interface BrowseList {
  programs: BrowsedProgram[];
}

export type DifficultyFilter = Difficulty | '' | 'none' | 'all';

export interface Filter {
  keyword?: string;
  maxDuration?: number;
  minDuration?: number;
  favorite?: boolean;
  difficulty?: DifficultyFilter;
}
