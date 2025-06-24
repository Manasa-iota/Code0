import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key, Loader2, Mail, User } from "lucide-react";

import Input from "../components/Input";
import GoogleAuthBtn from "../components/GoogleAuthBtn";
import GoogleOAuthWrapper from "../components/GoogleOAuthProvider";

import { signupSchema, loginSchema } from "../utils/zod-schema";
import { useSignupAndLoginMutation } from "../querys/useUserQuery";

const LoginAndSignup = ({ type }) => {
  const isSignupPage = type === "signup";
  const navigate = useNavigate();
  const mutation = useSignupAndLoginMutation(type);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isSignupPage ? signupSchema : loginSchema),
  });

  const onSubmit = (data) => {

    mutation.mutate(data);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate("/");
    }
  }, [mutation.isSuccess, isSignupPage, navigate]);

  return (
    <div className="flex items-center w-full min-h-screen">
      <div className="bg-base-100 w-full lg:w-[50%] min-h-screen flex items-center justify-center">
        <div className="w-[80%] md:w-[50%]">
          <h1 className="font-bold text-3xl text-center mb-5">
            {isSignupPage ? "Signup for free" : "Login to your account"}
          </h1>
          <p className="text-center text-base-content/70 mb-6">
            {isSignupPage
              ? "Create your account to start solving coding challenges, track your progress, and join our developer community."
              : "Welcome back! Please login to access your account and continue your coding journey."}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {isSignupPage && (
              <Input
                {...register("fullname")}
                icon={<User />}
                label="Fullname"
                type="text"
                placeholder="Fullname"
              />
            )}

            <Input
              {...register("email")}
              icon={<Mail />}
              label="Email"
              type="email"
              placeholder="Email"
            />

            <Input
              {...register("password")}
              icon={<Key />}
              label="Password"
              type="password"
              placeholder="Password"
            />

            {errors && (
              <p className="text-red-500 text-sm">
                {errors?.fullname?.message ||
                  errors?.email?.message ||
                  errors?.password?.message ||
                  mutation.error?.response?.data?.message}
              </p>
            )}

            <div className="text-right text-sm underline font-light">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="btn btn-secondary w-full"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Loading
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>

          <div className="divider text-base-content/70">Or Continue with</div>
          <div className="my-3">
            <GoogleOAuthWrapper>
              <GoogleAuthBtn />
            </GoogleOAuthWrapper>
          </div>

          <div className="text-center text-sm">
            {isSignupPage ? (
              <p>
                Already have an account?{" "}
                <Link to="/login" className="underline font-light">
                  Login
                </Link>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="underline font-light">
                  Signup
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-base-300 w-[50%] min-h-screen hidden lg:flex items-center justify-center">
        <p className="text-xl font-light">Welcome to our platform!</p>
      </div>
    </div>
  );
};

export default LoginAndSignup;
