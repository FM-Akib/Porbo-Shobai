export default function LeaderboardBanner() {
  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-gray-800 dark:to-gray-900 text-white py-12 px-6 sm:px-8 lg:px-12 rounded-lg shadow-lg mb-8 transition-all duration-300">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          Global Leaderboard
        </h1>
        <p className="mt-6 text-lg sm:text-xl md:text-2xl">
          Compete, achieve, and rise to the top! Your journey to excellence
          starts here.
        </p>
      </div>
    </div>
  );
}
