import  { useState } from "react";
import axios from "axios";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post("/api/generate-thumbnail", formData);
      setThumbnail(response.data.thumbnailUrl);
    } catch (err) {
      console.error("Error generating thumbnail:", err);
      setError(err.response?.data?.details || err.message || 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col justify-center items-center text-white">
      <header className="mb-8">
        <h1 className="text-5xl font-bold mb-2">Thumbnail Crafter</h1>
        <p className="text-xl">AI-Powered YouTube Thumbnail Generator</p>
      </header>

      <main className="text-center">
        <p className="mb-8 text-lg max-w-2xl">
          Create stunning YouTube thumbnails in seconds with the power of AI.
          Upload your video details, and let our advanced algorithms do the rest!
        </p>

        <form className="mb-8" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your video title"
            className="w-full max-w-md px-4 py-2 mb-4 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <textarea
            placeholder="Enter a brief description of your video"
            className="w-full max-w-md px-4 py-2 mb-4 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            rows="3"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-800 font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Thumbnail"}
          </button>
        </form>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Generated Thumbnail</h2>
          <div className="w-96 h-54 bg-gray-200 rounded-lg flex items-center justify-center">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt="Generated Thumbnail"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <p className="text-gray-500">Your thumbnail will appear here</p>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-16 text-sm opacity-75">
        <p>© 2024 Thumbnail Crafter. All rights reserved.</p>
      </footer>
    </div>
  );
}