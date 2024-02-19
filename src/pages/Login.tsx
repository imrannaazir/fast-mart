import LoginForm from "@/components/forms/LoginForms";
import Container from "@/components/ui/container";

const LoginPage = () => {
  return (
    <Container>
      <div className="flex">
        <div className="flex-1 flex justify-center items-center">
          <img className="h-[600px]" src="/src/assets/login-image.png" alt="" />
        </div>
        {/* log in form */}
        <section className="max-w-md flex-1 flex justify-center items-center min-h-screen border-l px-6">
          <div className="flex-1">
            <LoginForm />
          </div>
        </section>
      </div>
    </Container>
  );
};

export default LoginPage;
