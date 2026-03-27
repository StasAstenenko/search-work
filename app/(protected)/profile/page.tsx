import ProfileComponent from '@/components/ProfileComponents/ProfileComponents';
import { FIVE_MINUTES } from '@/constant/constants';
import { getUser } from '@/services/auth.services';
import { QueryClient } from '@tanstack/react-query';

const Profile = () => {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ['me'],
    queryFn: getUser,
    staleTime: FIVE_MINUTES,
  });

  return <ProfileComponent />;
};

export default Profile;
