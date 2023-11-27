import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

const SignIn = () => {
    const capthcaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);

    const handleSignIn = e => {
        event.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
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
              <TextInput name="password" type="password" required />
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
    );
};

export default SignIn;
