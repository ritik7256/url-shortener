import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUrls, deleteUrl as deleteUrlAction } from "../redux/slices/urlSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const urls = useSelector(state => state.url.urls);

  const fetchUrls = async () => {
    const res = await fetch("http://localhost:5000/api/urls");
    const data = await res.json();
    dispatch(setUrls(data));
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/urls/${id}`, { method: "DELETE" });
    dispatch(deleteUrlAction(id)); // instantly remove from redux store
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 rounded-lg shadow-lg border border-purple-700">
      <h2 className="text-2xl font-bold mb-6 text-purple-400">Admin Dashboard</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-purple-900 via-purple-800 to-gray-900 text-left text-purple-300">
            <th className="p-3 border-b border-purple-700">Original URL</th>
            <th className="p-3 border-b border-purple-700">Short Code</th>
            <th className="p-3 border-b border-purple-700">Clicks</th>
            <th className="p-3 border-b border-purple-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr
              key={url._id}
              className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
            >
              <td className="p-3 text-gray-300 break-all">{url.originalUrl}</td>
              <td className="p-3 text-purple-400">{url.shortCode}</td>
              <td className="p-3 text-gray-300">{url.clicks}</td>
              <td className="p-3">
                <button
                  onClick={() => handleDelete(url._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded shadow-md transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {urls.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center text-gray-500 p-4 italic">
                No URLs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
