import axios from "axios";
import Input from "@/components/Input";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState<"login" | "signin">("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "signin" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black h-full w-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img alt="Netflix logo" src="/images/logo.png" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Login" : "Sign in"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "signin" && (
                <Input
                  id="name"
                  label="Username"
                  onChange={(e: any) => setName(e?.target?.value)}
                  value={name}
                  type="text"
                />
              )}
              <Input
                id="email"
                label="Email"
                onChange={(e: any) => setEmail(e?.target?.value)}
                value={email}
                type="email"
              />
              <Input
                id="password"
                label="Password"
                onChange={(e: any) => setPassword(e?.target?.value)}
                value={password}
                type="password"
              />
            </div>
            <button
              onClick={() => (variant === "signin" ? register() : login())}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign in"}
            </button>

            <div className="flex flex-row items-center gap-4 nt-8 justify-center py-6">
              <div
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                onClick={() =>
                  signIn("google", {
                    redirect: true,
                    callbackUrl: "/profiles",
                  })
                }
              >
                <FcGoogle size={30} />
              </div>
              <div
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                onClick={() =>
                  signIn("github", {
                    redirect: true,
                    callbackUrl: "/profiles",
                  })
                }
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already has an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
