// src/components/PartnershipOpportunities.jsx

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select"
import {
  Building2,
  MapPin,
  Users,
  TrendingUp,
  MessageSquare,
  Heart,
  Filter
} from "lucide-react"

const mockOpportunities = [
  {
    id: "1",
    companyName: "GreenTech Solutions",
    industry: "Clean Energy",
    location: "San Francisco, CA",
    stage: "Series A",
    description:
      "Developing AI-powered energy management solutions for commercial buildings. Looking for strategic partners to accelerate market penetration.",
    lookingFor: ["Distribution Partners", "Technical Expertise", "Market Access"],
    offering: ["Technology Integration", "Revenue Share", "Joint Marketing"],
    matchScore: 92,
    fundingRaised: "$5M",
    teamSize: 25,
    revenue: "$2M ARR",
    partnershipType: "strategic"
  },
  {
    id: "2",
    companyName: "DataFlow Analytics",
    industry: "SaaS",
    location: "Austin, TX",
    stage: "Seed",
    description:
      "B2B analytics platform helping businesses make data-driven decisions. Seeking partners with complementary technology stacks.",
    lookingFor: ["API Integration", "Customer Base Access", "Technical Development"],
    offering: ["Data Analytics", "Custom Reporting", "Integration Support"],
    matchScore: 87,
    fundingRaised: "$2M",
    teamSize: 12,
    revenue: "$500K ARR",
    partnershipType: "technical"
  },
  {
    id: "3",
    companyName: "HealthCore Medical",
    industry: "HealthTech",
    location: "Boston, MA",
    stage: "Series B",
    description:
      "Digital health platform connecting patients with healthcare providers. Looking for distribution and technology partnerships.",
    lookingFor: ["Healthcare Networks", "Compliance Expertise", "Mobile Development"],
    offering: ["Patient Data", "Healthcare Insights", "Referral Program"],
    matchScore: 78,
    fundingRaised: "$15M",
    teamSize: 45,
    revenue: "$8M ARR",
    partnershipType: "distribution"
  },
  {
    id: "4",
    companyName: "LogiChain Pro",
    industry: "Logistics",
    location: "Chicago, IL",
    stage: "Growth",
    description:
      "Supply chain optimization software for e-commerce businesses. Seeking strategic partnerships to expand service offerings.",
    lookingFor: ["E-commerce Platforms", "Fulfillment Centers", "Payment Processors"],
    offering: ["Supply Chain Data", "Logistics Network", "Cost Optimization"],
    matchScore: 85,
    fundingRaised: "$25M",
    teamSize: 60,
    revenue: "$12M ARR",
    partnershipType: "supplier"
  }
]

export default function PartnershipOpportunities() {
  const [searchQuery, setSearchQuery] = useState("")
  const [industryFilter, setIndustryFilter] = useState()
  const [stageFilter, setStageFilter] = useState()
  const [partnershipTypeFilter, setPartnershipTypeFilter] = useState()

  const filteredOpportunities = mockOpportunities.filter((opportunity) => {
    const matchesSearch =
      opportunity.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesIndustry = !industryFilter || opportunity.industry === industryFilter
    const matchesStage = !stageFilter || opportunity.stage === stageFilter
    const matchesType = !partnershipTypeFilter || opportunity.partnershipType === partnershipTypeFilter

    return matchesSearch && matchesIndustry && matchesStage && matchesType
  })

  const getMatchScoreColor = (score) => {
    if (score >= 90) return "text-green-600 bg-green-100"
    if (score >= 80) return "text-blue-600 bg-blue-100"
    if (score >= 70) return "text-yellow-600 bg-yellow-100"
    return "text-gray-600 bg-gray-100"
  }

  const getPartnershipTypeBadge = (type) => {
    const variants = {
      strategic: "default",
      technical: "secondary",
      distribution: "outline",
      supplier: "destructive"
    }
    return variants[type] || "outline"
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Partnership Opportunities</h1>
        <p className="text-muted-foreground">
          Discover strategic partnerships to accelerate your business growth
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <Input
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Industry */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Industry</label>
              <Select
                value={industryFilter}
                onValueChange={(value) => setIndustryFilter(value === "all" ? undefined : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="Clean Energy">Clean Energy</SelectItem>
                  <SelectItem value="SaaS">SaaS</SelectItem>
                  <SelectItem value="HealthTech">HealthTech</SelectItem>
                  <SelectItem value="Logistics">Logistics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Stage */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Stage</label>
              <Select
                value={stageFilter}
                onValueChange={(value) => setStageFilter(value === "all" ? undefined : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Stages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="Seed">Seed</SelectItem>
                  <SelectItem value="Series A">Series A</SelectItem>
                  <SelectItem value="Series B">Series B</SelectItem>
                  <SelectItem value="Growth">Growth</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Partnership Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Partnership Type</label>
              <Select
                value={partnershipTypeFilter}
                onValueChange={(value) =>
                  setPartnershipTypeFilter(value === "all" ? undefined : value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="strategic">Strategic</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="distribution">Distribution</SelectItem>
                  <SelectItem value="supplier">Supplier</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Opportunities Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredOpportunities.map((opportunity) => (
          <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      <Building2 className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{opportunity.companyName}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{opportunity.industry}</Badge>
                      <Badge variant={getPartnershipTypeBadge(opportunity.partnershipType)}>
                        {opportunity.partnershipType}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(
                    opportunity.matchScore
                  )}`}
                >
                  {opportunity.matchScore}% Match
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Company Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{opportunity.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <span>{opportunity.stage}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{opportunity.teamSize} employees</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 font-medium">{opportunity.revenue}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground">{opportunity.description}</p>

              {/* Looking For & Offering */}
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-2">Looking For:</p>
                  <div className="flex flex-wrap gap-1">
                    {opportunity.lookingFor.map((item, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Offering:</p>
                  <div className="flex flex-wrap gap-1">
                    {opportunity.offering.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button className="flex-1" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Connect
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredOpportunities.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">No partnerships found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search criteria
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setIndustryFilter(undefined)
                setStageFilter(undefined)
                setPartnershipTypeFilter(undefined)
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Partnership Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Partnership Success Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-semibold">Be Specific</h4>
              <p className="text-sm text-muted-foreground">
                Clearly define what you're looking for and what you can offer in return
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Start Small</h4>
              <p className="text-sm text-muted-foreground">
                Begin with pilot programs or limited partnerships to test compatibility
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Align Values</h4>
              <p className="text-sm text-muted-foreground">
                Partner with companies that share similar values and culture
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
