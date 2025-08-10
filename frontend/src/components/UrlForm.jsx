import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUrls,addUrl } from "../redux/slices/urlSlice";
export default function UrlForm({ onUrlCreated }) {

  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const dispatch=useDispatch()
  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl })
    });
    const data = await res.json();
    dispatch(addUrl(data))

    setShortUrl(data.shortUrl);
    setOriginalUrl("");
    onUrlCreated();
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-2xl shadow-lg border border-blue-200">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4"
      >
        <input
          type="url"
          value={originalUrl}
          onChange={e => setOriginalUrl(e.target.value)}
          placeholder="🔗 Enter long URL here..."
          required
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-md transition-colors duration-200"
        >
          ✂️ Shorten
        </button>
      </form>

      {shortUrl && (
        <p className="mt-5 bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
          ✅ Short URL:{" "}
          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
            className="text-green-600 font-semibold hover:text-green-800 underline"
          >
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}
