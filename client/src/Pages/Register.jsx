import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useToast } from "@/Hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import useAuth from "@/hooks/useAuth";
import { updateProfile } from "firebase/auth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { confettiShape } from "@/utils/ConfettiShape";


const Register = () => {
  const { createUser, setUpdate, update, googleLogIn } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [eye, setEye] = useState(false);
  const [eyeTwo, setEyeTwo] = useState(false);
  const [role, setRole] = useState("student");
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // console.log(data);
    if(data.Password !== data.confirmPassword){
      toast({
        variant: "destructive",
        title: "Password didn't match",
        description: "Password and Confirm Password has to be same",
        action: <ToastAction altText="Try again">OK!</ToastAction>,
      })
      return ;
    }

    createUser(data.email, data.Password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        updateProfile(user, {
          displayName: data.firstName,
        })
        
        .then(() => {
          setUpdate(!update);
          const userInfo = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            mobileNo: data.mobileNumber,
            image: "",
            password: data.Password,
            role: role,
          }
          axiosSecure.post("/users", userInfo)
          .then(data => {
            // console.log(data.data);
            if (data.data.insertedId) {
              confettiShape();
              navigate(location?.state ? location.state : "/");
              toast({
                variant: "default",
                title: "Welcome to Porbo Shobai",
                description: "User Created Successfully",
                action: <ToastAction altText="Try again">OK!</ToastAction>,
              })
            }
            
          })
          .catch(error => {
            console.log(error);
          })
        })
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleGoogleLogIn = () => {
    googleLogIn()
      .then((result) => {
        const userInfo = {
          firstName: result.user?.displayName.split(" ")[0],
          lastName: result.user?.displayName.split(" ").slice(1).join(" "),
          email: result.user?.email,
          mobileNo: "",
          image: result.user?.photoURL,
          role: role,
        }
        axiosSecure.post("/users", userInfo)
        .then(data => {
          // console.log(data.data);
          if (data.data.insertedId) {
            confettiShape();
            navigate(location?.state ? location.state : "/");
            toast({
              variant: "default",
              title: "Welcome to Porbo Shobai",
              description: "User Created Successfully",
              action: <ToastAction altText="Try again">OK!</ToastAction>,
            })
          }
          
        })
        .catch(error => {
          console.log(error);
        })
       
      })
      .catch(()=>{
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "Something went wrong",
          action: <ToastAction altText="Try again">OK!</ToastAction>,
        })

      });
  };

  const handelSeePass = () => {
    setEye(!eye);
  };
  const handelSeePassTwo = () => {
    setEyeTwo(!eyeTwo);
  };
  const handleRole = (e) => {
    setRole(e.target.value);
  };
  return (
    <div className="mx-4 flex justify-center items-center my-16">
      <div className=" border border-black dark:border-white shadow-md bg-white w-full max-w-4xl p-8 space-y-3 rounded-tl-xl rounded-br-xl dark:bg-black dark:text-white">
        <div className="space-y-6 flex flex-col md:flex-row  gap-4">
          {/* image div */}
          <div  className="md:w-3/6 bg-[url('https://i.ibb.co.com/w016jcN/undraw-Emails-re-cqen.png')] bg-cover bg-no-repeat bg-center"></div>
          {/* form div */}
          <div className="md:w-3/6">
            <h3 className="text-sm font-semibold ">Ready to be a Achiever</h3>
            <h1 className="text-xl font-bold mt-2">Create An Account</h1>
            <p className="text-sm dark:text-white font-semibold my-4">
              Create as a{" "}
            </p>
            <div className="flex gap-5">
              <Link
                onClick={() => {
                  handleRole({ target: { value: "student" } });
                }}
                className={`flex border border-black dark:border-white ${role !== "student" ? "text-black dark:text-white" : ""} font-bold w-40 h-16 justify-center items-center align-center rounded-2xl ${
                  role === "student" ? "bg-black dark:bg-white text-white dark:text-black" : ""
                } `}
              >
                Student
              </Link>
              <Link
                onClick={() => {
                  handleRole({ target: { value: "company" } });
                }}
                className={`flex border border-black dark:border-white ${role !== "company" ? "text-black dark:text-white" : ""} font-bold w-40 h-16 justify-center items-center align-center rounded-2xl ${
                  role === "company" ? "bg-black dark:bg-white text-white dark:text-black" : ""
                } `}
              >
                Company
              </Link>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
              {/* name field */}
              <div className="flex gap-4 justify-between">
                <div className="space-y-1 text-sm">
                  <label
                    htmlFor="username"
                    className="block dark:text-white"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    className="border border-black w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                    {...register("firstName", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-red-500">First Name is required</span>
                  )}
                </div>
                <div className="space-y-1 text-sm">
                  <label
                    htmlFor="username"
                    className="block dark:text-white"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    className="border border-black  w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-white focus:dark:border-violet-600"
                    {...register("lastName", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-red-500">Last Name is required</span>
                  )}
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="email" className="block dark:text-white">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="border border-black w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                  {...register("email", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500">Email is required</span>
                )}
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="number" className="block dark:text-white">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="mobileNumber"
                  id="mobileNumber"
                  placeholder="Mobile Number"
                  className="border border-black w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                  {...register("mobileNumber", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500">
                    Mobile Number is required
                  </span>
                )}
              </div>

              <div className="flex gap-4 justify-between">
                {/* password field 1 */}
                <div className="space-y-1 text-sm relative">
                  <label
                    htmlFor="password"
                    className="block dark:text-white"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={eye ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="border border-black w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
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
                  {/* <div className="flex justify-end text-xs dark:text-white">
              <a rel="noopener noreferrer" href="#">
                Forgot Password?
              </a>
            </div> */}
                </div>
                {/* password field 2 */}
                <div className="space-y-1 text-sm relative">
                  <label
                    htmlFor="password"
                    className="block dark:text-white"
                  >
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={eyeTwo ? "text" : "password"}
                    name="Confirmpassword"
                    id="ConfirmPassword"
                    placeholder="Confirm Password"
                    className="border border-black w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                    {...register("confirmPassword", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,

                      pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/,
                    })}
                  />
                  {errors.confirmPassword?.type === "required" && (
                    <span className="text-red-500">Password is required</span>
                  )}
                  {errors.confirmPassword?.type === "minLength" && (
                    <span className="text-red-500">
                      Password must be 6 characters
                    </span>
                  )}
                  {errors.confirmPassword?.type === "maxLength" && (
                    <span className="text-red-500">
                      Password must be less than or equal to 20 characters{" "}
                    </span>
                  )}
                  {errors.confirmPassword?.type === "pattern" && (
                    <span className="text-red-500">
                      Password must be at least one uppercase, one lowercase,
                      one number and one special character
                    </span>
                  )}
                  <Link
                    onClick={handelSeePassTwo}
                    className="text-2xl absolute right-3 top-[30px]"
                  >
                    {eyeTwo ? <FaRegEye /> : <FaRegEyeSlash />}
                  </Link>
                  
                </div>
              </div>
              <div className="flex items-center ">
              <input
                type="checkbox"
                name="acceptTerms"
                id="acceptTerms"
                aria-label="I agree to the terms and conditions."
                className="mr-1 rounded-sm  focus:dark:ring-violet-600 focus:dark:border-violet-600 focus:ring-2 dark:accent-violet-600"
                {...register("acceptTerms", { required: true })}
              />
              
              <p>I agree to the terms and conditions.</p>
              </div>
              {
                errors.acceptTerms?.type === "required" && (
                  <span className="text-red-500">
                    You must agree to the terms and conditions
                  </span>
                )
              }

              <div className="flex justify-center">
                <button className="flex border border-black dark:border-white text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black font-bold w-2/3 h-16 justify-center items-center align-center rounded-2xl">
                  Register
                </button>
              </div>
            </form>
            <div className="flex items-center pt-4 space-x-1">
              <div className="flex-1 h-px sm:w-16 bg-black dark:bg-white"></div>
              <p className="px-3 text-sm text-center dark:text-white">
                Or Register with Google
              </p>
              <div className="flex-1 h-px sm:w-16 bg-black dark:bg-white"></div>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleGoogleLogIn}
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
              {"Already have an account? "}
              <Link
                rel="noopener noreferrer"
                to={"/Login"}
                className="underline dark:text-white font-bold" 
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
