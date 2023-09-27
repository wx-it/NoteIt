import RegisterForm from "../components/RegisterForm";
import loginImg from "../assets/img/login.svg";
import LoginForm from "../components/LoginForm";
import { useState } from "react";

const Authentication = () => {
  const [login, setLogin] = useState(false);

  return (
    <div className="flex w-full items-center justify-center">
      {login ? <LoginForm setLogin={setLogin}  /> : <RegisterForm setLogin={setLogin}  />}
      <div className="w-[50%] md:visible ">
        <img
          className=" h-full w-full object-cover filter brightness-85 "
          src={loginImg}
          alt=""
        />
      </div>
    </div>
  );
};

export default Authentication;
