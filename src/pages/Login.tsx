import RegisterForm from "../components/RegisterForm";
import loginImg from "../assets/img/login.svg";

const Login = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <RegisterForm />
      <div className="w-[50%] md:visible ">
        <img className=" h-full w-full object-cover filter brightness-85 " src={loginImg} alt="" />
      </div>
    </div>
  );
};

export default Login;
