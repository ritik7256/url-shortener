import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-gray-900 via-purple-900 to-black shadow-lg fixed w-full top-0 left-0 z-50 border-b border-purple-700">
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-wide text-purple-400 drop-shadow-lg">
              🔗 Shortify
            </h1>
            <div className="space-x-6">
              <Link
                to="/"
                className="hover:text-purple-300 transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/admin"
                className="hover:text-purple-300 transition-colors duration-200"
              >
                Admin
              </Link>
            </div>
          </div>
        </nav>

        {/* Page content */}
        <main className="pt-20 p-6 max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
