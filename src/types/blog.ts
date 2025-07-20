export interface Tag {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
  slug: string;
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
  slug: string;
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