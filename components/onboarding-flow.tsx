"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { BarChart3 } from "lucide-react"

const onboardingSlides = [
  {
    id: 1,
    title: "Welcome to Cegnal",
    description:
      "Lorem ipsum dolor sit amet consectetur. Nec volutpat tellus lorem mauris odio. Odio elit tellus lorem volutpat elit fermentum ut elementum molestie.",
    illustration: <CoinsIllustration />,
  },
  {
    id: 2,
    title: "Instant Signals from Top Traders",
    description:
      "Lorem ipsum dolor sit amet consectetur. Nec volutpat tellus lorem mauris odio. Odio elit tellus lorem volutpat elit fermentum ut elementum molestie.",
    illustration: <TradingIllustration />,
  },
]

interface OnboardingFlowProps {
  onComplete: (role: string) => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<"splash" | "onboarding" | "role-selection">("splash")
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    // Auto-advance from splash screen after 2 seconds
    if (currentStep === "splash") {
      const timer = setTimeout(() => {
        setCurrentStep("onboarding")
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [currentStep])

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      setCurrentStep("role-selection")
    }
  }

  const handleRoleSelection = (role: string) => {
    onComplete(role)
  }

  if (currentStep === "splash") {
    return <SplashScreen />
  }

  if (currentStep === "role-selection") {
    return <RoleSelectionScreen onRoleSelect={handleRoleSelection} />
  }

  return (
    <div className=" flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm">
          {/* Illustration */}
          <div className="flex justify-center mb-8">
            <div className="w-64 h-64 flex items-center justify-center">
              {onboardingSlides[currentSlide].illustration}
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-4">{onboardingSlides[currentSlide].title}</h1>
            <p className="text-gray-400 text-sm leading-relaxed">{onboardingSlides[currentSlide].description}</p>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mb-8">
            {onboardingSlides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? "bg-blue-500" : "bg-gray-600"
                }`}
              />
            ))}
          </div>

          {/* Action button */}
          <Button
            onClick={handleNext}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
          >
            {currentSlide === onboardingSlides.length - 1 ? "Continue" : "Get Started"}
          </Button>

          {/* Skip option */}
          <div className="text-center mt-4">
            <button
              onClick={() => setCurrentStep("role-selection")}
              className="text-gray-400 text-sm hover:text-white transition-colors"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SplashScreen() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-gray-900" />
          </div>
        </div>
        <h1 className="text-white text-3xl font-bold">Cegnal</h1>
      </div>
    </div>
  )
}

interface RoleSelectionScreenProps {
  onRoleSelect: (role: string) => void
}

function RoleSelectionScreen({ onRoleSelect }: RoleSelectionScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-900 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Join Cegnal</h1>
        </div>

        {/* Role selection buttons */}
        <div className="space-y-4">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-medium text-base"
            onClick={() => onRoleSelect("trader")}
          >
            As a Forex Trader
          </Button>

          <Button
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-4 rounded-lg font-medium text-base bg-transparent"
            onClick={() => onRoleSelect("analyst")}
          >
            As a Forex Analyst
          </Button>
        </div>

        {/* Additional options */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Already have an account?{" "}
            <button
              className="text-blue-600 hover:text-blue-700 font-medium"
              onClick={() => onRoleSelect("existing_user")}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

function CoinsIllustration() {
  return (
    <div className="relative">
      {/* Credit card */}
      <div className="w-32 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transform rotate-12 shadow-lg">
        <div className="p-3">
          <div className="w-6 h-4 bg-yellow-400 rounded-sm mb-2"></div>
          <div className="space-y-1">
            <div className="w-16 h-1 bg-white/50 rounded"></div>
            <div className="w-12 h-1 bg-white/50 rounded"></div>
          </div>
        </div>
      </div>

      {/* Coins */}
      <div className="absolute -bottom-4 -left-4">
        <div className="flex">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-12 h-12 bg-yellow-500 rounded-full border-2 border-yellow-400 flex items-center justify-center text-yellow-900 font-bold text-xs ${
                i > 0 ? "-ml-3" : ""
              }`}
              style={{ zIndex: 3 - i }}
            >
              $
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TradingIllustration() {
  return (
    <div className="relative">
      {/* Phone */}
      <div className="w-24 h-40 bg-gray-800 rounded-2xl border-2 border-gray-700 p-1">
        <div className="w-full h-full bg-blue-600 rounded-xl p-2 relative overflow-hidden">
          {/* Chart bars */}
          <div className="flex items-end justify-center space-x-1 h-16 mt-4">
            {[12, 8, 16, 10, 14, 6].map((height, i) => (
              <div key={i} className="w-2 bg-yellow-400 rounded-t" style={{ height: `${height}px` }} />
            ))}
          </div>

          {/* Trend line */}
          <div className="absolute top-6 left-2 right-2">
            <svg className="w-full h-8" viewBox="0 0 80 32">
              <path d="M0,20 Q20,10 40,15 T80,8" stroke="#fbbf24" strokeWidth="2" fill="none" />
            </svg>
          </div>
        </div>
      </div>

      {/* Floating coins */}
      <div className="absolute -top-2 -right-2">
        <div className="w-8 h-8 bg-yellow-500 rounded-full border border-yellow-400 flex items-center justify-center text-yellow-900 font-bold text-xs">
          $
        </div>
      </div>

      <div className="absolute -bottom-2 -left-2">
        <div className="w-6 h-6 bg-yellow-500 rounded-full border border-yellow-400 flex items-center justify-center text-yellow-900 font-bold text-xs">
          $
        </div>
      </div>

      <div className="absolute top-8 -right-4">
        <div className="w-6 h-6 bg-yellow-500 rounded-full border border-yellow-400 flex items-center justify-center text-yellow-900 font-bold text-xs">
          $
        </div>
      </div>
    </div>
  )
}
