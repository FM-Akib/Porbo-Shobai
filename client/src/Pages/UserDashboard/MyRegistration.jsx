import MyRegistrationCard from '@/components/DashboardUser/MyRegistrationCard';
import TitleDashboard from '@/components/DashboardUser/TitleDashboard';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import useUserInfo from '@/Hooks/useUserInfo';
import { SquareMousePointer } from 'lucide-react';
import qs from 'qs';
import { useEffect, useState } from 'react';

const MyRegistration = () => {
  const { userInfo } = useUserInfo();
  const [participations, setParticipations] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    async function fetchData() {
      if (!userInfo.participations || userInfo.participations.length === 0)
        return;

      try {
        const query = qs.stringify(
          { opportunityIds: userInfo.participations },
          { arrayFormat: 'comma' },
        );
        const result = await axiosSecure.get(`/opportunitiesbyids?${query}`);
        setParticipations(result.data);
      } catch (error) {
        console.error('Error fetching opportunities:', error.message);
      }
    }
    fetchData();
  }, [userInfo?.participations, axiosSecure]);

  console.log(participations);

  return (
    <section className="p-3 md:p-6">
      <TitleDashboard title="My Registrations" />

      {participations.length === 0 && (
        <div className="text-center text-gray-500 flex items-center justify-center gap-2">
          <SquareMousePointer className="h-5 w-5" />
          You have not registered for any opportunities yet.
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 md:px-10">
        {participations?.map(participation => (
          <MyRegistrationCard
            key={participation.id}
            Aopportunity={participation}
          />
        ))}
      </div>
    </section>
  );
};

export default MyRegistration;
