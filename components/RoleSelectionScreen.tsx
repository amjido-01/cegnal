"use client"

import { Button } from "@/components/ui/button"

export function RoleSelectionScreen({ onComplete }: { onComplete: (role: string) => void }) {
  const handleSelectRole = (role: string) => {
    onComplete(role) // pass the selected role to parent
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1a] text-white px-4">
      <h2 className="text-2xl font-bold mb-6">Choose Your Role</h2>
      <div className="space-y-4 w-full max-w-xs">
        <Button className="w-full" onClick={() => handleSelectRole("personal")}>
          Personal
        </Button>
        <Button className="w-full" onClick={() => handleSelectRole("business")}>
          Business
        </Button>
      </div>
    </div>
  )
}
