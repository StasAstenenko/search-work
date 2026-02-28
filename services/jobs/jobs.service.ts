import { JOBS_APP_KEY, JOBS_ID } from '@/constant/constants';
import { CategoryResult, Jobs } from '@/types/Jobs.type';
import axios from 'axios';

interface Props {
  country: string;
  page: number;
  category: string | null;
}

const instant = axios.create({
  baseURL: 'https://api.adzuna.com/v1/api/',
  params: {
    app_id: JOBS_ID,
    app_key: JOBS_APP_KEY,
  },
});

export const getJobs = async ({
  country,
  page,
  category,
}: Props): Promise<Jobs> => {
  try {
    const { data } = await instant.get<Jobs>(`jobs/${country}/search/${page}`, {
      params: {
        category,
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
    const { data } = await instant.get<CategoryResult>(
      `jobs/${country}/categories`
    );

    console.log(data);

    return data;
  } catch (error) {
    throw new Error('Some error...', { cause: error });
  }
};
