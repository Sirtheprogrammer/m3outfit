import { 
  ShoppingBagIcon,
  TagIcon,
  SparklesIcon,
  GiftIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';

const Categories = () => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const categories = [
    { name: 'Jerseys', icon: ShoppingBagIcon },
    { name: 'Trousers', icon: TagIcon },
    { name: 'T-Shirts', icon: ShoppingBagIcon },
    { name: 'Sandals', icon: GiftIcon },
    { name: 'Shoes', icon: GiftIcon },
    { name: 'Others', icon: SparklesIcon }
  ];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-50"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
          )}

          {/* Categories */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex space-x-2 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <button
                key={category.name}
                className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-200 hover:border-primary hover:text-primary transition-colors duration-200 whitespace-nowrap bg-white"
              >
                <category.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-50"
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Hide scrollbar for different browsers */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Categories; 