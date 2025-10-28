interface News {
  id: string;
  owner_id: string;
  parent_id: string | null;
  slug: string;
  title: string;
  status: string;
  source_url: string | null;
  created_at: string;
  updated_at: string;
  published_at: string;
  deleted_at: string | null;
  tabcoins: number;
  tabcoins_credit: number;
  tabcoins_debit: number;
  owner_username: string;
  children_deep_count: number;
  type: string;
  bookmarked?: boolean;
}

interface NewsPost {
  id: string;
  owner_id: string;
  parent_id: null | string;
  slug: string;
  title: string;
  body: string;
  status: string;
  type: string;
  source_url: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  deleted_at: null | string;
  owner_username: string;
  tabcoins: number;
  tabcoins_credit: number;
  tabcoins_debit: number;
  children_deep_count: number;
}

enum NewsOrder {
  POPULAR = 'popular',
  RECENT = 'recent',
  BOOKMARK = 'bookmark',
  DEFAULT = 'default',
}

export type { News, NewsPost }
export { NewsOrder }
