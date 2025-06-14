import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [emotion, setEmotion] = useState("");
    const [date, setDate] = useState("");
    const [image, setImage] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [memories, setMemories] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            fetchMemories();
        }
    }, [token, navigate]);

    const fetchMemories = async () => {
        try {
            const res = await axios.get("http://localhost:5001/api/memories", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMemories(res.data);
        } catch (err) {
            console.error("Error fetching memories:", err);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setImage(files[0]);
        } else {
            switch (name) {
                case "title":
                    setTitle(value);
                    break;
                case "description":
                    setDescription(value);
                    break;
                case "emotion":
                    setEmotion(value);
                    break;
                case "date":
                    setDate(value);
                    break;
                default:
                    break;
            }
        }
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            alert("You must be logged in to submit a memory.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("emotion", emotion);
        formData.append("image", image);

        try {
            const res = await axios.post("http://localhost:5001/api/memories", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Memory created:", res.data);
            setMessage("Memory created successfully!");
            // Clear form
            setTitle("");
            setDescription("");
            setEmotion("");
            setDate("");
            setImage(null);
            fetchMemories(); // Refresh memories after creating a new one
        } catch (err) {
            console.error("Error creating memory:", err);
            if (err.response && err.response.data && err.response.data.error) {
                setMessage(`Error: ${err.response.data.error}`);
            } else {
                setMessage("Failed to create memory. Please try again.");
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 flex items-center justify-center p-4 text-white pt-24">
                <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-10">
                    <h1 className="text-4xl font-extrabold text-center mb-8">💾 MemoryVault</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            name="title"
                            onChange={handleChange}
                            value={title}
                            placeholder="Title"
                            className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 text-white"
                            required
                        />
                        <textarea
                            name="description"
                            onChange={handleChange}
                            value={description}
                            placeholder="Description"
                            className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 text-white"
                            required
                        />
                        <input
                            name="emotion"
                            onChange={handleChange}
                            value={emotion}
                            placeholder="Emotion"
                            className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 text-white"
                        />
                        <input
                            type="date"
                            name="date"
                            onChange={handleChange}
                            value={date}
                            className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 text-white"
                        />
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="text-white"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-800 transition"
                        >
                            Save Memory
                        </button>
                    </form>
                    {message && <p className="mt-4 text-center">{message}</p>}
                </div>

                <div className="w-full max-w-3xl mx-auto mt-12">
                    <h2 className="text-3xl font-bold text-center mb-8">My Memories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {memories.map((memory) => (
                            <div key={memory._id} className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/20">
                                {memory.image && <img src={`http://localhost:5001/${memory.image}`} alt={memory.title} className="w-full h-48 object-cover rounded-lg mb-4" />}
                                <h3 className="text-xl font-bold mb-2">{memory.title}</h3>
                                <p className="text-gray-300 mb-2">{memory.description}</p>
                                <p className="text-sm text-gray-400 mb-2">Emotion: {memory.emotion}</p>
                                <p className="text-xs text-gray-500">Date: {new Date(memory.date).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
