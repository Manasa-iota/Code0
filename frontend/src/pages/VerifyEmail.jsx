import { Mail } from "lucide-react";
import React from "react";

const VerifyEmail = () => {
  return (
    <section className="bg-base-100 min-h-screen flex items-center justify-center px-6 py-12">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-5 w-14 h-14 flex items-center justify-center rounded-full bg-primary-content border-2 border-base-200 text-primary">
          <Mail />
        </div>
        <h1 className="text-2xl font-semibold md:text-3xl">Verify your Email</h1>
        <p className="mt-4 text-base-content/70">
          We have sent a verification link to your email address. Please check your inbox and follow the instructions to verify your account.
        </p>
      </div>
    </section>
  );
};

export default VerifyEmail;
