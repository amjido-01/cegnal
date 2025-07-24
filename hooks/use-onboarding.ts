"use client"

import { useState, useCallback } from "react"

export type OnboardingStep = "splash" | "onboarding" | "role-selection" | "complete"

export function useOnboarding() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("splash")
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => prev + 1)
  }, [])

  const previousSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(0, prev - 1))
  }, [])

  const goToStep = useCallback((step: OnboardingStep) => {
    setCurrentStep(step)
  }, [])

  const skipOnboarding = useCallback(() => {
    setCurrentStep("role-selection")
  }, [])

  const completeOnboarding = useCallback(() => {
    setCurrentStep("complete")
  }, [])

  return {
    currentStep,
    currentSlide,
    nextSlide,
    previousSlide,
    goToStep,
    skipOnboarding,
    completeOnboarding,
  }
}
