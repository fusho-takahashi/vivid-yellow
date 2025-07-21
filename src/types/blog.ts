export interface Tag {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
}

export interface Post {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  tags: Tag[];
}

export interface PostsResponse {
  contents: Post[];
  totalCount: number;
  offset: number;
  limit: number;
}

export interface TagsResponse {
  contents: Tag[];
  totalCount: number;
  offset: number;
  limit: number;
}
