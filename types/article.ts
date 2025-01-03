export interface Author {
  id: string;
  name: string;
  bio: string;
  avatarUrl: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  slug: string;
  featuredImage: string;
}

