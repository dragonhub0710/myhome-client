"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface ImageCarouselProps {
  images: string[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNavigation = (direction: "previous" | "next") => {
    const newIndex =
      direction === "previous"
        ? (currentIndex - 1 + images.length) % images.length
        : (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-muted rounded-lg">
        <p className="text-muted-foreground">No images to display</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full rounded-lg overflow-hidden relative">
        <Image
          src={images[currentIndex]}
          alt="theme"
          fill
          sizes="100%"
          className="object-cover transition-all duration-500"
          priority
        />
      </div>

      {/* Left Arrow */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/30 backdrop-blur-sm"
          onClick={() => handleNavigation("previous")}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous image</span>
        </Button>
      </div>

      {/* Right Arrow */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-white/30 backdrop-blur-sm"
          onClick={() => handleNavigation("next")}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next image</span>
        </Button>
      </div>
    </div>
  );
}
