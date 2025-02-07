import Loader from '@/components/shared/Loader';
import UpdateAopportunityForm1 from '@/components/UpdateAopportunity.jsx/UpdateAopportunityForm1';
import { useGetOpportunitiesQuery } from '@/redux/api/api';
import { useParams } from 'react-router-dom';

const UpdateAnOpportunity = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetOpportunitiesQuery({
    filters: id ? { id } : {},
    page: 1,
    limit: id ? 1 : 10,
  });
  const Aopportunity = data?.opportunities[0];
  if (isLoading) {
    return <Loader />;
  }
  if (isError || !Aopportunity) {
    return (
      <div className="text-center text-red-500 font-bold text-xl mt-8">
        Something went wrong. Please try again later.
      </div>
    );
  }
  return (
    <div>
      <UpdateAopportunityForm1 Aopportunity={Aopportunity} />
    </div>
  );
};

export default UpdateAnOpportunity;
