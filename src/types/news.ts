export interface NewsItem {
  news_id: number;
  news_name: string;
  news_slug: string;
  news_img: string;
  news_desc: string;
  news_views: number;
  news_created_at: string;
  news_type_id: number;
  news_type_name: string;
  user_id: number;
  user_img: string;
  user_fullname: string;
  status_id: number;
  status_name: string;
  role_name: string;
  news_tags: string;
}
