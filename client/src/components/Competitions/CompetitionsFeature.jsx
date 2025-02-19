import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetOpportunitiesQuery } from '@/redux/api/api';
import clsx from 'clsx';
import { CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Marquee } from '../magicui/marquee';

const statusStyles = {
  Live: 'bg-green-500 text-white animate-pulse',
  Upcoming: 'bg-yellow-500 text-white shadow-lg shadow-yellow-400/50',
  Closed: 'bg-gray-500 text-white',
};

const CompetitionsFeature = () => {
  const { data, error, isLoading } = useGetOpportunitiesQuery({
    filters: {},
    page: 1,
    limit: 10,
  });

  const opportunities = data?.opportunities;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading opportunities</div>;

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Opportunities
        </h2>
        <Marquee className="py-4" pauseOnHover={true} speed={100}>
          {opportunities?.map(opportunity => (
            <Card
              key={opportunity._id}
              className="w-[320px] mr-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <CardHeader className="relative p-0 overflow-hidden rounded-t-xl">
                <img
                  src={opportunity?.banner}
                  alt={opportunity.title}
                  width={320}
                  height={200}
                  className="object-cover w-full h-[200px] rounded-t-xl"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://res.cloudinary.com/ds0io6msx/image/upload/v1733134035/wqux5fkhs6ctl0mxzabe.png';
                  }}
                />
                <Badge
                  className={clsx(
                    'absolute top-2 right-2 px-3 py-1 text-sm font-semibold rounded-md',
                    statusStyles[opportunity.status] ||
                      'bg-gray-500 text-white',
                  )}
                >
                  {opportunity.status}
                </Badge>
              </CardHeader>
              <CardContent className="p-5">
                <CardTitle className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  {opportunity.title}
                </CardTitle>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <CalendarDays className="w-4 h-4 mr-1 text-gray-600 dark:text-gray-300" />
                  {new Date(opportunity.startDate).toLocaleDateString()} -{' '}
                  {new Date(opportunity.endDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <MapPin className="w-4 h-4 mr-1 text-gray-600 dark:text-gray-300" />
                  {opportunity.location}
                </div>
                <Link to={`/opportunity/${opportunity._id}`} passHref>
                  <Button className="w-full bg-emerald-400 hover:bg-emerald-600 transition-all">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default CompetitionsFeature;
