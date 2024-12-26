import LoginForm from "@/components/forms/login-form";
import AppLogo from "@/components/ui/app-logo";
import { cn } from "@/lib/utils";

const LoginPage = () => {
  return (
    <div className={cn("min-h-screen w-full")}>
      <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-indigo-900 to-teal-900">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-3 flex items-center justify-center">
            <img className="w-[30px]" alt="fastmart" src="/fast-mart-logo.png" />
            <AppLogo className="flex items-center justify-center" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Sign in</h1>
          <p className="mb-6 text-gray-600">Continue as admin</p>

          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
