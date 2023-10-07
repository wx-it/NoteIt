import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiFillEye } from "react-icons/ai";
import { useState } from "react";
import { googleProvider } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  getAuth,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

interface LoginFormProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ setLogin }) => {
  const [text, setText] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const { register } = useForm();

  const navigate = useNavigate();

  const auth = getAuth();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/missing-password") {
          setPasswordError("Missing password");
        }
        if (error.code === "auth/wrong-password") {
          setPasswordError("Wrong password, please try again");
        }

        if (error.code === "auth/user-not-found") {
          setEmailError("Email not found, please sign up instead");
        }

        if (error.code === "auth/invalid-email") {
          setEmailError("Invalid email");
        }
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  //switch password type
  const switchType = () => {
    setText(!text);
  };

  return (
    <div className="flex flex-col items-center justify-center w-[100%] px-4 h-screen md:w-[70%] lg:w-[60%]">
      <div className="w-full flex items-center justify-center flex-col bg-[#F3F3F3] shadow-auth px-4 py-6 rounded-lg ">
        <div className="text-center w-full">
          <div className="space-y-2 mt-6 flex items-center justify-center flex-col">
            <h2 className="text-[#464646] text-[22px] font-semibold leading-7">
              Log In
            </h2>
            <p className=" text-slate-800 text-opacity-80 text-xs md:text-sm w-[70%] text-center font-normal leading-[18.76px]">
              Log in to your account.
            </p>
          </div>
          <div className="px-6 mt-4 w-full md:px-0">
            <motion.button
              whileHover={{
                boxShadow: "0px 0px 0px 2px #464646",
                border: "2px #464646 solid",
              }}
              whileTap={{ scale: 0, x: 0 }}
              transition={{
                type: "tween",
                ease: "easeInOut",
                duration: 1,
              }}
              onClick={signInWithGoogle}
              className="cursor-pointer w-full px-3.5 py-2 text-lg bg-transparent rounded border border-blue-950 border-opacity-25 justify-center items-center inline-flex"
            >
              <FcGoogle />
            </motion.button>
          </div>
        </div>
        <div className="flex w-full items-center justify-center gap-4 my-4 px-6 md:px-0">
          <div className=" w-full md:w-screen h-[0px] border border-blue-950 border-opacity-25"></div>
          <p className="text-center text-blue-950 text-opacity-25 text-sm font-normal leading-[18.76px]">
            OR
          </p>
          <div className="w-full md:w-screen h-[0px] border border-blue-950 border-opacity-25"></div>
        </div>

        <form onSubmit={signIn} className="w-full px-6 space-y-4 md:px-0">
          <div className="">
            <div className="">
              <span className="text-black text-opacity-80 text-xs font-medium">
                Email Adress
              </span>
              <span className="text-red-500 text-xs font-medium">*</span>
            </div>
            <motion.input
              whileFocus={{
                boxShadow: "0px 2px 0px 2px #464646",
                border: "2px #464646 solid",
                backgroundColor: "transparent",
              }}
              //  whileTap={{ scale: 0, x: 0 }}
              transition={{
                type: "spring",
                duration: 1,
              }}
              className=" w-full text-xs pr-4 pl-3 py-2 rounded-[3px]  border-blue-950 border-opacity-20 border focus:outline-none"
              type="text"
              placeholder="Email"
              {...register("email", { required: true })}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <span className="text-xs text-red-700">{emailError}</span>
            )}
          </div>

          <div className="">
            <div className="">
              <span className="text-black text-opacity-80 text-xs font-medium">
                Password
              </span>
              <span className="text-red-500 text-xs font-medium">*</span>
            </div>
            <div className="relative">
              <motion.input
                whileFocus={{
                  boxShadow: "0px 2px 0px 2px #464646",
                  border: "2px #464646 solid",
                  backgroundColor: "transparent",
                }}
                //  whileTap={{ scale: 0, x: 0 }}
                transition={{
                  type: "spring",
                  duration: 1,
                }}
                className=" w-full text-xs pr-4 pl-3 py-2 rounded-[3px]  border-blue-950 border-opacity-20 border focus:outline-none"
                type={text ? "text" : "password"}
                placeholder="Password"
                {...register("passwordt", { required: true })}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute right-2 top-2 text-[#464646] cursor-pointer"
                onClick={switchType}
              >
                {text ? <AiFillEye /> : <AiOutlineEye />}
              </div>
              {passwordError && (
                <span className="text-xs text-red-700">{passwordError}</span>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                damping: 10,
                mass: 0.75,
                stiffness: 100,
                duration: 1,
              }}
              type="submit"
              className=" cursor-pointer w-full px-3.5 py-2 bg-[#464646] rounded text-center text-neutral-100 text-base font-semibold mt-6"
            >
              Log In
            </motion.button>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <p className="text-center text-black text-[13px] font-normal leading-none">
              Don't have an account?
            </p>
            <a
              onClick={() => setLogin(false)}
              className=" cursor-pointer text-center text-neutral-700 text-opacity-80 text-[13px] font-semibold"
            >
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
