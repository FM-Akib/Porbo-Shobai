import { SquareArrowOutUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import QuizBrowser from '../Quiz/QuizBrowser';

const MyRegistrationCard = ({ Aopportunity }) => {
  const competitionStartDate = new Date(Aopportunity.competitionStartDate);
  return (
    <article
      className="flex flex-col  md:flex-row  rounded-xl
        bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5"
    >
      <img
        src={Aopportunity?.banner}
        alt="banner"
        className="md:w-1/3  object-cover rounded-t-xl md:rounded-e-none md:rounded-s-xl"
      />

      <div className="rounded-b-xl md:rounded-s-none md:rounded-e-xl w-full bg-white p-4  sm:p-6">
        <div className="flex items-center justify-between">
          <p className="block text-xs text-gray-500">
            Start - {competitionStartDate.toLocaleString()}
          </p>
          <p className="block text-xs text-gray-800 bg-slate-100 px-2 w-fit rounded-sm">
            {Aopportunity.status}
          </p>
        </div>
        <a href="#">
          <h3 className="mt-0.5 text-lg font-medium text-gray-900 flex items-center gap-1">
            {Aopportunity.title}{' '}
            <Link
              to={`/a-opportunity/${Aopportunity._id}`}
              className="flex items-center gap-1 text-purple-600"
            >
              <SquareArrowOutUpRight className="h-4 w-4" />
            </Link>
          </h3>
        </a>

        <QuizBrowser opportunity={Aopportunity} />

        <div className="mt-4 flex flex-wrap gap-1">
          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
            {Aopportunity.mode}
          </span>

          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
            {Aopportunity.participationType}
          </span>
          <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
            Fee - {Aopportunity.registrationFee}
          </span>
          <span className="whitespace-nowrap flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
            Website
            <Link
              to={`${Aopportunity.website}`}
              className="flex items-center gap-1 text-purple-600"
            >
              <SquareArrowOutUpRight className="h-2 w-2" />
            </Link>
          </span>
        </div>
      </div>
    </article>
  );
};

export default MyRegistrationCard;
