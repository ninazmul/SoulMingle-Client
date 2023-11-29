import { useForm } from "react-hook-form";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useContext, useEffect, useRef, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { signInWithGoogle } = useContext(AuthContext);
  const capthcaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);


  const from = location.state?.form?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
      console.log(data);
      createUser(
        data.email,
        data.password
      ).then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(data.displayName, data.photoURL)
          .then(() => {
            
            const userInfo = {
              name: data.displayName,
              email: data.email
            };

            axiosPublic.post('/user', userInfo)
              .then(res => {
                if (res.data.insertedId) {
                reset();
                Swal.fire({
                  icon: "success",
                  title: "Successful!",
                  text: "Sign In successfully!",
                });
                navigate(from, { replace: true });
              }
            });
            
          })
        .catch(error=>console.log(error))
       
      });
  };
  console.log(watch("name"));

  const handleValidateCaptcha = () => {
    const user_captcha_value = capthcaRef.current.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

   const handleGoogleSignIn = async () => {
     try {
       await signInWithGoogle()
         .then(result => {
         const userInfo = {
           name: result.user?.displayName,
           email: result.user?.email,
         };

         axiosPublic.post("/user", userInfo).then((res) => {
           if (res.data.insertedId) {
             Swal.fire({
               icon: "success",
               title: "Successful!",
               text: "Sign In successfully!",
             });
             navigate(from, { replace: true });
           }
         });
           reset();
           Swal.fire({
             icon: "success",
             title: "Successful!",
             text: "Sign In successfully!",
           });
           navigate(from, { replace: true });
       })
       
     } catch (error) {
       console.error("Google Sign-In Error", error);
     }
   };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  return (
    <>
      <Helmet>
        <title>SoulMingle | Sign Up</title>
      </Helmet>
      <div className="flex flex-col-reverse md:flex-row-reverse justify-between items-center gap-20 p-20 ">
        <div className="w-1/2">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name1" value="Your Name" />
              </div>
              <TextInput
                name="displayName"
                {...register("displayName", { required: true })}
                type="text"
                placeholder="Name"
                required
              />
              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="photo1" value="Your photo url" />
              </div>
              <TextInput
                name="photoURL"
                type="text"
                {...register("photoURL", { required: true })}
                placeholder="Photo URL"
                required
              />
              {errors.photoURL && (
                <span className="text-red-500">Photo URL is required</span>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput
                name="email"
                type="email"
                {...register("email", { required: true })}
                placeholder="name@email.com"
                required
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
              </div>
              <TextInput
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 21,
                  pattern: /^[A-Za-z]+$/i,
                })}
                type="password"
                placeholder="Password"
                required
              />
              {errors.password?.type === "required" && (
                <span className="text-red-500">Password is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-500">
                  Password must be 6 characters
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-500">
                  Password must be less then 21 characters
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-500">
                  Password must have Uppercase, lowercase, one number and one
                  special character
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="age" />
              <Label htmlFor="age">I am 18 years or older</Label>
            </div>
            <div>
              <div className="mb-2 block">
                <LoadCanvasTemplate />
              </div>
              <div className="flex items-center gap-2">
                <TextInput
                  className="w-3/4"
                  name="captcha"
                  ref={capthcaRef}
                  placeholder="Input Captcha"
                  type="text"
                  required
                />
                <Button
                  onClick={handleValidateCaptcha}
                  className="w-1/4"
                  outline
                  gradientDuoTone="purpleToPink"
                >
                  Validate
                </Button>
              </div>
            </div>
            <Button disabled={disabled} type="submit" className="bg-pink-500">
              <input type="submit" value="SignUp" />
            </Button>
            <div className="text-center">
              <p>Or</p>
            </div>
            <div>
              <button
                onClick={handleGoogleSignIn}
                type="button"
                className="text-white w-full bg-pink-500 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 19"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                    clipRule="evenodd"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>
          </form>
          {
            <p className="text-center p-2">
              "Already have an account?{" "}
              <Link to="/signIn" className="underline text-pink-500">
                Sign In here
              </Link>
              "
            </p>
          }
        </div>
        <div className="w-1/2">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Get back to growth with{" "}
            <span className="text-pink-600 dark:text-pink-500">
              the world's #1
            </span>{" "}
            Dating site.
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            "Welcome back! Please sign Up to continue."
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
