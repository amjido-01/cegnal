/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { Star, CheckCircle2 } from "lucide-react"
import { useZones } from "@/hooks/use-zone"
import { TopTradersSkeleton } from "./top-traders-skeleton"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"
import { Button } from "./ui/button"

export function Zones() {
  const { zones, zonesError, isFetchingZones } = useZones()
  const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedZone, setSelectedZone] = useState<any>(null)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-3 h-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const handleZoneClick = (zone: any) => {
    if (!zone.isPaid) {
      router.push(`/payment/${zone.id}`)
    } else {
      setSelectedZone(zone)
      setIsModalOpen(true)
    }
  }

  const handleProceedToZone = (zone: any) => {
    router.push(`/zone/${zone.id}`)
  }

  if (isFetchingZones) return <TopTradersSkeleton />
  if (zonesError) return <div>Error loading products</div>
  if (!zones || zones.length === 0) return <div>No products found</div>

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Signal Zones</h3>
      </div>

      <div className="space-y-4">
        {zones.map((zone, idx) => (
          <Card key={idx} className="bg-white py-1 shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={zone.avatarUrl || "/placeholder.svg"} />
                    <AvatarFallback>{zone.zoneName[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-900">{zone.zoneName}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">1000 Reviews</p>
                  <div className="flex gap-0.5 mt-1">{renderStars(5)}</div>
                </div>
              </div>

              <div className="bg-[#E7E7E7] rounded-[8px] p-2">
                <div className="grid grid-cols-3 gap-4 mb-4 p-3 divide-x divide-[#D1D1D1]">
                  <div className="text-center">
                    {zone.isPaid ? (
                      <p className="font-medium text-gray-900 text-sm">${zone.price}</p>
                    ) : (
                      <p className="font-medium text-gray-900 text-sm"></p>
                    )}
                    <p className="text-xs text-gray-600">Entry Fee</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900 text-sm">{zone.noOfMembers}</p>
                    <p className="text-xs text-gray-600">Subscribers</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900 text-sm">{70}</p>
                    <p className="text-xs text-gray-600">Win Rates</p>
                  </div>
                </div>

                <button
                  onClick={() => handleZoneClick(zone)}
                  className="w-full bg-[#454545] hover:bg-gray-900 text-white px-4 py-2 rounded-md text-center block"
                >
                  View Details
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <AlertDialogTitle className="text-center text-xl">
              Are you sure you want to join <span className="text-blue-600">{selectedZone?.zoneName}</span> for free?
            </AlertDialogTitle>
            <AlertDialogDescription className="sr-only">
              Confirm joining {selectedZone?.zoneName} zone for free
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-3 sm:flex-col">
            <Button
              onClick={() => {
                if (selectedZone) {
                  handleProceedToZone(selectedZone)
                  setIsModalOpen(false)
                }
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              Proceed to Zone
            </Button>
            <Button onClick={() => setIsModalOpen(false)} variant="outline" className="w-full" size="lg">
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
