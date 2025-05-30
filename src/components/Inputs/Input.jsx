import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function Input({ value, onChnage, label, placeholder, type }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="text-[13px] text-slate-800">
        <label htmlFor="">{label}</label>

        <div className="input-box">
          <input
            type={
              type == "password" ? (showPassword ? "text" : "password") : type
            }
            placeholder={placeholder}
            className="w-full bg-transparent outline-none"
            value={value}
            onChange={(e) => onChnage(e)}
          />

          {type === "password" && (
            <>
              {showPassword ? (
                <FaRegEye
                  size={22}
                  className="text-primary cursor-pointer"
                  onClick={() => toggleShowPassword()}
                />
              ) : (
                <FaRegEyeSlash
                  size={22}
                  className="text-slate-400 cursor-pointer"
                  onClick={() => toggleShowPassword()}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Input;
