"use client"

import { ArrowLeft, MessageCircle, Grid3X3, Users, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatUIProps {
  isDisabled: boolean
  onBackClick: () => void
}

export default function ChatUI({ isDisabled, onBackClick }: ChatUIProps) {
  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-sm">
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 bg-black rounded-full"></div>
          <div className="w-1 h-1 bg-black rounded-full"></div>
          <div className="w-1 h-1 bg-black rounded-full"></div>
          <span className="ml-1 font-medium">9:41</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-black rounded-sm"></div>
            <div className="w-1 h-3 bg-black rounded-sm"></div>
            <div className="w-1 h-2 bg-gray-300 rounded-sm"></div>
            <div className="w-1 h-1 bg-gray-300 rounded-sm"></div>
          </div>
          <div className="w-6 h-3 border border-black rounded-sm">
            <div className="w-4 h-2 bg-black rounded-sm m-0.5"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b">
        <Button variant="ghost" size="sm" onClick={onBackClick} className="p-1 mr-3">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">{isDisabled ? "Disabled" : "In Chat"}</h1>
      </div>

      {/* Chat Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <MessageCircle className={`w-8 h-8 ${isDisabled ? "text-gray-300" : "text-gray-400"}`} />
        </div>
        <h2 className={`text-xl font-semibold mb-4 ${isDisabled ? "text-gray-400" : ""}`}>Welcome Home</h2>
        <p
          className={`text-center text-sm leading-relaxed mb-8 ${
            isDisabled ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Lorem ipsum dolor sit amet consectetur. Nunc volutpat nunc lectus venenatis risus. Dolor ultrices tempor ut
          amet consectetur.
        </p>
        <Button
          disabled={isDisabled}
          className={`w-full py-3 rounded-lg ${
            isDisabled ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          ✏️ Say Anything
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-around items-center py-4 border-t bg-white">
        <div className="flex flex-col items-center">
          <Grid3X3 className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-600 mt-1">Dashboard</span>
        </div>
        <div className="flex flex-col items-center">
          <Users className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-600 mt-1">Signal Zone</span>
        </div>
        <div className="flex flex-col items-center">
          <Settings className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-600 mt-1">Settings</span>
        </div>
      </div>
    </div>
  )
}
