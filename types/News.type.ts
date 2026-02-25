export interface News {
  articles: Article[];
}

export interface Article {
  author: string;
  description: string;
  title: string;
  url: string;
  urlToImage: string;
}
