"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface OnboardingNavigationProps {
  currentSlide: number
  totalSlides: number
  onNext: () => void
  onPrevious: () => void
  onSkip: () => void
}

export function OnboardingNavigation({
  currentSlide,
  totalSlides,
  onNext,
  onPrevious,
  onSkip,
}: OnboardingNavigationProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <Button
        variant="ghost"
        size="sm"
        onClick={onPrevious}
        disabled={currentSlide === 0}
        className="text-gray-400 hover:text-white"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back
      </Button>

      <div className="flex gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? "bg-blue-500" : "bg-gray-600"
            }`}
          />
        ))}
      </div>

      <Button variant="ghost" size="sm" onClick={onSkip} className="text-gray-400 hover:text-white">
        Skip
      </Button>
    </div>
  )
}
