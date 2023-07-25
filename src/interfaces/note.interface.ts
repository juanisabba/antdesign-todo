export interface ITabHeader {
  id: number;
  title: string;
  isCompleted: boolean;
}

export interface ISortNotes {
  title: string;
  createdAt: string;
}

export interface INotes {
  id: number;
  isCompleted: boolean;
  createdAt: string;
  title: string;
  description: string;
  tag: string;
  endingDate: string;
}

export interface ISortOptions{
  value: number;
  label: string;
}

export interface FormValuesProps {
  id?: number;
  title: string;
  description: string;
  tag: string;
  endingDate: string;
  isCompleted?: boolean
}
