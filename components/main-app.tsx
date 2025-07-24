"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Settings, User } from "lucide-react"

interface MainAppProps {
  userRole: string | null
  onResetOnboarding: () => void
}

export function MainApp({ userRole, onResetOnboarding }: MainAppProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center mr-3">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Cegnal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 capitalize">
                {userRole === "trader" ? "Forex Trader" : userRole === "analyst" ? "Forex Analyst" : "User"}
              </span>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Welcome Card */}
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>
                Welcome to Cegnal!
                {userRole === "trader" && " 📈"}
                {userRole === "analyst" && " 📊"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {userRole === "trader"
                  ? "Start receiving instant signals from top traders and grow your portfolio."
                  : userRole === "analyst"
                    ? "Share your expertise and help traders make better decisions."
                    : "Welcome to your trading dashboard."}
              </p>
              <div className="flex gap-2">
                <Button>Get Started</Button>
                <Button variant="outline" onClick={onResetOnboarding}>
                  Reset Onboarding
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Cards */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Trading Signals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">View and manage your trading signals.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Manage your account settings and preferences.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Configure your app settings and notifications.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
