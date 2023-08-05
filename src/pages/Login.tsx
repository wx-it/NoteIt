import LoginForm from "../components/RegisterForm";
import loginImg from "../assets/img/login.jpg";

const Login = () => {
  return (
    <div className="flex w-full items-start justify-between">
      <LoginForm />
      <div className="w-[50%] h-screen md:visible md:p-6">
        <img className=" h-full w-full object-cover filter brightness-85 " src={loginImg} alt="" />
      </div>
    </div>
  );
};

export default Login;
