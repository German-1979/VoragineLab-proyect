
import { LoginForm } from "@/components/AuthForms";
import Navbar from "@/components/Navbar";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
