"use client";

import { useState } from "react";
import {
  ArrowLeft,
  User,
  BarChart3,
  Bell,
  Users,
  Shield,
  FileText,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [followSystemPreferences, setFollowSystemPreferences] = useState(true);

  const handleBack = () => {
    router.back();
  };

  const navigateToProfile = () => {
    router.push("/dashboard/settings/profile");
  };

  return (
    <div className="min-h-screen bg-white px-2">
      {/* Header */}
      <div className="bg-white px4 py-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Settings</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Section */}
        <div className="mb-[40px]">
          <h2 className="text-[18px] font-bold tracking-[-2.8%] leading-[100%] text-[#151515] mb-3">
            Profile
          </h2>
          <Card className="p-0 border-none shadow-none">
            <CardContent className="p-0">
              <button
                onClick={navigateToProfile}
                className="w-full flex items-center border-b-2 justify-between py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-[#151515]">
                    Profile Settings
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-[#151515]" />
              </button>

              <button className="w-full flex items-center border-b-2 justify-between py-4 hover:bg-gray-50 transition-colors border-gray-100">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-[#151515]">
                    Signal Zone Settings
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-[#151515]" />
              </button>

              <button className="w-full flex items-center border-b-2 justify-between py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-[#151515]">
                    App Preferences
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-[#151515]" />
              </button>
            </CardContent>
          </Card>
        </div>

        {/* About Us Section */}
        <div className="mb-[40px]">
          <h2 className="text-[18px] font-bold tracking-[-2.8%] leading-[100%] text-[#151515] mb-3">
            About Us
          </h2>
          <Card className="p-0 border-none shadow-none">
            <CardContent className="p-0">
              <button
                onClick={navigateToProfile}
                className="w-full flex items-center border-b-2 justify-between py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Invite a Friend</span>
                </div>
                <ChevronRight className="h-5 w-5 text-[#151515]" />
              </button>

              <button className="w-full flex items-center border-b-2 justify-between py-4 hover:bg-gray-50 transition-colors border-gray-100">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Privacy Policy</span>
                </div>
                <ChevronRight className="h-5 w-5 text-[#151515]" />
              </button>

              <button className="w-full flex items-center border-b-2 justify-between py-4 hover:bg-gray-50 transition-colors">
                 <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">
                    Legal Agreements & Disclosures
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-[#151515]" />
              </button>
            </CardContent>
          </Card>
        </div>


        {/* Dark Mode Section */}
        <div>
          <h2 className="text-[18px] font-bold tracking-[-2.8%] leading-[100%] text-[#151515] mb-3">
            Dark Mode
          </h2>
          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Follow System Preferences</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Dark mode will change with your system settings
                  </p>
                </div>
                <Switch
                  checked={followSystemPreferences}
                  onCheckedChange={setFollowSystemPreferences}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
