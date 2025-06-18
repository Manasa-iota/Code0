import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

const Input = ({ icon, type, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <label className="input w-full items-center">
        {icon}
        <input
          className="w-full bg-transparent outline-none"
          type={type === "password" && showPassword ? "text" : type}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        )}
      </label>
    </div>
  );
};

export default Input;
