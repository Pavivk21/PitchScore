import React, { useState } from "react";

interface PitchSubmissionFormProps {
  onPitchSubmitted?: (pitchId: number, pitchText: string) => void;
}

const PitchSubmissionForm: React.FC<PitchSubmissionFormProps> = ({
  onPitchSubmitted,
}) => {
  const [pitch, setPitch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/pitch/submit/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: pitch }), // ✅ fixed field name
      });

      if (!response.ok) {
        throw new Error("Failed to submit pitch");
      }

      const data = await response.json();
      console.log("Pitch submitted successfully:", data);

      if (onPitchSubmitted) {
        onPitchSubmitted(data.id, data.content); // ✅ backend returns `content`
      }

      setPitch("");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <textarea
        value={pitch}
        onChange={(e) => setPitch(e.target.value)}
        placeholder="Write your pitch here..."
        className="w-full p-4 rounded-md border border-gray-300 dark:border-gray-600 
                   bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                   resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={6}
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 
                   rounded-md transition-colors disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Pitch"}
      </button>
    </form>
  );
};

export default PitchSubmissionForm;

