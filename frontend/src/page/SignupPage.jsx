import AuthForm from "../components/AuthForm";
import CodeBackground from "../components/CodeBackground";

const SignUpPage = () => (
  <div className="h-screen grid lg:grid-cols-2">
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-base-content/60">Sign up to get started</p>
        </div>
        <AuthForm mode="signup" />
      </div>
    </div>
    <CodeBackground title="Join us!" subtitle="Create your account and start exploring." />
  </div>
);
export default SignUpPage;