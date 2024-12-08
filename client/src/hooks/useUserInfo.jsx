import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useUserInfo = () => {
    const axioSecure = useAxiosSecure();
    const { user } = useAuth();

    const { isLoading, isError, data: userInfo = {}, error, refetch } = useQuery({
        queryKey: ['User', user?.email],
        queryFn: async () => {
            if (!user?.email) return;
            const res = await axioSecure.get(`/users/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, // Ensure query only runs when user.email is available
    });

    return { isLoading, isError, userInfo, error, refetch };
};

export default useUserInfo;