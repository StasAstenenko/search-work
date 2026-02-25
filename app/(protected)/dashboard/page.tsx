import News from '@/components/News/News';
import { getNews } from '@/services/news/getNews';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

const Dashboard = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['news'],
    queryFn: getNews,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <News />
    </HydrationBoundary>
  );
};

export default Dashboard;
