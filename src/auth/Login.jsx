import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <form
        onSubmit={handleSubmit}
        className="bg-dark-100 p-10 rounded-2xl shadow-xl max-w-md w-full space-y-5"
      >
        <h1 className="text-3xl text-white font-bold text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-light-100/10 text-white outline-none"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-light-100/10 text-white outline-none"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-light-100 text-black py-3 rounded font-bold">
          Login
        </button>

        <p className="text-gray-100 text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-light-100 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
