import { Award, Trophy } from 'lucide-react';

const RankCard = ({ user, rank, isMiddle }) => {
  const cardClass = isMiddle
    ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 transform scale-110 z-10'
    : 'bg-gradient-to-br from-green-100 to-green-300';

  return (
    <div
      className={`${cardClass} rounded-lg shadow-lg p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl`}
    >
      <div className="text-4xl font-bold mb-2">#{rank}</div>
      {isMiddle ? (
        <Trophy className="w-12 h-12 text-white mb-4" />
      ) : (
        <Award className="w-10 h-10 text-gray-800 mb-4" />
      )}
      <h3 className="text-xl font-semibold mb-2">{`${user.firstName} ${user.lastName}`}</h3>
      <p className="text-sm mb-2">{user.institution}</p>
      <div className="bg-white text-gray-800 rounded-full px-3 py-1 text-sm font-semibold mb-2">
        {user.badge}
      </div>
      <p className="text-lg font-bold">{user.points} pts</p>
    </div>
  );
};

export default function TopThreeCards({ topThree }) {
  // Sort the top three users based on points
  const sortedTopThree = topThree.sort((a, b) => b.points - a.points);

  return (
    <div className="flex justify-center items-center space-x-4 mb-12">
      <div className="w-1/4">
        <RankCard user={sortedTopThree[1]} rank={2} />
      </div>
      <div className="w-1/3">
        <RankCard user={sortedTopThree[0]} rank={1} isMiddle={true} />
      </div>
      <div className="w-1/4">
        <RankCard user={sortedTopThree[2]} rank={3} />
      </div>
    </div>
  );
}
