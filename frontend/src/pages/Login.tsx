import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, getMe } from "../api/auth";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await login(email, password);
      setToken(response.access_token);

      const user = await getMe();
      useAuthStore.getState().setUser(user);

      navigate("/chat");
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Login failed. Please check your credentials"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}