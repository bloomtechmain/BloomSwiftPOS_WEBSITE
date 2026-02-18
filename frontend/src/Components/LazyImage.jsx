import { useState, useRef, useEffect } from 'react';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik0zNSA0MEw0NSA1MEw2NSAzMEw3NSA0MFY2MEgzNVY0MFoiIGZpbGw9IiNkMWQ1ZGIiLz4KPC9zdmc+',
  sizes = '100vw',
  priority = false, // For LCP images
  width,
  height,
  style,
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(priority); // LCP images load immediately
  const [error, setError] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    // Don't use intersection observer for priority images
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '50px', // Start loading 50px before the image comes into view
        threshold: 0.1 
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setLoaded(true); // Still show the placeholder/error state
  };

  // Generate WebP srcset from original image path
  const generateSrcSet = (imageSrc) => {
    if (!imageSrc) return '';
    
    // Extract filename without extension
    const fileName = imageSrc.split('/').pop().replace(/\.(jpg|jpeg|png)$/i, '');
    const basePath = imageSrc.substring(0, imageSrc.lastIndexOf('/'));
    
    // Generate srcset for responsive WebP images
    return `${basePath}/optimized/${fileName}-320w.webp 320w,
            ${basePath}/optimized/${fileName}-640w.webp 640w,
            ${basePath}/optimized/${fileName}-1024w.webp 1024w,
            ${basePath}/optimized/${fileName}-1920w.webp 1920w`;
  };

  // Generate fallback WebP src
  const getWebPSrc = (imageSrc) => {
    if (!imageSrc) return '';
    const fileName = imageSrc.split('/').pop().replace(/\.(jpg|jpeg|png)$/i, '');
    const basePath = imageSrc.substring(0, imageSrc.lastIndexOf('/'));
    return `${basePath}/optimized/${fileName}.webp`;
  };

  const srcSet = generateSrcSet(src);
  const webpSrc = getWebPSrc(src);

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden ${className}`}
    >
      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
        </div>
      )}
      
      {/* Actual image with WebP support */}
      {inView && (
        <picture>
          <source 
            type="image/webp" 
            srcSet={srcSet}
            sizes={sizes}
          />
          <img
            src={error ? placeholder : (webpSrc || src)}
            alt={alt}
            className={`transition-opacity duration-300 ${
              loaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding={priority ? 'sync' : 'async'}
            width={width}
            height={height}
            style={style}
            {...props}
          />
        </picture>
      )}
      
      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">📷</div>
            <div className="text-sm">Image failed to load</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
