import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import api from "../../api/axios"; // ✅ centralized axios instance

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      
      await api.get("/sanctum/csrf-cookie");
      // ✅ login (interceptor will auto-call csrf-cookie if needed)
      await api.post("/login", form);

      // ✅ fetch authenticated user
      const { data: user } = await api.get("/api/user");

      // ✅ store in localStorage (or you can use context later)
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (err) {
      const axiosError = err as AxiosError<{
        message?: string;
        errors?: Record<string, string[]>;
      }>;

      if (axiosError.response?.data?.errors) {
        // show first validation error
        const firstError = Object.values(axiosError.response.data.errors)[0][0];
        setError(firstError);
      } else {
        setError(
          axiosError.response?.data?.message ||
            "Login failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-200 via-pink-100 to-yellow-100">
      <div className="bg-white/60 backdrop-blur-md shadow-lg rounded-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-8">LOGIN</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-red-600 text-center font-medium">{error}</p>
          )}

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-pink-600" />
              Remember Me
            </label>
            <Link to="#" className="text-pink-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Google
        </button>

        <p className="text-center mt-6 text-gray-700">
          Need an account?{" "}
          <Link to="/signup" className="font-bold hover:underline">
            Sign Up
          </Link>
        </p>

        <p className="text-center mt-4">
          <Link to="/" className="text-sm text-gray-600 hover:underline">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
