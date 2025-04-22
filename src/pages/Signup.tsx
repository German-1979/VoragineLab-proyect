
import { SignupForm } from "@/components/AuthForms";
import Navbar from "@/components/Navbar";

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
