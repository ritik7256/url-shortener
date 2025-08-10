
import { useSelector } from "react-redux";

export default function UrlList() {

  const {urls} =useSelector(state=>state.url)
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl shadow-lg border border-blue-100">
      <h2 className="text-xl font-bold mb-4 text-blue-800">📜 All Shortened URLs</h2>
      {urls.length === 0 ? (
        <p className="text-gray-500 italic">No URLs yet. Add one above!</p>
      ) : (
        <ul className="space-y-3">
          {urls.map(url => (
            <li
              key={url._id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
            >
              <div>
                <span className="text-black font-bold text-sm">Original Url:{" "}</span>
                <a
                  href={url.originalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium break-all"
                >
                  {url.originalUrl}
                </a>
                <div className="text-gray-600 text-sm mt-1">
                  <span className="text-md font-bold">Short Url:{" "}</span>
                  <a
                    
                    href={`http://localhost:5000/${url.shortCode}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-600 hover:text-green-800 font-semibold "
                  >
                    {url.shortCode}
                  </a>
                </div>
              </div>
              <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-md font-semibold">
                {url.clicks} clicks
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
