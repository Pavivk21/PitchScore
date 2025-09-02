import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

import PitchSubmissionForm from "./components/PitchSubmissionForm";
import AIFeedback from "./components/AIFeedback";
import VisualReports from "./components/VisualReports";
import AuthPage from "./components/AuthPage";
import EntrepreneurDashboard from "./pages/EntrepreneurDashboard";
import InvestorDashboard from "./pages/InvestorDashboard";

function App() {
  const [response, setResponse] = useState(null);

  // 🔹 Fake logged-in user (later connect to backend auth)
  const [user] = useState({
    name: "Alice",
    role: "entrepreneur", // change to "investor" for testing
  });

  const handlePitchSubmitted = (id, text) => {
    console.log("✅ Pitch submitted (App state):", id, text);
    setResponse({ id, content: text });
  };

  return (
    <Layout user={user}>
      <Routes>
        {/* Auth Page */}
        <Route path="/" element={<AuthPage />} />

        {/* Entrepreneur Dashboard */}
        <Route
          path="/entrepreneur"
          element={
            <PrivateRoute user={user} role="entrepreneur">
              <EntrepreneurDashboard />
            </PrivateRoute>
          }
        />

        {/* Investor Dashboard */}
        <Route
          path="/investor"
          element={
            <PrivateRoute user={user} role="investor">
              <InvestorDashboard />
            </PrivateRoute>
          }
        />

        {/* Pitch Submission (entrepreneur only) */}
        <Route
          path="/submit"
          element={
            <PrivateRoute user={user} role="entrepreneur">
              <div>
                <PitchSubmissionForm onPitchSubmitted={handlePitchSubmitted} />
                {response && (
                  <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
                    ✅ Pitch submitted successfully! (ID: {response.id})
                  </div>
                )}
              </div>
            </PrivateRoute>
          }
        />

        {/* AI Feedback (both roles) */}
        <Route
          path="/feedback"
          element={
            <PrivateRoute user={user}>
              <AIFeedback />
            </PrivateRoute>
          }
        />

        {/* Reports (both roles) */}
        <Route
          path="/reports"
          element={
            <PrivateRoute user={user}>
              <VisualReports />
            </PrivateRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;





