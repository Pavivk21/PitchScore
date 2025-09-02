import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Button } from "./ui/button"
import { 
  TrendingUp, TrendingDown, AlertCircle, CheckCircle2, Lightbulb, Target, 
  Sparkles, Download, Share2 
} from "lucide-react"
import { motion } from "motion/react"

interface FeedbackScore {
  category: string
  score: number
  maxScore: number
  feedback: string
  suggestions: string[]
}

export interface AIFeedbackProps {
  companyName: string
  overallScore: number
  scores: FeedbackScore[]
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  marketFit: "excellent" | "good" | "fair" | "poor"
  investmentRisk: "low" | "medium" | "high"
}

export function AIFeedback({ feedback }: { feedback: AIFeedbackProps }) {
  if (!feedback) {
    return (
      <div className="p-6 text-center text-gray-500">
        No feedback available yet. Submit a pitch to see results.
      </div>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreGradient = (score: number) => {
    if (score >= 80) return "from-green-500 to-emerald-500"
    if (score >= 60) return "from-yellow-500 to-orange-500"
    return "from-red-500 to-pink-500"
  }

  const getMarketFitBadge = (fit: string) => {
    const variants = {
      excellent: "default",
      good: "secondary",
      fair: "outline",
      poor: "destructive"
    } as const
    return variants[fit as keyof typeof variants] || "outline"
  }

  const getRiskBadge = (risk: string) => {
    const variants = {
      low: "default",
      medium: "secondary",
      high: "destructive"
    } as const
    return variants[risk as keyof typeof variants] || "secondary"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">AI Analysis Complete</span>
            </div>
            <h1 className="text-4xl font-bold">Your Pitch Feedback</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Comprehensive AI analysis for {feedback.companyName}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 -mt-8 relative z-10 space-y-8">
        {/* Overall Score */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <Card className="border-white/20 bg-white/80 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-8 text-center space-y-6">
              <h2 className="text-2xl font-bold">Overall Pitch Score</h2>
              <div className="relative w-32 h-32 mx-auto">
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getScoreGradient(feedback.overallScore)}`} />
                <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className={`text-3xl font-bold ${getScoreColor(feedback.overallScore)}`}>
                    {feedback.overallScore}
                  </span>
                </div>
              </div>
              <div className="flex justify-center gap-6">
                <div className="text-center">
                  <Badge variant={getMarketFitBadge(feedback.marketFit)} className="mb-2">
                    Market Fit
                  </Badge>
                  <p className="text-sm capitalize font-medium">{feedback.marketFit}</p>
                </div>
                <div className="text-center">
                  <Badge variant={getRiskBadge(feedback.investmentRisk)} className="mb-2">
                    Risk Level
                  </Badge>
                  <p className="text-sm capitalize font-medium">{feedback.investmentRisk}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Scores */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {feedback.scores.map((score, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg">
                  <span>{score.category}</span>
                  <span className={`text-2xl font-bold ${getScoreColor(score.score)}`}>{score.score}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={score.score} className="h-3" />
                <p className="text-sm mt-2">{score.feedback}</p>
                <ul className="mt-2 space-y-1">
                  {score.suggestions.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Lightbulb className="w-3 h-3 text-yellow-500 mt-0.5" />
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
