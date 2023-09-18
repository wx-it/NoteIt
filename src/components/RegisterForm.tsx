import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiFillEye } from "react-icons/ai";
import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [text, setText] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
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
    <div className="flex flex-col items-center justify-center w-screen h-screen md:w-[50%]">
      <div className="md:w-[50%] flex items-center justify-center flex-col">
        <div className="text-center">
          <h1 className="text-black text-4xl font-semibold0">NOTE iT</h1>
          <div className="space-y-2 mt-6">
            <h2 className="text-[22px] font-semibold leading-7 ">
              Create an Account
            </h2>
            <p className=" text-slate-800 text-opacity-80 text-sm font-normal leading-[18.76px]">
              Sign up now to get started with an account.
            </p>
          </div>
          <div className="px-6 w-screen mt-4 md:w-full md:px-0">
            <button
              onClick={signInWithGoogle}
              className="cursor-pointer w-full px-3.5 py-2 text-lg rounded border border-blue-950 border-opacity-25 justify-center items-center gap-5 inline-flex hover:border-black hover:border-2"
            >
              <FcGoogle />
            </button>
          </div>
        </div>
        <div className="flex w-full items-center justify-center gap-4 my-4 px-6 md:px-0">
          <div className=" w-full md:w-screen h-[0px] border border-blue-950 border-opacity-25"></div>
          <p className="text-center text-blue-950 text-opacity-25 text-sm font-normal leading-[18.76px]">
            OR
          </p>
          <div className="w-full md:w-screen h-[0px] border border-blue-950 border-opacity-25"></div>
        </div>

        <div className="w-full px-6 space-y-4 md:px-0">
          {/* <div>
            <div className="">
              <span className="text-black text-opacity-80 text-xs font-medium">
                Full Name
              </span>
              <span className="text-red-500 text-xs font-medium">*</span>
            </div>
            <input
              className="w-full text-xs pr-4 pl-3 py-2 rounded-[3px] shadow  border-blue-950 border-opacity-20 border focus:border-black focus:border-opacity-80 focus:outline-none"
              type="text"
              placeholder="Full Name"
            />
          </div> */}

          <div className="">
            <div className="">
              <span className="text-black text-opacity-80 text-xs font-medium">
                Email Adress
              </span>
              <span className="text-red-500 text-xs font-medium">*</span>
            </div>
            <input
              className=" w-full text-xs pr-4 pl-3 py-2 rounded-[3px]  border-blue-950 border-opacity-20 border focus:shadow-forms focus:border-black focus:border-2 focus:outline-none"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="">
            <div className="">
              <span className="text-black text-opacity-80 text-xs font-medium">
                Password
              </span>
              <span className="text-red-500 text-xs font-medium">*</span>
            </div>
            <div className="relative">
              <input
                className="w-full text-xs pr-4 pl-3 py-2 rounded-[3px] shadow  border-blue-950 border-opacity-20 border focus:shadow-forms focus:border-black focus:border-2 focus:outline-none"
                type={text ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute right-2 top-2 text-gray-500 cursor-pointer"
                onClick={switchType}
              >
                {text ? <AiFillEye /> : <AiOutlineEye />}
              </div>
            </div>

            <button
              onClick={signIn}
              className=" cursor-pointer w-full px-3.5 py-2 bg-black rounded text-center text-neutral-100 text-base font-semibold mt-6"
            >
              Get Started
            </button>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <p className="text-center text-black text-[13px] font-normal leading-none">
              Already have an account?
            </p>
            <a className=" cursor-pointer text-center text-neutral-700 text-opacity-80 text-[13px] font-semibold">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
