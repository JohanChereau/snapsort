export type SortingOptions = {
    sourceFolder: string;
    destinationFolder: string;
    fileExtensions: string[];
}

export type FileInfo = {
    path: string;
    name: string;
    mtime: Date;
    year: string;
    month: string;
    monthIndex: number;
    day: string;
}