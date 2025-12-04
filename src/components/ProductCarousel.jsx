import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ChevronLeftIcon from './ui/icons/ChevronLeftIcon';
import ChevronRightIcon from './ui/icons/ChevronRightIcon';

import { useCart } from '../context/CartContext';

const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
};

const ITEMS_PER_SLIDE = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 3,
};

const ProductCarousel = ({ products }) => {
  const { addToCart } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getItemsPerSlide = () => {
    if (typeof window === 'undefined') return ITEMS_PER_SLIDE.DESKTOP;
    if (window.innerWidth < BREAKPOINTS.MOBILE) return ITEMS_PER_SLIDE.MOBILE;
    if (window.innerWidth < BREAKPOINTS.TABLET) return ITEMS_PER_SLIDE.TABLET;
    return ITEMS_PER_SLIDE.DESKTOP;
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());

      const newTotalSlides = Math.ceil(products.length / getItemsPerSlide());
      if (currentIndex >= newTotalSlides) {
        setCurrentIndex(0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [products.length, currentIndex]);

  const totalSlides = Math.ceil(products.length / itemsPerSlide);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prev => (prev + 1) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prev => (prev - 1 + totalSlides) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToSlide = index => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative max-w-7xl mx-auto">
        {/* Carousel Container */}
        <div className="overflow-hidden pt-3 pb-6">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => {
              const slideProducts = products.slice(
                slideIndex * itemsPerSlide,
                slideIndex * itemsPerSlide + itemsPerSlide
              );
              return (
                <div
                  key={slideIndex}
                  className="w-full flex-shrink-0"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {slideProducts.map(product => (
                      <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
              aria-label="Next slide"
            >
              <ChevronRightIcon className="w-6 h-6 text-gray-800" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;
