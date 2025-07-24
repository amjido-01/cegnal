"use client"

import { BarChart3 } from "lucide-react"

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center animate-pulse">
            <BarChart3 className="w-8 h-8 text-gray-900" />
          </div>
        </div>
        <h1 className="text-white text-3xl font-bold">Cegnal</h1>
        <div className="mt-4">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  )
}
