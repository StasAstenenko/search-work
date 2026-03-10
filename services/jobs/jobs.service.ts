import { JOBS_APP_KEY, JOBS_ID } from '@/constant/constants';
import { CategoryResult, Jobs } from '@/types/Jobs.type';
import axios from 'axios';

interface Props {
  country: string;
  page: number;
  category: string | null;
  sort_by: string | null;
}

const instant = axios.create({
  baseURL: '/api',
});

export const getJobs = async ({
  country,
  page,
  category,
  sort_by,
}: Props): Promise<Jobs> => {
  try {
    const { data } = await instant.get<Jobs>(`/jobs`, {
      params: {
        country,
        page,
        category,
        sort_by,
      },
    });

    console.log(data);

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

    console.log(data);

    return data;
  } catch (error) {
    throw new Error('Some error...', { cause: error });
  }
};
