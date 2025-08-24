"use client";
import { useRouter, usePathname } from "next/navigation";
import type React from "react";

import {
  ChartNoAxesCombined,
  Settings,
  LayoutGrid,
  Menu,
  Bell,
} from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

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
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between px-4 py-3 max-w-sm mx-auto">
          <Link
            href="/dashboard/notifications"
            className="text-gray-600 hover:text-indigo-600"
          >
            <Bell size={24} />
          </Link>

          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu size={24} className="text-gray-700" />
          </button>
        </div>
      </header>

      <div className="flex-grow pt-16 pb-24">{children}</div>

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
