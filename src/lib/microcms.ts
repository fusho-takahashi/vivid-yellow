import { createClient } from 'microcms-js-sdk';
import type { Post, PostsResponse, Tag, TagsResponse } from '../types/blog';

if (!import.meta.env.MICROCMS_SERVICE_DOMAIN || !import.meta.env.MICROCMS_API_KEY) {
  throw new Error('microCMS service domain and API key are required');
}

export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

export const getPosts = async (): Promise<PostsResponse> => {
  return await client.get({
    endpoint: 'posts',
    queries: {
      orders: '-publishedAt',
    },
  });
};

export const getPost = async (slug: string): Promise<Post> => {
  const response = await client.get({
    endpoint: 'posts',
    queries: {
      filters: `slug[equals]${slug}`,
    },
  });
  
  if (response.contents.length === 0) {
    throw new Error('Post not found');
  }
  
  return response.contents[0];
};

export const getTags = async (): Promise<TagsResponse> => {
  return await client.get({
    endpoint: 'tags',
  });
};

export const getPostsByTag = async (tagSlug: string): Promise<PostsResponse> => {
  return await client.get({
    endpoint: 'posts',
    queries: {
      filters: `tags[contains]${tagSlug}`,
      orders: '-publishedAt',
    },
  });
};