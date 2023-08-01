import LoginForm from "../components/LoginForm";
import loginImg from "../assets/img/login.jpg";

const Login = () => {
  return (
    <div className="flex w-full h-screen items-center justify-between">
      <LoginForm />
      <div className="w-[50%] h-screen object-cover md:visible">
        <img src={loginImg} alt="" />
      </div>
    </div>
  );
};

export default Login;
