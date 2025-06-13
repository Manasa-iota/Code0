import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Lock, Mail, Code, Loader2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { z } from "zod";
import toast from "react-hot-toast";

export const LoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const SignUpSchema = LoginSchema.extend({
  name: z.string().min(3, "Name must be at least 3 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const AuthForm = ({ mode }) => {
  const isLogin = mode === "login";
  const navigate = useNavigate();
  const { login, signup, isLoggingIn, isSigninUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(isLogin ? LoginSchema : SignUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        const success = await login(data);
        if (success) {
          toast.success("Logged in successfully");
          navigate("/");
        } else toast.error("Invalid email or password");
      } else {
        await signup(data);
        toast.success("Signed up successfully");
        reset();
        navigate("/login");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error("Auth error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {!isLogin && (
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Name</span>
          </label>
          <div className="relative">
            <div className="absolute left-0 inset-y-0 pl-3 flex items-center">
              <Code className="h-5 w-5 text-base-content/40" />
            </div>
            <input
              type="text"
              {...register("name")}
              placeholder="John Doe"
              className={`input input-bordered w-full pl-10 ${
                errors.name ? "input-error" : ""
              }`}
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
      )}

      {/* Email */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Email</span>
        </label>
        <div className="relative">
          <div className="absolute left-0 inset-y-0 pl-3 flex items-center">
            <Mail className="h-5 w-5 text-base-content/40" />
          </div>
          <input
            type="email"
            {...register("email")}
            placeholder="you@example.com"
            className={`input input-bordered w-full pl-10 ${
              errors.email ? "input-error" : ""
            }`}
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Password</span>
        </label>
        <div className="relative">
          <div className="absolute left-0 inset-y-0 pl-3 flex items-center">
            <Lock className="h-5 w-5 text-base-content/40" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="••••••••"
            className={`input input-bordered w-full pl-10 ${
              errors.password ? "input-error" : ""
            }`}
          />
          <button
            type="button"
            className="absolute right-0 inset-y-0 pr-3 flex items-center"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeClosed className="h-5 w-5 text-base-content/40" />
            ) : (
              <Eye className="h-5 w-5 text-base-content/40" />
            )}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      {/* Confirm Password (SignUp only) */}
      {!isLogin && (
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Confirm Password</span>
          </label>
          <div className="relative">
            <div className="absolute left-0 inset-y-0 pl-3 flex items-center">
              <Lock className="h-5 w-5 text-base-content/40" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword")}
              placeholder="••••••••"
              className={`input input-bordered w-full pl-10 ${
                errors.confirmPassword ? "input-error" : ""
              }`}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting || isLoggingIn || isSigninUp}
        className="btn btn-primary w-full"
      >
        {(isSubmitting || isLoggingIn || isSigninUp) ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading...
          </>
        ) : isLogin ? "Sign in" : "Sign up"}
      </button>
    </form>
  );
};

export default AuthForm;
