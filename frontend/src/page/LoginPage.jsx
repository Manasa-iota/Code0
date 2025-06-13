import AuthForm from "../components/AuthForm";
import CodeBackground from "../components/CodeBackground";

const LoginPage = () => (
  <div className="h-screen grid lg:grid-cols-2">
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-base-content/60">Login to your account</p>
        </div>
        <AuthForm mode="login" />
      </div>
    </div>
    <CodeBackground title="Welcome back!" subtitle="Login to continue your journey." />
  </div>
);
export default LoginPage;
