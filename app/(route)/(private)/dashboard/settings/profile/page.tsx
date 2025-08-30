"use client"

import { ArrowLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export default function ProfileSettingsPage() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }


  return (
    <div className="min-h-screen bg-gray-50 px-2">
      {/* Header */}
      <div className="bg-white py-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Profile Settings</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Section */}
        <div>
          <h2 className="text-[18px] font-bold tracking-[-2.8%] leading-[100%] text-[#151515] mb-3">
            Profile
          </h2>
          <Card className="border-none shadow-none">
            <CardContent className="p-0 space-y-4">
              {/* Phone Number */}
              <div className="border-b border-gray-100 pb-4 text-[16px] font-medium tracking-[-2.8%] leading-[100%]">
                <p className="text-[#151515] mb-1">Phone Number</p>
                <p className="font-medium text-[#5D5D5D]">0816-722-3971</p>
              </div>

              {/* Display Name */}
              <div className="border-b border-gray-100 pb-4 text-[16px] font-medium tracking-[-2.8%] leading-[100%]">
                <p className="text-[#151515] mb-1">Display name</p>
                <p className="font-medium text-[#5D5D5D]">Kira Forex</p>
              </div>

              {/* Email Address */}
              <div className="border-b border-gray-100 pb-4 text-[16px] font-medium tracking-[-2.8%] leading-[100%]">
                <p className="text-[#151515] mb-1">Email Address</p>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-[#5D5D5D]">iamvickid@gmail.com</p>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                    ✓ Verified
                  </Badge>
                </div>
              </div>

              {/* Update Password */}
              <div className="border-b border-gray-100 pb-4">
                <button onClick={() => router.push('/update-password')} className="w-full flex items-center justify-between py-2">
                  <div className="text-left">
                    <p className="text-[16px] font-medium tracking-[-2.8%] leading-[100%] text-[#151515]">Update Password</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-black" />
                </button>
              </div>

              {/* Address */}
              <div className="text-[16px] font-medium tracking-[-2.8%] leading-[100%]">
                <p className="text-[#151515] mb-1">Address</p>
                <p className="font-medium text-[#5D5D5D]">No 13 Yoruba Kano, Fagge</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
