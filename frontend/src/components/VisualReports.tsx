import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

type SentimentData = {
  positive: number;
  neutral: number;
  negative: number;
};

type InvestmentTrends = {
  [month: string]: number;
};

type RiskAnalysis = {
  Low: number;
  Medium: number;
  High: number;
};

type ReportData = {
  sentiment: SentimentData;
  investment_trends: InvestmentTrends;
  risk_analysis: RiskAnalysis;
};

interface VisualReportsProps {
  pitchId: string | number;
}

const COLORS = ["#4CAF50", "#FF9800", "#F44336"]; // positive, neutral, negative

const VisualReports: React.FC<VisualReportsProps> = ({ pitchId }) => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(`/api/pitches/${pitchId}/reports/`);
        const data = await response.json();
        setReportData(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [pitchId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading reports...</p>;
  }

  if (!reportData) {
    return <p className="text-center text-red-500">No report data available.</p>;
  }

  // Transform backend data into chart-friendly formats
  const sentimentChartData = Object.entries(reportData.sentiment).map(
    ([name, value]) => ({ name, value })
  );

  const investmentChartData = Object.entries(reportData.investment_trends).map(
    ([month, value]) => ({ month, value })
  );

  const riskChartData = Object.entries(reportData.risk_analysis).map(
    ([level, value]) => ({ level, value })
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Sentiment Analysis */}
      <Card className="shadow-lg rounded-2xl">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold text-center mb-4">
            Sentiment Analysis
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sentimentChartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
                dataKey="value"
              >
                {sentimentChartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Investment Trends */}
      <Card className="shadow-lg rounded-2xl">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold text-center mb-4">
            Investment Trends
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={investmentChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={2}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Analysis */}
      <Card className="shadow-lg rounded-2xl">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold text-center mb-4">
            Risk Analysis
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={riskChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="level" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#E11D48" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisualReports;

