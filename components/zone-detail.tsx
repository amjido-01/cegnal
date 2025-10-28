/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ArrowLeft, BadgeCheckIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";
import { useState, useCallback, useEffect, useRef } from "react";
import { useJoinZone } from "@/hooks/use-zones";
import { toast } from "sonner";
import { Zone } from "@/types";

interface ZoneDetailProps {
  zone: Zone;
  onBack?: () => void;
}

const CATALOG_IMAGES = [
  "/forex-trading-chart-with-candlesticks.jpg",
  "/forex-trading-chart-with-candlesticks.jpg",
  "/forex-trading-chart-with-candlesticks.jpg",
];

const AUTO_ADVANCE_INTERVAL = 3000;

export default function ZoneDetail({ zone, onBack }: ZoneDetailProps) {
  const router = useRouter();
  const { mutate: joinZone, isPending } = useJoinZone();

  const [showCatalogViewer, setShowCatalogViewer] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleBack = useCallback(() => {
    if (onBack) onBack();
    else router.back();
  }, [onBack, router]);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? "text-orange-400" : "text-gray-300"}`}
      >
        ★
      </span>
    ));

  const handleJoinZone = () => {
    if (!zone) return;

    if (zone.isPaid) {
      router.push(`/payment/${zone.id}`);
      return;
    }

    joinZone(zone.id, {
      onSuccess: (data) => {
        toast.success(data.responseMessage || "Successfully joined zone!");
        router.push(`/chat/${zone.id}`);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.responseMessage || "Failed to join zone");
      },
    });
  };

  // --- Catalog viewer controls ---
  const openCatalogViewer = (index: number) => {
    setCurrentImageIndex(index);
    setShowCatalogViewer(true);
    setIsPaused(false);
  };

  const closeCatalogViewer = () => {
    // **Close only via X** (this is the function called by X button)
    setShowCatalogViewer(false);
    setCurrentImageIndex(0);
    setIsPaused(false);
    // clear timer just in case
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex >= CATALOG_IMAGES.length) {
        // close when reaching end (same as original behavior)
        // but keep a tiny delay for UX
        setTimeout(() => {
          // only close if still open and not paused
          setShowCatalogViewer(false);
          setCurrentImageIndex(0);
          setIsPaused(false);
        }, 100);
        return prev;
      }
      return nextIndex;
    });
  }, []);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  // const handleImageClickToggle = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   togglePause();
  // };

  const handleManualNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused(true);
    nextImage();
  };

  const handleManualPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused(true);
    prevImage();
  };

  // Auto-advance effect
  useEffect(() => {
    if (!showCatalogViewer || isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      nextImage();
    }, AUTO_ADVANCE_INTERVAL);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [showCatalogViewer, isPaused, nextImage]);

  // Keyboard nav (ArrowLeft/ArrowRight/Space). Note: Escape DOES NOT close (per your "Only X" rule)
  useEffect(() => {
    if (!showCatalogViewer) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextImage();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevImage();
      } else if (e.key === " ") {
        e.preventDefault();
        togglePause();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showCatalogViewer, nextImage, prevImage, togglePause]);

  const getProgressBarStyle = (index: number) => {
    if (index < currentImageIndex) return { width: "100%" };
    if (index === currentImageIndex && !isPaused) {
      return {
        animation: `progressBar ${AUTO_ADVANCE_INTERVAL}ms linear forwards`,
      } as React.CSSProperties;
    }
    return { width: "0%" };
  };

  if (!zone) return <div className="p-6 text-red-500">Zone not found 🚫</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center gap-4 p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="p-0 h-auto hover:bg-transparent"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </Button>
        <h1 className="text-lg font-medium text-gray-900">Zone Details</h1>
      </header>

      <main className="p-4">
        {/* Zone Info */}
        <section className="flex flex-col items-start mb-6 px-2">
          <Avatar className="w-[90px] h-[90px] mb-4">
            <AvatarImage src="/user.jpg" alt={zone.zoneName} />
            <AvatarFallback>{zone.zoneName[0]}</AvatarFallback>
          </Avatar>

          <h2 className="text-[30px] font-semibold text-[#151515] mb-3">
            {zone.zoneName}
          </h2>
          <p className="text-[15px] text-[#5D5D5D]">{zone.description}</p>
        </section>

        {/* Stats */}
        <section className="space-y-4 mb-8 text-[#5D5D5D] text-[16px]">
          <div className="flex justify-between px-2 py-3 border-b border-gray-200">
            <span>Status</span>
            <Badge
              variant="secondary"
              className="bg-white text-[#09DE78] border-[#09DE78]"
            >
              <BadgeCheckIcon className="w-4 h-4 mr-1" /> Active
            </Badge>
          </div>
          <div className="flex justify-between px-2 py-3 border-b border-gray-200">
            <span>Win Rate</span>
            <span className="text-gray-900 font-medium">{"60%"}</span>
          </div>
          <div className="flex justify-between px-2 py-3 border-b border-gray-200">
            <span>Loss Rate</span>
            <span className="text-gray-900 font-medium">{ "30%"}</span>
          </div>
          <div className="flex justify-between px-2 py-3 border-b border-gray-200">
            <span>Ratings</span>
            <div className="flex gap-0.5">{renderStars(4)}</div>
          </div>
          <div className="flex justify-between px-2 py-3 border-b border-gray-200">
            <span>Market Type</span>
            <span className="text-gray-900 font-medium">{"Forex"}</span>
          </div>
        </section>

        {/* Catalogs */}
        <section className="my-8 px-2 py-4 bg-[#F7F7F7] rounded-md">
          <h3 className="text-[20px] font-medium mb-4">Catalogs</h3>

          {/* Thumbnails */}
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
        <div className="mt-6 px-2">
          <Button
            onClick={handleJoinZone}
            disabled={isPending}
            className={`w-full py-3 text-white text-sm rounded-lg ${
              zone.isPaid ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isPending
              ? "Joining..."
              : zone.isPaid
              ? `Join - ₦${(zone.price)}`
              : "Join Free Zone"}
          </Button>
        </div>
      </main>

      {/* Fullscreen Catalog Viewer (WhatsApp-style) */}
      {showCatalogViewer && (
        <div
          className="fixed inset-0 z-50 bg-black flex flex-col items-center"
          // Do NOT close on backdrop click — close only via X button
          onClick={(e) => {
            // prevent closing on backdrop click
            e.stopPropagation();
          }}
        >
          {/* Header with close */}
          <header className="w-full flex items-center justify-between p-4 text-white">
            <div />
            <div className="text-sm">
              {currentImageIndex + 1} / {CATALOG_IMAGES.length}
            </div>
            <button
              className="p-2 hover:bg-white/10 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                closeCatalogViewer();
              }}
              aria-label="Close catalog viewer"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </header>

          {/* Progress Bars */}
          <div className="w-full px-4 mb-4">
            <div className="flex gap-2">
              {CATALOG_IMAGES.map((_, idx) => (
                <div key={idx} className="relative h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all"
                    style={getProgressBarStyle(idx)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Image area */}
          <div
            className="flex-1 w-full flex items-center justify-center px-4"
            // clicking image area toggles pause; but should not close
            onClick={(e) => {
              e.stopPropagation();
              togglePause();
            }}
          >
            <div className="relative w-full max-w-3xl aspect-square">
              <Image
                src={CATALOG_IMAGES[currentImageIndex]}
                alt={`Catalog ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Nav - invisible zones to allow tapping left/right */}
          <button
            className="absolute inset-y-0 left-0 w-1/3 opacity-0"
            onClick={(e) => {
              e.stopPropagation();
              handleManualPrev(e as any);
            }}
            disabled={currentImageIndex === 0}
            aria-label="Previous image"
          />
          <button
            className="absolute inset-y-0 right-0 w-1/3 opacity-0"
            onClick={(e) => {
              e.stopPropagation();
              handleManualNext(e as any);
            }}
            disabled={currentImageIndex === CATALOG_IMAGES.length - 1}
            aria-label="Next image"
          />

          {/* Optional visible chevrons (mobile friendly) */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleManualPrev(e as any);
              }}
              className="p-2 rounded-full bg-white/10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleManualNext(e as any);
              }}
              className="p-2 rounded-full bg-white/10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
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
