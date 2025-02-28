import { Handshake, TextSearch } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const MentorsHero = () => {
  return (
    <section className="bg-[#fef2f2] dark:bg-[#020817]">
      <div className="relative max-w-7xl mx-auto px-6 py-4 lg:py-20 ">
        <div className="lg:flex lg:items-center lg:gap-12">
          <div className="relative z-10 text-center max-w-2xl mx-auto lg:ml-0 lg:text-left lg:w-1/2">
            <h1 className="mt-3 text-title font-bold text-balance text-4xl md:text-5xl xl:text-5xl">
              Shape Your Dreams
            </h1>
            <p className="mt-8 text-body text-justify">
              Connect with expert mentors and get personalized guidence to build
              your future, tailored for school and college students.
            </p>
            <div>
              <ul className="mt-2 list-inside list-disc flex gap-2 justify-center items-start flex-col">
                <li>Guidance</li>
                <li>Support</li>
                <li>Coaching</li>
              </ul>
            </div>
            <div className="flex gap-4 mt-8 flex-wrap justify-center lg:justify-start items-center">
              <Link to="/find-mentor">
                <Button className="bg-green-500 flex items-center dark:hover:bg-green-600 px-6 py-7 shadow-md  rounded-xl dark:text-white text-lg">
                  <TextSearch className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  Find a Mentor
                </Button>
              </Link>

              <Link to="/create-mentor">
                {' '}
                <Button
                  variant="secondary"
                  className="flex items-center px-6 py-7 bg-white shadow-md hover:bg-gray-700 hover:text-white dark:text-gray-600 dark:hover:text-white rounded-xl text-lg"
                >
                  <Handshake className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  Be a Mentor
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative lg:absolute inset-x-0 right-6 mt-12 lg:mt-0 lg:inset-y-16 h-fit mx-auto lg:mr-0 ml-auto max-w-md [--ui-shadow-border:var(--ui-border-color)]">
            <img
              src="https://res.cloudinary.com/ds0io6msx/image/upload/v1740209243/PorboShobai/vwo96azwehu9g4l48sbs.png"
              alt="project illustration"
              height=""
              width=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorsHero;
