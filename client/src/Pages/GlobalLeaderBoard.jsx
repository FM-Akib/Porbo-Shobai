import LeaderboardBanner from '@/components/GlobalLeaderBoard/LeaderBoardBanner';
import LeaderboardTable from '@/components/GlobalLeaderBoard/LeaderboardTable';
import TopThreeCards from '@/components/GlobalLeaderBoard/TopThreeCards';
import Loader from '@/components/shared/Loader';
import { useGetUsersQuery } from '@/redux/api/api';

export default function GlobalLeaderboard() {
  const { data: users, error, isLoading } = useGetUsersQuery();

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  // Sort users by points in decreasing order
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 rounded-lg">
      <LeaderboardBanner />
      <TopThreeCards topThree={sortedUsers.slice(0, 3)} />
      <LeaderboardTable users={sortedUsers.slice(3)} />
    </div>
  );
}
