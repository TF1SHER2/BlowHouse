
export enum PageDirection {
  NEXT, PREVIOUS
}

export interface PlayList {
  id: string;
  total: number;
  pages: number;
  actual: number;
  nextPageToken: string;
  prevPageToken: string;
  videos: Video[];
}

export interface Video {
  id: string;
  publishedAt: Date;
  title: string;
  description: string;
  imgURL: string;
}
