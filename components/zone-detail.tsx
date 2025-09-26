"use client";

import { ArrowLeft, BadgeCheckIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import { useZones } from "@/hooks/use-zone";

interface TraderDetailProps {
  zoneId?: string;
  onBack?: () => void;
}

// Mock catalog images for now
const CATALOG_IMAGES = [
  "/user.jpg",
  "/user.jpg",
  "/user.jpg",
  "/user.jpg",
  "/user.jpg",
  "/user.jpg",
];

const AUTO_ADVANCE_INTERVAL = 3000;

export default function ZoneDetail({ zoneId, onBack }: TraderDetailProps) {
  const router = useRouter();
  const { zones } = useZones();

  const [showCatalogViewer, setShowCatalogViewer] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ Find zone by ID
const zone = useMemo(() => {
  if (!zones) return undefined
  return zones.find((z) => String(z.id) === String(zoneId))
}, [zones, zoneId])
  // ✅ Close catalog viewer
  const closeCatalogViewer = useCallback(() => {
    setShowCatalogViewer(false);
    setCurrentImageIndex(0);
    setIsPaused(false);
  }, []);


  // ✅ Slideshow handlers
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex >= CATALOG_IMAGES.length) {
        setTimeout(closeCatalogViewer, 100);
        return prev;
      }
      return nextIndex;
    });
  }, [closeCatalogViewer]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const handleBack = useCallback(() => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  }, [onBack, router]);

  // ✅ Timer effect
  useEffect(() => {
    if (!showCatalogViewer || isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(nextImage, AUTO_ADVANCE_INTERVAL);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [showCatalogViewer, isPaused, nextImage]);

  // ✅ Keyboard navigation
  useEffect(() => {
    if (!showCatalogViewer) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          closeCatalogViewer();
          break;
        case "ArrowRight":
          e.preventDefault();
          nextImage();
          break;
        case "ArrowLeft":
          e.preventDefault();
          prevImage();
          break;
        case " ":
          e.preventDefault();
          togglePause();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [showCatalogViewer, closeCatalogViewer, nextImage, prevImage, togglePause]);

  // ✅ Stars renderer
  const renderStars = useCallback((rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? "text-orange-400" : "text-gray-300"}`}
      >
        ★
      </span>
    ));
  }, []);

  // ✅ Catalog handlers
  const openCatalogViewer = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setShowCatalogViewer(true);
    setIsPaused(false);
  }, []);

  const handleCloseClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    closeCatalogViewer();
  }, [closeCatalogViewer]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeCatalogViewer();
    }
  }, [closeCatalogViewer]);

  const handleImageContainerClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    togglePause();
  }, [togglePause]);

  const handleManualNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused(true);
    nextImage();
  }, [nextImage]);

  const handleManualPrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused(true);
    prevImage();
  }, [prevImage]);

  const getProgressBarStyle = useCallback(
    (index: number) => {
      if (index < currentImageIndex) return { width: "100%" };
      if (index === currentImageIndex && !isPaused) {
        return {
          animation: `progressBar ${AUTO_ADVANCE_INTERVAL}ms linear forwards`,
        };
      }
      return { width: "0%" };
    },
    [currentImageIndex, isPaused]
  );

  // ✅ Early return if zone not found
  if (!zone) {
    return <div className="p-6 text-red-500">Zone not found 🚫</div>;
  }

  // ✅ Safe fallbacks for missing API fields
  const {
    name = "Unknown Zone",
    avatar = "/placeholder.svg",
    reviews = "0",
    subscribers = "0",
    status = "Active",
    winRate = "N/A",
    lossRate = "N/A",
    // stars = 0,
    marketType = "General",
    entryFee = "Free",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = zone as any;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center gap-4 p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="p-0 h-auto hover:bg-transparent"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </Button>
        <h1 className="text-lg font-medium text-gray-900">Zones</h1>
      </header>

      <main className="p-4">
        {/* Avatar + Name */}
        <section className="flex flex-col items-start mb-6 px-2">
          <Avatar className="w-[90px] h-[90px] mb-4">
            <AvatarImage src={avatar} alt={`${name} avatar`} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <h2 className="text-[39px] font-medium text-[#151515] mb-3">
            {name}
          </h2>
          <p className="text-[16px] text-[#5D5D5D]">
            Signal provider {name} with {reviews} reviews and trusted by{" "}
            {subscribers} subscribers.
          </p>
        </section>

        {/* Stats */}
        <section className="space-y-4 mb-8 text-[#5D5D5D] text-[16px]">
          <div className="flex justify-between px-2 py-3 border-b-2 border-[#D1D1D1]">
            <span>Status</span>
            <Badge variant="secondary" className="border-[#09DE78] bg-white text-[#09DE78]">
              <BadgeCheckIcon /> {status}
            </Badge>
          </div>
          <div className="flex justify-between px-2 py-3 border-b-2 border-[#D1D1D1]">
            <span>Win Rate</span>
            <span className="text-gray-900 font-medium">{winRate}</span>
          </div>
          <div className="flex justify-between px-2 py-3 border-b-2 border-[#D1D1D1]">
            <span>Loss Rate</span>
            <span className="text-gray-900 font-medium">{lossRate}</span>
          </div>
          <div className="flex justify-between px-2 py-3 border-b-2 border-[#D1D1D1]">
            <span>Ratings</span>
            <div className="flex gap-0.5">{renderStars(4)}</div>
          </div>
          <div className="flex justify-between px-2 py-3 border-b-2 border-[#D1D1D1]">
            <span>Market Type</span>
            <span className="text-gray-900 font-medium">{marketType}</span>
          </div>
        </section>

        {/* Catalogs */}
        <section className="my-8 px-2 py-4 bg-[#E7E7E7] rounded-md">
          <h3 className="text-[22px] font-medium mb-4">Catalogs</h3>
          <div className="grid grid-cols-3 gap-3">
            {CATALOG_IMAGES.map((image, index) => (
              <button
                key={index}
                type="button"
                className="aspect-square rounded-lg overflow-hidden hover:opacity-80"
                onClick={() => openCatalogViewer(index)}
              >
                <Image
                  src={image}
                  alt={`Trading chart ${index + 1}`}
                  width={120}
                  height={120}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        {/* Join Button */}
        <Link
          href={`/payment/${zone.id}`}
          className="w-full bg-[#2E5DFC] hover:bg-blue-700 text-white py-2 text-lg font-medium rounded-lg text-center block"
        >
          Join now - {entryFee}
        </Link>
      </main>

      {/* Catalog Viewer */}
      {showCatalogViewer && (
        <div
          className="fixed inset-0 bg-black z-50 flex flex-col"
          onClick={handleCloseClick}
        >
           <header className="flex items-center justify-between p-4 text-white">
      <h2>
        View Catalog ({currentImageIndex + 1} of {CATALOG_IMAGES.length})
      </h2>
      <button
        onClick={closeCatalogViewer}   // ✅ Direct call, no stopPropagation
        className="p-2 hover:bg-white/10 rounded-full transition-colors"
        type="button"
        aria-label="Close catalog viewer"
      >
        <X className="w-6 h-6" />
      </button>
    </header>

          {/* Progress Bars */}
          <div className="flex justify-center gap-2 px-4 mb-4">
            {CATALOG_IMAGES.map((_, index) => (
              <div
                key={index}
                className="relative h-1 flex-1 max-w-12 bg-white/30 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-blue-500 transition-all"
                  style={getProgressBarStyle(index)}
                />
              </div>
            ))}
          </div>

          {/* Image */}
          <div
            className="flex-1 flex items-center justify-center px-4 cursor-pointer"
            onClick={handleImageContainerClick}
          >
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src={CATALOG_IMAGES[currentImageIndex]}
                alt={`Trading chart ${currentImageIndex + 1}`}
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
          </div>

          {/* Nav buttons */}
          <button
            className="absolute inset-y-0 left-0 w-1/3 cursor-pointer opacity-0"
            onClick={handleManualPrev}
            disabled={currentImageIndex === 0}
          />
          <button
            className="absolute inset-y-0 right-0 w-1/3 cursor-pointer opacity-0"
            onClick={handleManualNext}
            disabled={currentImageIndex === CATALOG_IMAGES.length - 1}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes progressBar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
