"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zones } from "@/lib/zones"

interface TraderDetailProps {
  zoneId?: number
  onBack?: () => void
}

export default function ZoneDetail({ zoneId, onBack }: TraderDetailProps) {
  const router = useRouter()
    console.log(zoneId)
  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  const zone = zones.find((z) => z.id === zoneId)
  console.log(zoneId)

  if (!zone) {
    return <div className="p-6 text-red-500">Zone not found 🚫</div>
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? "text-orange-400" : "text-gray-300"}`}>
        ★
      </span>
    ))
  }

  const catalogImages = ["/chart1.png", "/chart2.png", "/chart3.png", "/chart4.png", "/chart5.png", "/chart6.png"]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-200">
        <Button variant="ghost" size="sm" onClick={handleBack} className="p-0 h-auto hover:bg-transparent">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </Button>
        <h1 className="text-lg font-medium text-gray-900">Zones</h1>
      </div>

      <div className="p-6">
        {/* Avatar and Name */}
        <div className="flex flex-col items-center mb-6">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={zone.avatar} />
            <AvatarFallback>{zone.name[0]}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{zone.name}</h2>
          <p className="text-sm text-gray-600 text-center leading-relaxed px-4">
            Signal provider {zone.name} with {zone.reviews} reviews and trusted by {zone.subscribers} subscribers.
          </p>
        </div>

        {/* Stats Section */}
        <div className="space-y-4 mb-8">
          {/* Entry Fee */}
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-700 font-medium">Entry Fee</span>
            <span className="text-gray-900 font-medium">{zone.entryFee}</span>
          </div>

          {/* Subscribers */}
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-700 font-medium">Subscribers</span>
            <span className="text-gray-900 font-medium">{zone.subscribers}</span>
          </div>

          {/* Win Rate */}
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-700 font-medium">Win Rate</span>
            <span className="text-gray-900 font-medium">{zone.winRate}</span>
          </div>

          {/* Ratings */}
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-700 font-medium">Ratings</span>
            <div className="flex gap-0.5">{renderStars(zone.stars)}</div>
          </div>
        </div>

        {/* Catalogs Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Catalogs</h3>
          <div className="grid grid-cols-3 gap-3">
            {catalogImages.map((image, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Trading chart ${index + 1}`}
                  width={120}
                  height={120}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Join Button */}
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-medium rounded-lg">
          Join now - {zone.entryFee}
        </Button>
      </div>
    </div>
  )
}
