import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://memoryvault-enhanced.onrender.com/api/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            alert("Login successful!");
            navigate("/");
        } catch (err) {
            console.error("Error logging in:", err);
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 flex items-center justify-center p-4 text-white">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-10">
                <h1 className="text-4xl font-extrabold text-center mb-8">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 text-white"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 text-white"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-800 transition"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Don't have an account? <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
