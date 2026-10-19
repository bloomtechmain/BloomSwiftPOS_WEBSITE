import React, { useEffect, useState } from 'react';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageHero, Section, Reveal, Eyebrow } from '../Components/kit';
import API_URL from '../config/api';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const lkrFormatter = new Intl.NumberFormat('en-LK', {
  style: 'currency',
  currency: 'LKR'
});

const ImageCarousel = ({ images, altText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-48 rounded-lg overflow-hidden bg-white">
      <img
        src={images[currentIndex]}
        alt={`${altText} - Image ${currentIndex + 1}`}
        className="w-full h-full object-contain"
      />
      
      {images.length > 1 && (
        <>
          {/* Navigation Buttons */}
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-navy/70 hover:bg-navy text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-navy/70 hover:bg-navy text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
          
          {/* Dots Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Show image ${index + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-navy' : 'bg-navy/25'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Hardware = () => {
  const [hardware, setHardware] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const toast = useToast();

  useEffect(() => {
    const fetchHardware = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/hardware`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to load hardware');
        }

        setHardware(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHardware();
  }, []);

  const groupedHardware = hardware.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  // Define category order
  const categoryOrder = [
    'Monitors',
    'Computers',
    'Keyboard and mouse',
    'Scanners',
    'Cash Drawers',
    'Thermal Printers',
    'Other'
  ];

  const categories = Object.keys(groupedHardware).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="bg-white">
      <PageHero
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Shop Hardware' }]}
        title="Bloom Swift POS hardware"
        text={<p>Explore POS terminals, printers and accessories that work perfectly with Bloom Swift POS.</p>}
        image={{ src: '/images/general/pos-counter.webp', alt: 'POS terminal and receipt printer on a shop counter' }}
      />
      <Section bg="white">

        {loading && (
          <p className="text-gray-500 mb-6 text-sm">
            Loading hardware from database...
          </p>
        )}

        {error && !loading && (
          <p className="text-red-600 mb-6 text-sm">
            Failed to load hardware: {error}
          </p>
        )}

        {hardware.length === 0 && !loading && !error && (
          <p className="text-gray-500 mb-6 text-sm">
            No hardware has been added yet. Please check back later.
          </p>
        )}

        {categories.map((category) => (
          <div key={category} className="mb-16 last:mb-0">
            <Reveal className="mb-8 pb-4 border-b border-gray-200">
              <Eyebrow className="!mb-2">Hardware</Eyebrow>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-navy">
                {category}
              </h2>
            </Reveal>
            <div className="grid gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {groupedHardware[category].map((item) => {
                const specsPreview =
                  item.specs && item.specs.length > 120
                    ? `${item.specs.slice(0, 117)}...`
                    : item.specs || 'No specs provided yet.';

                const notesPreview =
                  item.additional_notes && item.additional_notes.length > 120
                    ? `${item.additional_notes.slice(0, 117)}...`
                    : item.additional_notes || '';

                // Use images array if available, otherwise fall back to single image
                const displayImages = item.images && item.images.length > 0 
                  ? item.images 
                  : item.image 
                    ? [item.image] 
                    : [];

                return (
                  <div
                    key={item.id}
                    className="group rounded-xl bg-grey-light p-6 flex flex-col shadow-[5px_5px_0_0_#D5DAE3] hover:bg-white hover:shadow-[8px_8px_0_0_#101D36] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200"
                  >
                    {displayImages.length > 0 && (
                      <div className="mb-4">
                        <ImageCarousel images={displayImages} altText={item.hardware_name} />
                      </div>
                    )}

                    <div className="mb-4">
                      <h3 className="text-lg font-extrabold text-navy">
                        {item.hardware_name}
                      </h3>
                      {item.brand && (
                        <p className="text-sm text-gray-500 mt-1">
                          {item.brand}
                        </p>
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="text-sm text-gray-700 mb-3">
                        {specsPreview}
                      </p>
                      {notesPreview && (
                        <p className="text-xs text-gray-500">
                          {notesPreview}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-extrabold text-navy">
                          {item.price != null ? lkrFormatter.format(Number(item.price)) : 'Contact us for pricing'}
                        </div>
                      </div>
                      
                      {item.price != null && (
                        <button
                          onClick={() => {
                            addToCart(item, 1);
                            toast.success(`${item.hardware_name} added to cart!`);
                          }}
                          className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={18} />
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </Section>
    </div>
  );
};

export default Hardware;
