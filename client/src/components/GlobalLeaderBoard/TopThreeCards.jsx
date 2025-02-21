import { Award, Trophy } from 'lucide-react';

const RankCard = ({ user, rank, isMiddle }) => {
  const cardClass = isMiddle
    ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 dark:from-yellow-600 dark:to-yellow-700 transform scale-110 z-10'
    : 'bg-gradient-to-br from-green-100 to-green-300 dark:from-gray-800 dark:to-gray-700';

  return (
    <div
      className={`${cardClass} rounded-lg shadow-lg p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl`}
    >
      <div className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
        #{rank}
      </div>
      {isMiddle ? (
        <Trophy className="w-12 h-12 text-white mb-4" />
      ) : (
        <Award className="w-10 h-10 text-gray-800 dark:text-gray-200 mb-4" />
      )}
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {`${user.firstName} ${user.lastName}`}
      </h3>
      <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">
        {user.institution}
      </p>
      <div className="bg-white dark:bg-gray-600 text-gray-800 dark:text-white rounded-full px-3 py-1 text-sm font-semibold mb-2">
        {user.badge}
      </div>
      <p className="text-lg font-bold text-gray-900 dark:text-white">
        {user.points} pts
      </p>
    </div>
  );
};

export default function TopThreeCards({ topThree }) {
  // Sort the top three users based on points
  const sortedTopThree = topThree.sort((a, b) => b.points - a.points);

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-4 space-y-4 sm:space-y-0 mb-12">
      <div className="w-full sm:w-1/4 flex justify-center">
        <RankCard user={sortedTopThree[1]} rank={2} />
      </div>
      <div className="w-full sm:w-1/3 flex justify-center">
        <RankCard user={sortedTopThree[0]} rank={1} isMiddle={true} />
      </div>
      <div className="w-full sm:w-1/4 flex justify-center">
        <RankCard user={sortedTopThree[2]} rank={3} />
      </div>
    </div>
  );
}
