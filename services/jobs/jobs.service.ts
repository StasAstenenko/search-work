import { HistogramResponse } from '@/types/Histogram.type';
import { History } from '@/types/HIstory.type';
import { CategoryResult, Jobs } from '@/types/Jobs.type';
import { TopCompanies } from '@/types/TopCompanies.type';
import axios from 'axios';

interface Props {
  country: string;
  page: number;
  category: string | null;
  sort_by: string | null;
  salary_min: number | null;
  salary_max: number | null;
}

const instant = axios.create({
  baseURL: '/api',
});

export const getJobs = async ({
  country,
  page,
  category,
  sort_by,
  salary_max,
  salary_min,
}: Props): Promise<Jobs> => {
  try {
    const { data } = await instant.get<Jobs>(`/jobs`, {
      params: {
        country,
        page,
        category,
        sort_by,
        salary_max,
        salary_min,
      },
    });

    return data;
  } catch (error) {
    throw new Error('Some error...', { cause: error });
  }
};

export const getJobsCategory = async (
  country: string
): Promise<CategoryResult> => {
  try {
    const { data } = await instant.get<CategoryResult>(`/category`, {
      params: {
        country,
      },
    });

    return data;
  } catch (error) {
    throw new Error('Some error...', { cause: error });
  }
};

export const getHistogram = async (country: string) => {
  try {
    const { data } = await instant.get<HistogramResponse>('/stats', {
      params: {
        country,
      },
    });

    return Object.entries(data.histogram).map(([salary, count]) => ({
      salary: Number(salary),
      count: Number(count),
    }));
  } catch (error) {
    throw new Error('Some error...', { cause: error });
  }
};

export const getTopCompanies = async (
  country: string
): Promise<TopCompanies> => {
  try {
    const { data } = await instant.get<TopCompanies>('/top_company', {
      params: {
        country,
      },
    });

    return data;
  } catch (error) {
    throw new Error('Some error...', { cause: error });
  }
};

export const getHistory = async (country: string) => {
  try {
    const { data } = await instant.get<History>('/history', {
      params: {
        country,
      },
    });
    console.log(data);

    return Object.entries(data.month)
      .map(([date, salary]) => ({
        date: date.toString(),
        salary: Number(salary),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } catch (error) {
    throw new Error('Some error...', { cause: error });
  }
};
