import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginApi } from "../../api/auth.api";
import { useAuth } from "../../auth/AuthContext";

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await loginApi({ email, password });

      // QUAN TRỌNG
      login(res.data.accessToken, res.data.refreshToken);

      navigate(from, { replace: true });
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-neutral-900 p-8 rounded-xl w-96">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <input
          className="w-full mb-3 p-2 rounded bg-neutral-800"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-2 rounded bg-neutral-800"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-pink-500 p-2 rounded font-bold"
        >
          Login
        </button>
      </div>
    </div>
  );
}
