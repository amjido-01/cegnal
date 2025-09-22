"use client";
import { useRouter, usePathname } from "next/navigation";
import type React from "react";
import {
  ChartNoAxesCombined,
  Settings,
  LayoutGrid,
  Menu,
  Bell,
  Search,
} from "lucide-react";
import Link from "next/link";
// import { useAuthStore } from "@/store/use-auth-store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  // const { logout } = useAuthStore();
 
  const hideHeader = pathname.includes("/settings");
  const isSignalZone = pathname.includes("/signal-zone");
  
  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: LayoutGrid,
      href: "/dashboard/home",
      isActive: pathname === "/dashboard/home",
    },
    {
      id: "signal-zone",
      label: "Signal zone",
      icon: ChartNoAxesCombined,
      href: "/dashboard/signal-zone",
      isActive: pathname.includes("/signal-zone"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      isActive: pathname.includes("/settings"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeader && (
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
          <div className="flex items-center justify-between px-4 py-3 max-w-sm mx-auto">
            {isSignalZone ? (
              // Search bar for signal-zone
              <div className="flex-1 flex items-center space-x-3">
                <div className="flex-1 relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full placeholder:text-[#151515] pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[16px] font-medium leading-[100%] tracking-[-2.8%] focus:outline-none focus:ring-2 focus:ring-[#2E5DFC] focus:border-transparent"
                  />
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Menu size={24} className="text-gray-700" />
                </button>
              </div>
            ) : (
              // Default header for other routes
              <>
                <Link
                  href="/dashboard/notifications"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  <Bell size={24} />
                </Link>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Menu size={24} className="text-gray-700" />
                </button>
              </>
            )}
          </div>
        </header>
      )}
     
      <div className={`flex-grow pb-24 ${hideHeader ? 'pt-0' : 'pt-16'}`}>
        {children}
      </div>
     
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <nav className="flex justify-around items-center py-2 px-4 max-w-sm mx-auto">
          {navItems.map(({ id, label, icon: Icon, href, isActive }) => (
            <button
              key={id}
              onClick={() => router.push(href)}
              className={`flex flex-col items-center py-2 px-2 ${
                isActive ? "text-[#151515]" : "text-gray-500"
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1 font-medium">{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}