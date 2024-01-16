import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useContext, useEffect, useRef, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SignIn = () => {
    const capthcaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const from = location.state?.form?.pathname || "/";

    const { signIn, signInWithGoogle } = useContext(AuthContext);

    const handleSignIn = async (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;

      try {
        const result = await signIn(email, password);
        const user = result.user;
        console.log("Sign-in successful:", user);
        Swal.fire({
          icon: "success",
          title: "Successful!",
          text: "Sign In successfully!",
        });
        navigate(from, { replace: true });
      } catch (error) {
        console.error("Sign-in error:", error.code, error.message);
        Swal.fire({
          icon: "error",
          title: "Oops..!",
          text: "No user found, Sign In failed!",
        });
      }
    };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle().then((result) => {
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
        Swal.fire({
          icon: "success",
          title: "Successful!",
          text: "Sign In successfully!",
        });
        navigate(from, { replace: true });
      });
    } catch (error) {
      console.error("Google Sign-In Error", error);
    }
  };


    const handleValidateCaptcha = () => {
        const user_captcha_value = capthcaRef.current.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true)
        }
    }

    useEffect(() => {
            loadCaptchaEnginge(6); 

    }, []);

    return (
      <>
        <Helmet>
          <title>SoulMingle | Sign In</title>
        </Helmet>
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-20 p-20 ">
          <div className="w-1/2">
            <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Your email" />
                </div>
                <TextInput
                  name="email"
                  type="email"
                  placeholder="name@email.com"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Your password" />
                </div>
                <TextInput
                  name="password"
                  placeholder="Password"
                  type="password"
                  required
                />
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
                <input type="submit" value="SignIn" />
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
                "Don't have an account?{" "}
                <Link to="/signUp" className="underline text-pink-500">
                  Sign Up here
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
              "Welcome back! Please sign in to continue."
            </p>
          </div>
        </div>
      </>
    );
};

export default SignIn;
