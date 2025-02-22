import { toast } from '@/Hooks/use-toast';
import { AuthContext } from '@/provider/AuthProvider';
import { ToastAction } from '@radix-ui/react-toast';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const [eye, setEye] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logIn, googleLogIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async data => {
    logIn(data.email, data.Password)
      .then(() => {
        toast({
          variant: 'default',
          title: 'Welcome Back to Porbo Shobai',
          description: 'User Logged In Successfully',
          action: <ToastAction altText="Try again">OK!</ToastAction>,
        });
        navigate(location?.state ? location.state : '/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleGoogleLogIn = () => {
    googleLogIn()
      .then(() => {
        toast({
          variant: 'default',
          title: 'Welcome back to Porbo Shobai',
          description: 'Logged In Successfully',
          action: <ToastAction altText="Try again">OK!</ToastAction>,
        });
        navigate(location?.state ? location.state : '/');
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          title: 'Login failed',
          description: 'Something went wrong',
          action: <ToastAction altText="Try again">OK!</ToastAction>,
        });
      });
  };

  const handleSeePass = () => {
    setEye(!eye);
  };

  return (
    <div className="flex justify-center items-center my-16 mx-4 sm:mx-0">
      <div className="border border-black dark:border-white shadow-md bg-white dark:bg-gray-900 w-full max-w-4xl p-8 space-y-3 rounded-lg">
        <div className="space-y-6 flex flex-col md:flex-row gap-6">
          {/* Image div */}
          <div
            className="md:w-1/2 bg-cover bg-no-repeat bg-center rounded-lg"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/ds0io6msx/image/upload/v1740158962/PorboShobai/bwqkwxtvhtcu8jqyqlwp.png')",
            }}
          ></div>
          {/* Form div */}
          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300">
              Hi Achiever
            </h3>
            <h1 className="text-2xl font-bold mt-2 text-gray-900 dark:text-gray-100">
              Welcome back to Porbo Shobai
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="email"
                  className="block text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
              </div>
              <div className="space-y-1 text-sm relative">
                <label
                  htmlFor="password"
                  className="block text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <input
                  type={eye ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  {...register('Password', {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/,
                  })}
                />
                {errors.Password && (
                  <span className="text-red-500">
                    {errors.Password.message}
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleSeePass}
                  className="absolute right-3 top-[30px] text-xl text-gray-600 dark:text-gray-300"
                >
                  {eye ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
              <div className="flex justify-center">
                <button className="w-2/3 h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md transition duration-300">
                  Login
                </button>
              </div>
            </form>
            <div className="flex items-center pt-4 space-x-2">
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
              <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                Or login with
              </p>
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleGoogleLogIn}
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300"
                aria-label="Log in with Google"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                </svg>
              </button>
            </div>
            <p className="text-xs text-center mt-6 text-gray-600 dark:text-gray-300">
              {"Don't have an account? "}
              <Link
                to="/register"
                className="underline font-bold text-indigo-600 dark:text-indigo-400"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
