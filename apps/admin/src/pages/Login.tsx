import LoginForm from "@/components/forms/LoginForms";
import RegistrationForm from "@/components/forms/RegistrationForm";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useState } from "react";

const LoginPage = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  return (
    <Container>
      <div className="flex">
        <div className="hidden flex-1 items-center justify-center lg:flex">
          <img className="h-[600px]" src="/src/assets/login-image.png" alt="" />
        </div>
        {/* log in form */}
        <section className="flex min-h-screen max-w-md flex-1 items-center justify-center border-l px-6">
          <div className="flex-1">
            <h1 className="mb-6 text-3xl">{isLoginForm ? "Login" : "Register"}</h1>
            {isLoginForm ? <LoginForm /> : <RegistrationForm />}
            {isLoginForm ? (
              <p>
                Haven't an account?{" "}
                <Button type="button" onClick={() => setIsLoginForm(false)} variant={"link"}>
                  Register
                </Button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <Button type="button" onClick={() => setIsLoginForm(true)} variant={"link"}>
                  Login
                </Button>
              </p>
            )}
          </div>
        </section>
      </div>
    </Container>
  );
};

export default LoginPage;
