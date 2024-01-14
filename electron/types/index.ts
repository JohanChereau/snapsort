export type SortingOptions = {
  sourceFolder: string;
  destinationFolder: string;
  fileExtensions: string[];
  monthNames: string[];
};

export type AnalyzingOptions = {
  sourceFolder: string;
};

export type FileInfo = {
  path: string;
  name: string;
  mtime: Date;
  year: string;
  month: string;
  monthIndex: number;
  day: string;
};

export type ProgressStatus = {
  sortedIndex: number;
  total: number;
  path: string;
};

export type DownloadProgress = {
  speed: number;
  percent: number;
  transferred: number;
  total: number;
};
