import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const login = () => {
    const [eye, setEye] = useState(false);  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);
  
    const handelSeePass = () => {
      setEye(!eye);
    };


    return (
        <div className="flex justify-center items-center my-16">
      <div className="mx-4 border border-black dark:border-white shadow-md bg-white w-full max-w-4xl p-8 space-y-3 rounded-tl-xl rounded-br-xl dark:bg-black dark:text-white">
        <div className="space-y-6 flex flex-col md:flex-row  gap-4">
          {/* image div */}
          <div  className="md:w-3/6 bg-[url('https://i.ibb.co.com/w016jcN/undraw-Emails-re-cqen.png')] bg-cover bg-no-repeat bg-center"></div>
          {/* form div */}
          <div className="md:w-3/6">
            <h3 className="text-sm font-semibold ">Hi Achiever</h3>
            <h1 className="text-xl font-bold mt-2">Welcome back to Porbo Shobai</h1>



            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">

              <div className="space-y-1 text-sm">
                <label htmlFor="email" className="block dark:text-white">
                  Email 
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="border-b border-black w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                  {...register("email", { required: true })}
                />
                
              </div>
              <div className=" ">
                {/* password field 1 */}
                <div className="space-y-1 text-sm relative">
                  <label
                    htmlFor="password"
                    className="block dark:text-white"
                  >
                    Password 
                  </label>
                  <input
                    type={eye ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="border-b border-black w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                    {...register("Password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/,
                    })}
                  />
                  {errors.Password?.type === "required" && (
                    <span className="text-red-500">Password is required</span>
                  )}
                  {errors.Password?.type === "minLength" && (
                    <span className="text-red-500">
                      Password must be 6 characters
                    </span>
                  )}
                  {errors.Password?.type === "maxLength" && (
                    <span className="text-red-500">
                      Password must be less than 20 characters
                    </span>
                  )}
                  {errors.Password?.type === "pattern" && (
                    <span className="text-red-500">
                      Password must have at least one uppercase, one lowercase,
                      one number and one special character
                    </span>
                  )}
                  <Link
                    onClick={handelSeePass}
                    className="text-2xl absolute right-3 top-[30px]"
                  >
                    {eye ? <FaRegEye /> : <FaRegEyeSlash />}
                  </Link>
                </div>

              </div>

              <div className="flex justify-center">
                <button className="flex border border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black font-bold w-2/3 h-16 justify-center items-center align-center rounded-2xl">
                  Login
                </button>
              </div>
            </form>
            <div className="flex items-center pt-4 space-x-1">
              <div className="flex-1 h-px sm:w-16 bg-black dark:bg-gray-300"></div>
              <div>
              
              <p className="px-3 text-sm text-center">
                Or login with Google
              </p>
              </div>
              
              <div className="flex-1 h-px sm:w-16 bg-black dark:bg-gray-300"></div>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                aria-label="Log in with Google"
                className="p-3 rounded-sm"
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
            <p className="text-xs text-center sm:px-6 dark:text-white">
              {"Don not have an account? "}
              <Link
                rel="noopener noreferrer"
                to={"/register"}
                className="underline dark:text-white font-bold"
              >
                {"Register"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    );
};

export default login;