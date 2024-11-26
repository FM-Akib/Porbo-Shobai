import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="bg-white  md:py-10">
      <div className="max-w-5xl mx-auto ">

        <div
          className=" h-96 md:h-[470px] bg-center bg-cover flex items-center justify-center"
          style={{
            backgroundImage:
              "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
          }}
        >
          <h1 className=" font-extrabold bg-white/50 px-8 py-4 rounded-lg text-red-500 text-title text-balance text-4xl md:text-5xl xl:text-5xl">404</h1>
        </div>

        <div className="text-center font-semibold dark:text-gray-700">
          <h3 className="text-2xl md:text-4xl font-bold ">Look like you&apos;re lost</h3>
          <p className="text-base mb-4">The page you are looking for is not available!</p>
          <Link
            to="/"
            className="link_404 text-white bg-green-600 px-5 py-2 inline-block mt-2 rounded-md shadow-sm hover:bg-green-700"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
