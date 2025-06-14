import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("Logged out successfully.");
        navigate("/login");
    };

    return (
        <nav className="bg-white/10 backdrop-blur-lg rounded-full shadow-lg border border-white/20 px-6 py-3 fixed top-4 left-1/2 -translate-x-1/2 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-white">
                    MemoryVault
                </Link>
                <div className="space-x-4">
                    {!token ? (
                        <>
                            <Link to="/login" className="text-white hover:text-blue-300 transition">
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full transition"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full transition"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;