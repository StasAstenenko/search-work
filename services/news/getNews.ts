import { NEWS_API_KEY } from '@/constant/constants';
import { Article, News } from '@/types/News.type';
import axios from 'axios';

const instant = axios.create({
  baseURL: 'https://newsapi.org/v2/top-headlines',
});

export const getNews = async (): Promise<Article[]> => {
  try {
    const { data } = await instant.get<News>('', {
      params: {
        sources: 'techcrunch',
        apiKey: NEWS_API_KEY,
      },
    });

    return data.articles;
  } catch (error) {
    throw new Error('Some error...', { cause: error });
  }
};
