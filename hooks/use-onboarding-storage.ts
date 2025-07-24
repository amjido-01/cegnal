"use client"

import { useState, useEffect } from "react"

export function useOnboardingStorage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const getOnboardingStatus = () => {
    if (!isClient) return { completed: false, role: null }

    try {
      const completed = localStorage.getItem("onboarding_completed") === "true"
      const role = localStorage.getItem("user_role")
      return { completed, role }
    } catch {
      return { completed: false, role: null }
    }
  }

  const setOnboardingCompleted = (role: string) => {
    if (!isClient) return

    try {
      localStorage.setItem("onboarding_completed", "true")
      localStorage.setItem("user_role", role)
    } catch (error) {
      console.error("Failed to save onboarding status:", error)
    }
  }

  const resetOnboarding = () => {
    if (!isClient) return

    try {
      localStorage.removeItem("onboarding_completed")
      localStorage.removeItem("user_role")
    } catch (error) {
      console.error("Failed to reset onboarding:", error)
    }
  }

  return {
    getOnboardingStatus,
    setOnboardingCompleted,
    resetOnboarding,
    isClient,
  }
}
