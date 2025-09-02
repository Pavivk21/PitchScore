import { Link } from "react-router-dom";

function Layout({ children, user }) {
  return (
    <div className="App min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 🔹 Navigation Bar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            🚀 Pitch Platform
          </h1>

          {/* 🔹 Role-aware menu */}
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              Home
            </Link>

            {user?.role === "entrepreneur" && (
              <Link to="/entrepreneur" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                Entrepreneur
              </Link>
            )}

            {user?.role === "investor" && (
              <Link to="/investor" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                Investor
              </Link>
            )}

            {/* Only entrepreneurs can see Submit Pitch */}
            {user?.role === "entrepreneur" && (
              <Link to="/submit" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
                Submit Pitch
              </Link>
            )}

            <Link to="/feedback" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              AI Feedback
            </Link>
            <Link to="/reports" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
              Reports
            </Link>
          </div>
        </div>
      </nav>

      {/* 🔹 Main Content */}
      <div className="max-w-4xl mx-auto p-6">{children}</div>
    </div>
  );
}

export default Layout;
