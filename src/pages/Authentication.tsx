import RegisterForm from "../components/RegisterForm";
//import loginImg from "../assets/img/login.svg";
import LoginForm from "../components/LoginForm";
import { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animation_ln5y0mmr.json";

const Authentication = () => {
  const [login, setLogin] = useState<boolean>(false);

  return (
    <div className="flex w-full h-screen items-center justify-center bg-[#fff]">
      <div className="flex flex-col w-[50%] h-[50%] items-center justify-center gap-4">
        <h1 className="text-[#464646] text-4xl font-semibold">NoteIt.</h1>

        {login ? (
          <LoginForm setLogin={setLogin} />
        ) : (
          <RegisterForm setLogin={setLogin} />
        )}
      </div>
      <div className="w-[50%] md:flex bg-[#464646] hidden items-center justify-center flex-col h-[95%] mx-4 rounded-xl ">
        {/* <img
          className=" h-full w-full object-cover filter brightness-85 "
          src={loginImg}
          alt=""
        /> */}

        <Lottie animationData={animationData} className="w-[70%] " />
        <h2 className="text-white text-3xl font-semibold max-w-sm text-center">
          Create an account and start typing!
        </h2>
      </div>
    </div>
  );
};

export default Authentication;
