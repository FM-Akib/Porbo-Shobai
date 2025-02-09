import ContactSection from '@/components/Aopportunity/ContactSection';
import OpportunityHeader from '@/components/Aopportunity/OppertunityHeader';
import PrizeSection from '@/components/Aopportunity/PrizeSection';
import Stats from '@/components/Aopportunity/Stats';
import Timeline from '@/components/Aopportunity/Timeline';
import QuizBrowser from '@/components/Quiz/QuizBrowser';
import Loader from '@/components/shared/Loader';
import { Button } from '@/components/ui/button';
import useUserInfo from '@/Hooks/useUserInfo';
import { useGetOpportunitiesQuery } from '@/redux/api/api';
import { Bookmark, CornerRightDown, SquareDashedKanban } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const Aopportunity = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetOpportunitiesQuery({
    filters: id ? { id } : {},
    page: 1,
    limit: id ? 1 : 10,
  });
  const Aopportunity = data?.opportunities[0];
  const { userInfo } = useUserInfo();
  const isRegistered = userInfo?.participations?.includes(Aopportunity?._id);
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
    <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className=" rounded-xl shadow-sm overflow-hidden">
          <OpportunityHeader Aopportunity={Aopportunity} />
          <div className="flex justify-between items-center px-6 py-4 border-y">
            <div className="flex items-center gap-4">
              <span className=" text-xl md:text-2xl font-bold">
                BDT {Aopportunity.registrationFee}
              </span>
              <Button variant="outline" size="icon">
                <Bookmark />
              </Button>
            </div>
            {isRegistered ? (
              <Button size="lg" className="bg-green-600 dark:text-white">
                Already Registered
              </Button>
            ) : (
              <Link to={`/opportunity-registration/${Aopportunity._id}`}>
                <Button size="lg">Register Now</Button>
              </Link>
            )}
          </div>

          {isRegistered && (
            <>
              <h1 className="text-xl font-semibold  flex items-center gap-1 mt-3">
                <SquareDashedKanban className="h-5 w-5" />
                <span className="flex items-end gap-1">
                  {' '}
                  Available task will be displayed here
                  <CornerRightDown className="size-4" />
                </span>
              </h1>
              <QuizBrowser opportunity={Aopportunity} />
            </>
          )}

          <Stats Aopportunity={Aopportunity} />
          <div className="grid gap-6 p-6">
            <div
              className="prose max-w-none text-justify"
              dangerouslySetInnerHTML={{ __html: Aopportunity.description }}
            />
            <Timeline Aopportunity={Aopportunity} />
            <PrizeSection Aopportunity={Aopportunity} />
            <ContactSection Aopportunity={Aopportunity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aopportunity;
