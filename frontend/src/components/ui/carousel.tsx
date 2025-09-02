"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "./utils";
import { Button } from "./button";

const CarouselContext = React.createContext<UseEmblaCarouselType | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within <Carousel />");
  }
  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical";
  opts?: Parameters<typeof useEmblaCarousel>[1];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { axis: orientation === "horizontal" ? "x" : "y" },
    opts,
  );

  return (
    <CarouselContext.Provider value={[emblaRef, emblaApi]}>
      <div
        data-orientation={orientation}
        className={cn("relative", className)}
        {...props}
      >
        <div ref={emblaRef} className="overflow-hidden">
          <div
            className={cn(
              "flex",
              orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselItem({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [emblaRef] = useCarousel();
  return (
    <div
      className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", className)}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const [, emblaApi] = useCarousel();

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      className={cn(
        "absolute left-2 top-1/2 -translate-y-1/2 rounded-full shadow-md",
        className,
      )}
      onClick={() => emblaApi?.scrollPrev()}
      {...props}
    >
      <ArrowLeft className="size-4" />
    </Button>
  );
}

function CarouselNext({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const [, emblaApi] = useCarousel();

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      className={cn(
        "absolute right-2 top-1/2 -translate-y-1/2 rounded-full shadow-md",
        className,
      )}
      onClick={() => emblaApi?.scrollNext()}
      {...props}
    >
      <ArrowRight className="size-4" />
    </Button>
  );
}

export { Carousel, CarouselItem, CarouselPrevious, CarouselNext };
