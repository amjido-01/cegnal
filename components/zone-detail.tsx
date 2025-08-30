"use client";

import { ArrowLeft, BadgeCheckIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zones } from "@/lib/zones";
import { Badge } from "./ui/badge";
import { useState, useEffect } from "react";
import Link from "next/link";

interface TraderDetailProps {
  zoneId?: number;
  onBack?: () => void;
}

export default function ZoneDetail({ zoneId, onBack }: TraderDetailProps) {
  const router = useRouter();
  const [showCatalogViewer, setShowCatalogViewer] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const zone = zones.find((z) => z.id === zoneId);

  const closeCatalogViewer = () => {
    setShowCatalogViewer(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => {
      const nextIndex = prev + 1;
      // If we're at the last image, close the viewer
      if (nextIndex >= catalogImages.length) {
        setTimeout(() => {
          closeCatalogViewer();
        }, 100); // Small delay for smooth transition
        return prev;
      }
      return nextIndex;
    });
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => Math.max(0, prev - 1));
  };

  // Timer for auto-advancing images (WhatsApp style)
  useEffect(() => {
    if (!showCatalogViewer || isPaused) return;

    const timer = setInterval(() => {
      nextImage();
    }, 3000); // 3 seconds per image (adjust as needed)

    return () => clearInterval(timer);
  }, [showCatalogViewer, currentImageIndex, isPaused]);

  // Fixed: Add closeCatalogViewer to dependencies
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showCatalogViewer) {
        if (e.key === "Escape") closeCatalogViewer();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === " ") {
          // Spacebar to pause/play
          e.preventDefault();
          setIsPaused((prev) => !prev);
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [showCatalogViewer]); // Dependencies are fine as they are

  console.log(zoneId);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  if (!zone) {
    return <div className="p-6 text-red-500">Zone not found 🚫</div>;
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? "text-orange-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  const catalogImages = [
    "/user.jpg",
    "/user.jpg",
    "/user.jpg",
    "/user.jpg",
    "/user.jpg",
    "/user.jpg",
  ];

  const openCatalogViewer = (index: number) => {
    setCurrentImageIndex(index);
    setShowCatalogViewer(true);
    setIsPaused(false); // Reset pause state when opening
  };

  // Fixed: Add event handler with stopPropagation
  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeCatalogViewer();
  };

  // Fixed: Add backdrop click handler
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeCatalogViewer();
    }
  };

  // Fixed: Prevent image container clicks from bubbling and pause/resume timer
  const handleImageContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused((prev) => !prev); // Toggle pause on tap
  };

  // Handle manual navigation
  const handleManualNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused(true); // Pause auto-advance when user manually navigates
    nextImage();
  };

  const handleManualPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused(true); // Pause auto-advance when user manually navigates
    prevImage();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center gap-4 p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="p-0 h-auto hover:bg-transparent"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </Button>
        <h1 className="text-lg font-medium text-gray-900">Zones</h1>
      </div>

      <div className="p-4">
        {/* Avatar and Name */}
        <div className="flex flex-col items-start mb-6 px-2">
          <Avatar className="w-[90px] h-[90px] mb-4">
            <AvatarImage src={zone.avatar || "/placeholder.svg"} />
            <AvatarFallback>{zone.name[0]}</AvatarFallback>
          </Avatar>
          <h2 className="text-[39px] font-medium leading-[100%] tracking-[-2.8%] text-[#151515] mb-3">
            {zone.name}
          </h2>
          <p className="text-[16px] font-normal text-[#5D5D5D] leading-[100%] tracking-[-2.8%]">
            Signal provider {zone.name} with {zone.reviews} reviews and trusted
            by {zone.subscribers} subscribers.
          </p>
        </div>
        {/* Stats Section */}
        <div className="space-y-4 mb-8 text-[#5D5D5D] font-normal text-[16px] leading-[100%] tracking-[-2.8%]">
          {/* Status */}
          <div className="flex justify-between items-center px-2 py-3 border-b-2 border-[#D1D1D1]">
            <span className="">Status</span>
            <Badge
              variant="secondary"
              className="border-[#09DE78] bg-white text-[#09DE78]"
            >
              <BadgeCheckIcon />
              {zone.status}
            </Badge>
          </div>

          {/* Win Rate */}
          <div className="flex justify-between items-center px-2 py-3 border-b-2 border-[#D1D1D1]">
            <span className="">Win Rate</span>
            <span className="text-gray-900 font-medium">{zone.winRate}</span>
          </div>

          {/* Loss Rate */}
          <div className="flex justify-between items-center px-2 py-3 border-b-2 border-[#D1D1D1]">
            <span className="">Loss Rate</span>
            <span className="text-gray-900 font-medium">{zone.lossRate}</span>
          </div>

          {/* Ratings */}
          <div className="flex justify-between items-center px-2 py-3 border-b-2 border-[#D1D1D1]">
            <span className="">Ratings</span>
            <div className="flex gap-0.5">{renderStars(zone.stars)}</div>
          </div>

          {/* Market Type */}
          <div className="flex justify-between items-center px-2 py-3 border-b-2 border-[#D1D1D1]">
            <span className="">Market Type</span>
            <span className="text-gray-900 font-medium">{zone.marketType}</span>
          </div>
        </div>
        {/* Catalogs Section */}
        <div className="my-8 px-2 py-4 bg-[#E7E7E7] rounded-md">
          <h3 className="text-[22px] font-medium leading-[100%] text-[#000000] mb-4">
            Catalogs
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {catalogImages.map((image, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => openCatalogViewer(index)}
              >
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
        <Link
          href={`/payment/${zone.id}`}
          className="w-full bg-[#2E5DFC] hover:bg-blue-700 text-white py-2 text-lg font-medium rounded-lg text-center block"
        >
          Join now - {zone.entryFee}
        </Link>
      </div>

      {/* Catalog Viewer Modal */}
      {showCatalogViewer && (
        <div
          className="fixed inset-0 bg-black z-50 flex flex-col"
          onClick={handleBackdropClick}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 text-white">
            <h2 className="text-lg font-medium">View Catalog</h2>
            <button
              onClick={handleCloseClick}
              className="p-2 hover:bg-white/10 rounded-full transition-colors z-10"
              type="button"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 px-4 mb-4">
            {catalogImages.map((_, index) => (
              <div
                key={index}
                className="relative h-1 flex-1 max-w-12 bg-white/30 rounded-full overflow-hidden"
              >
                <div
                  className={`h-full bg-blue-500 transition-all duration-100 ease-linear ${
                    index < currentImageIndex
                      ? "w-full"
                      : index === currentImageIndex
                      ? isPaused
                        ? "w-0"
                        : "w-full animate-pulse"
                      : "w-0"
                  }`}
                  style={{
                    animation:
                      index === currentImageIndex && !isPaused
                        ? "progressBar 3s linear forwards"
                        : "none",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Image Container */}
          <div
            className="flex-1 flex items-center justify-center px-4 cursor-pointer"
            onClick={handleImageContainerClick}
          >
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src={catalogImages[currentImageIndex] || "/placeholder.svg"}
                alt={`Trading chart ${currentImageIndex + 1}`}
                fill
                className="object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Navigation Areas (invisible) */}
          <div
            className="absolute inset-y-0 left-0 w-1/3 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/3 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          />
        </div>
      )}
    </div>
  );
}
