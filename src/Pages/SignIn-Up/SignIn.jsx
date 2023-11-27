import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useContext, useEffect, useRef, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const SignIn = () => {
    const capthcaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);

    const { signIn } = useContext(AuthContext);

    const handleSignIn = async (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;

      try {
        const result = await signIn(email, password);
        const user = result.user;
        console.log("Sign-in successful:", user);
      } catch (error) {
        console.error("Sign-in error:", error.code, error.message);
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
