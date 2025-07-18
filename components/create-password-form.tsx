"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Check, Lock } from "lucide-react"

export function CreatePasswordForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const requirements = [
    { label: "Uppercase", met: /[A-Z]/.test(password) },
    { label: "Lowercase", met: /[a-z]/.test(password) },
    { label: "Special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    { label: "8 characters", met: password.length >= 8 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-medium text-[30px] leading-[100%] tracking-[-2.8%] text-[#151515] text-center">Create new password</h2>
        <p className="mt-2  text-[#5D5D5D] text-center">Create a strong password to secure your account</p>
      </div>

      <form className="space-y-4">
        <div>
          <div className="relative mt-1">
             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
                className="pl-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
            </button>
          </div>
        </div>

        <div>
          <div className="relative mt-[16px]">
             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
                className="pl-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Password must contain:</p>
          <div className="grid grid-cols-2 gap-2">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    req.met ? "bg-green-100" : "bg-gray-100"
                  }`}
                >
                  {req.met && <Check className="w-3 h-3 text-green-600" />}
                </div>
                <span className={`text-xs ${req.met ? "text-green-600" : "text-gray-500"}`}>{req.label}</span>
              </div>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={!requirements.every((req) => req.met) || password !== confirmPassword}
        >
          Save New Password
        </Button>
      </form>
    </div>
  )
}
