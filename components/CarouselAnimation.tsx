import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface CarouselAnimationProps {
  className?: string;
}

const carouselItems = [
  { id: 1, estPrice: 15999, sellPrice: 17500 },
  { id: 2, estPrice: 22500, sellPrice: 24000 },
  { id: 3, estPrice: 18750, sellPrice: 20000 },
  { id: 4, estPrice: 31000, sellPrice: 33500 },
  { id: 5, estPrice: 27500, sellPrice: 29000 },
  { id: 6, estPrice: 42000, sellPrice: 45000 },
  { id: 7, estPrice: 35999, sellPrice: 38500 },
  { id: 8, estPrice: 29500, sellPrice: 31000 },
  { id: 9, estPrice: 38750, sellPrice: 41000 },
  { id: 10, estPrice: 45000, sellPrice: 48500 },
];

const CarouselAnimation: React.FC<CarouselAnimationProps> = ({ className }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollWidth = carousel.scrollWidth;
    const viewportWidth = carousel.offsetWidth;
    const itemWidth = scrollWidth / (carouselItems.length * 2);

    let scrollPosition = 0;
    const scrollStep = 1;
    const scrollInterval = 50;

    const scroll = () => {
      scrollPosition += scrollStep;
      if (scrollPosition >= scrollWidth / 2) {
        scrollPosition = 0;
      }
      carousel.scrollLeft = scrollPosition;
    };

    const intervalId = setInterval(scroll, scrollInterval);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`${className} relative overflow-hidden`}>
      {/* Left fade overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-fade-gray-right z-10"></div>
      
      {/* Right fade overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-fade-gray-left z-10"></div>
      
      <div ref={carouselRef} className="overflow-hidden whitespace-nowrap">
        <div className="inline-flex animate-scroll">
          {[...carouselItems, ...carouselItems].map((item, index) => (
            <div key={`${item.id}-${index}`} className="w-64 mx-2 bg-white rounded-lg shadow-md overflow-hidden border border-dark-orange">
              <div className="p-4">
                <p className="text-lg font-semibold bg-gradient-orange-purple from-dark-orange to-purple-600 bg-clip-text text-transparent">
                  ${item.estPrice.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  Sell Price: ${item.sellPrice.toLocaleString()}
                </p>
              </div>
              <div className="relative h-48">
                <Image
                  src={`/car-images/car-${item.id}.jpg`}
                  alt={`Car ${item.id}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselAnimation;