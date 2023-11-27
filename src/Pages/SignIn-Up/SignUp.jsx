import { useForm } from "react-hook-form";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useContext, useEffect, useRef, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../providers/AuthProvider";

const SignUp = () => {
    const { createUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
      console.log(data);
      createUser(
        data.email,
        data.password,
        data.displayName,
        data.photoURL
      ).then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
      });
  };
  console.log(watch("name"));

  const capthcaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);

  const handleValidateCaptcha = () => {
    const user_captcha_value = capthcaRef.current.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
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
              {errors.password && (
                <span className="text-red-500">
                  Check the password, minimum 6 and maximum 21 characters, also
                  A-a, and spacial characters are required
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
