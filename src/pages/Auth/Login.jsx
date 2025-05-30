import { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/Inputs/Input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {};

  return (
    <>
      <AuthLayout>
        <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
          <p className="text-xs text-slate-700 mt-[5px] mb-6">
            Please enter your details to login
          </p>

          <form onSubmit={handleLogin}>
            <Input
              id="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />
            <Input
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="min 8 characters"
              type="password"
            />

            {error && <p className="">{error}</p>}

            <button type="submit" className="">
              LOGIN
            </button>

            <p className="">
              Dont't have an account?{" "}
              <Link className="" to="/signup">
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    </>
  );
}
