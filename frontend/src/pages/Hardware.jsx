import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ShoppingCart, Search, X, Plus, Minus, Truck, ShieldCheck, Headset,
  PackageSearch, Eye, SlidersHorizontal, MessageSquare, ChevronDown
} from 'lucide-react';
import { Reveal, Eyebrow, Actions } from '../Components/kit';
import API_URL from '../config/api';
import { CATEGORY_ORDER, formatLKR, resolveImage } from '../config/shop';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useUI } from '../context/UIContext';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'name', label: 'Name: A to Z' },
];

const TRUST_ITEMS = [
  { icon: Truck, title: 'Islandwide delivery', text: 'Flat LKR 500 shipping' },
  { icon: ShieldCheck, title: 'Bloom Swift POS ready', text: 'Hardware we test with our POS' },
  { icon: Headset, title: 'Setup support', text: 'Our team helps you get running' },
];

const hasPrice =(item) => item.price != null && item.price !== '';

const sortCategories = (a, b) => {
  const indexA = CATEGORY_ORDER.indexOf(a);
  const indexB = CATEGORY_ORDER.indexOf(b);
  if (indexA !== -1 && indexB !== -1) return indexA - indexB;
  if (indexA !== -1) return -1;
  if (indexB !== -1) return 1;
  return a.localeCompare(b);
};

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

const QuantityStepper = ({ value, onChange, min = 0, size = 'md' }) => {
  const box = size === 'sm' ? 'h-10' : 'h-12';
  const btn = size === 'sm' ? 'w-10' : 'w-12';
  return (
    <div className={`flex items-center justify-between rounded-xl border-2 border-navy bg-white ${box}`}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`${btn} h-full flex items-center justify-center text-navy hover:bg-grey-light rounded-l-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors`}
      >
        <Minus size={16} aria-hidden="true" />
      </button>
      <span className="flex-1 text-center font-extrabold text-navy tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
        className={`${btn} h-full flex items-center justify-center text-navy hover:bg-grey-light rounded-r-lg transition-colors`}
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
};

const ProductImage = ({ src, alt, className = '' }) => {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center text-card-grey ${className}`}>
        <PackageSearch size={48} aria-hidden="true" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-contain ${className}`}
    />
  );
};

const SkeletonCard = () => (
  <div className="rounded-xl bg-grey-light p-4 animate-pulse">
    <div className="aspect-square rounded-lg bg-white mb-4" />
    <div className="h-3 w-1/3 bg-card-grey rounded mb-3" />
    <div className="h-4 w-3/4 bg-card-grey rounded mb-2" />
    <div className="h-4 w-1/2 bg-card-grey rounded mb-6" />
    <div className="h-11 bg-card-grey rounded-xl" />
  </div>
);

/* ------------------------------------------------------------------ */
/* Product card                                                        */
/* ------------------------------------------------------------------ */

const ProductCard = ({ item, onQuickView, onAdd, onRequestQuote }) => {
  const { getItemQuantity, updateQuantity } = useCart();
  const inCart = getItemQuantity(item.id);
  const priced = hasPrice(item);

  return (
    <article className="group relative flex flex-col rounded-xl bg-grey-light p-4 shadow-[5px_5px_0_0_#D5DAE3] hover:bg-white hover:shadow-[8px_8px_0_0_#101D36] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200">
      <button
        type="button"
        onClick={() => onQuickView(item)}
        className="relative block aspect-square rounded-lg bg-white overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
        aria-label={`View details for ${item.hardware_name}`}
      >
        <ProductImage
          src={item.images[0]}
          alt={item.hardware_name}
          className="absolute inset-0 w-full h-full p-4 transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 rounded-lg bg-navy/90 text-white text-xs font-bold py-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
          <Eye size={14} aria-hidden="true" /> Quick view
        </span>
        {inCart > 0 && (
          <span className="absolute top-3 right-3 rounded-full bg-brand-orange text-white text-[11px] font-bold px-2.5 py-1">
            {inCart} in cart
          </span>
        )}
      </button>

      <div className="flex-1 mt-4">
        <p className="font-mono text-[11px] font-bold tracking-widest uppercase text-gray-500">
          {item.category || 'Other'}
        </p>
        <h3 className="mt-1 text-base font-extrabold text-navy leading-snug">
          <button type="button" onClick={() => onQuickView(item)} className="text-left hover:text-navy-soft">
            {item.hardware_name}
          </button>
        </h3>
      </div>

      <div className="mt-4">
        <p className={`font-extrabold text-navy ${priced ? 'text-xl' : 'text-sm text-gray-600'}`}>
          {priced ? formatLKR(item.price) : 'Price on request'}
        </p>

        <div className="mt-3">
          {!priced ? (
            <button
              type="button"
              onClick={onRequestQuote}
              className="w-full h-11 rounded-xl border-2 border-navy text-navy font-bold hover:bg-navy hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare size={16} aria-hidden="true" />
              Request a quote
            </button>
          ) : inCart > 0 ? (
            <QuantityStepper size="sm" value={inCart} onChange={(q) => updateQuantity(item.id, q)} />
          ) : (
            <button
              type="button"
              onClick={() => onAdd(item, 1)}
              className="w-full h-11 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-bold transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart size={16} aria-hidden="true" />
              Add to cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

/* ------------------------------------------------------------------ */
/* Quick view modal                                                    */
/* ------------------------------------------------------------------ */

const ProductModal = ({ item, onClose, onAdd, onBuyNow, onRequestQuote }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const reduce = useReducedMotion();
  const { getItemQuantity } = useCart();
  const priced = hasPrice(item);
  const inCart = getItemQuantity(item.id);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-navy-dark/60" onClick={onClose} aria-hidden="true" />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        initial={reduce ? false : { y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduce ? { opacity: 0 } : { y: 40, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative w-full sm:max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-grey-light flex items-center justify-center text-navy"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Gallery */}
          <div className="bg-grey-light p-6 sm:p-8">
            <div className="relative aspect-square rounded-xl bg-white overflow-hidden">
              <ProductImage
                key={activeImage}
                src={item.images[activeImage]}
                alt={item.hardware_name}
                className="absolute inset-0 w-full h-full p-6"
              />
            </div>
            {item.images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto">
                {item.images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`Show image ${i + 1}`}
                    className={`relative w-16 h-16 flex-shrink-0 rounded-lg bg-white overflow-hidden border-2 transition-colors ${
                      i === activeImage ? 'border-navy' : 'border-transparent hover:border-card-grey'
                    }`}
                  >
                    <ProductImage src={src} alt="" className="absolute inset-0 w-full h-full p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col">
            <p className="font-mono text-[11px] font-bold tracking-widest uppercase text-brand-orange-dark">
              {item.category || 'Other'}
            </p>
            <h2 id="product-modal-title" className="mt-2 text-2xl sm:text-3xl font-extrabold text-navy leading-tight pr-10">
              {item.hardware_name}
            </h2>

            <p className={`mt-5 font-extrabold text-navy ${priced ? 'text-3xl' : 'text-lg'}`}>
              {priced ? formatLKR(item.price) : 'Price on request'}
            </p>

            {(item.specs || item.additional_notes) && (
              <div className="mt-6 border-t border-border-grey pt-6 space-y-4">
                {item.specs && (
                  <div>
                    <h3 className="text-sm font-bold text-navy mb-1">Specifications</h3>
                    <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{item.specs}</p>
                  </div>
                )}
                {item.additional_notes && (
                  <div>
                    <h3 className="text-sm font-bold text-navy mb-1">Notes</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{item.additional_notes}</p>
                  </div>
                )}
              </div>
            )}

            <div className="mt-auto pt-8">
              {priced ? (
                <>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-navy">Quantity</span>
                    <div className="w-36">
                      <QuantityStepper value={quantity} min={1} onChange={(q) => setQuantity(Math.max(1, q))} />
                    </div>
                  </div>
                  {inCart > 0 && (
                    <p className="mt-3 text-sm text-gray-500">You already have {inCart} in your cart.</p>
                  )}
                  <div className="mt-5 grid sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => onAdd(item, quantity)}
                      className="h-12 rounded-xl border-2 border-navy text-navy font-bold hover:bg-navy hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={18} aria-hidden="true" />
                      Add to cart
                    </button>
                    <button
                      type="button"
                      onClick={() => onBuyNow(item, quantity)}
                      className="h-12 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-bold transition-colors"
                    >
                      Buy now
                    </button>
                  </div>
                </>
              ) : (
                <button
                  type="button"
                  onClick={onRequestQuote}
                  className="w-full h-12 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare size={18} aria-hidden="true" />
                  Request a quote
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const Hardware = () => {
  const [hardware, setHardware] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const categoryMenuRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { openContactSales } = useUI();
  const toast = useToast();

  const activeCategory = searchParams.get('category') || 'All';
  const query = searchParams.get('q') || '';
  const sort = searchParams.get('sort') || 'featured';

  const setParam = (key, value, defaultValue) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (!value || value === defaultValue) next.delete(key);
      else next.set(key, value);
      return next;
    }, { replace: true });
  };

  useEffect(() => {
    const fetchHardware = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/hardware?lite=1`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to load hardware');
        }

        setHardware(
          data.data.map((item) => ({
            ...item,
            category: item.category || 'Other',
            images: (item.images?.length ? item.images : [item.image]).filter(Boolean).map(resolveImage),
          }))
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHardware();
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = {};
    hardware.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [hardware]);

  const categories = useMemo(() => Object.keys(categoryCounts).sort(sortCategories), [categoryCounts]);

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = hardware.filter((item) => {
      if (activeCategory !== 'All' && item.category !== activeCategory) return false;
      if (!q) return true;
      return [item.hardware_name, item.brand, item.category, item.specs]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(q));
    });

    const byPrice = (dir) => (a, b) => {
      // Items without a price always go last
      if (!hasPrice(a) && !hasPrice(b)) return 0;
      if (!hasPrice(a)) return 1;
      if (!hasPrice(b)) return -1;
      return (Number(a.price) - Number(b.price)) * dir;
    };

    const sorted = [...filtered];
    if (sort === 'price-asc') sorted.sort(byPrice(1));
    else if (sort === 'price-desc') sorted.sort(byPrice(-1));
    else if (sort === 'name') sorted.sort((a, b) => a.hardware_name.localeCompare(b.hardware_name));
    else sorted.sort((a, b) => sortCategories(a.category, b.category) || byPrice(1)(a, b));
    return sorted;
  }, [hardware, activeCategory, query, sort]);

  const handleAdd = (item, quantity) => {
    addToCart(item, quantity);
    toast.success(`${item.hardware_name} added to cart`);
  };

  const handleBuyNow = (item, quantity) => {
    addToCart(item, quantity);
    setSelected(null);
    navigate('/checkout');
  };

  // Close the category popup on outside click or Escape
  useEffect(() => {
    if (!categoriesOpen) return undefined;
    const onPointerDown = (e) => {
      if (!categoryMenuRef.current?.contains(e.target)) setCategoriesOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setCategoriesOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [categoriesOpen]);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRequestQuote = () => {
    setSelected(null);
    openContactSales();
  };

  const categoryButton = (name, count) => {
    const active = activeCategory === name;
    return (
      <button
        key={name}
        type="button"
        onClick={() => {
          setParam('category', name, 'All');
          setCategoriesOpen(false);
        }}
        role="option"
        aria-selected={active}
        className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-left whitespace-nowrap transition-colors ${
          active ? 'bg-navy text-white' : 'text-navy hover:bg-grey-light'
        }`}
      >
        <span>{name}</span>
        <span className={`text-xs tabular-nums ${active ? 'text-white/70' : 'text-gray-400'}`}>{count}</span>
      </button>
    );
  };

  return (
    <div className="bg-white">
      <section className="relative bg-navy text-white overflow-hidden">
        {/* Decorative background: dot grid + soft glows */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]"
        />
        <div aria-hidden="true" className="absolute -top-32 -right-24 w-[480px] h-[480px] rounded-full bg-brand-orange/25 blur-[120px]" />
        <div aria-hidden="true" className="absolute -bottom-40 -left-32 w-[420px] h-[420px] rounded-full bg-navy-soft/60 blur-[120px]" />

        <div className="relative w-full px-4 sm:px-8 lg:px-12 py-12 lg:py-16">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <Reveal className="lg:col-span-7">
              <nav aria-label="Breadcrumb" className="text-sm text-white/45 mb-6 flex flex-wrap gap-2">
                <Link to="/" className="hover:text-white">Home</Link>
                <span aria-hidden="true">/</span>
                <span className="text-white/70">Shop Hardware</span>
              </nav>
              <Eyebrow dark>Bloom Swift POS shop</Eyebrow>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-[1.08] tracking-tight">
                Shop the hardware <span className="text-brand-orange">you need.</span>
              </h1>
              <p className="mt-6 text-lg text-white/75 leading-relaxed max-w-xl">
                POS terminals, printers and accessories that work perfectly with Bloom Swift POS.
              </p>
              <Actions
                dark
                className="mt-8"
                actions={[
                  { label: 'Browse products', onClick: scrollToProducts },
                  { label: 'Talk to sales', onClick: openContactSales },
                ]}
              />
            </Reveal>

            <Reveal as="ul" delay={0.1} className="lg:col-span-5 grid sm:grid-cols-3 lg:grid-cols-1 gap-3 lg:gap-4">
              {TRUST_ITEMS.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className="flex items-center gap-4 rounded-xl bg-white/5 border border-white/10 p-4 lg:p-5 backdrop-blur-sm"
                >
                  <span className="w-12 h-12 flex-shrink-0 rounded-lg bg-brand-orange/15 flex items-center justify-center text-brand-orange">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-bold">{title}</span>
                    <span className="block text-sm text-white/60">{text}</span>
                  </span>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <div id="products" className="w-full px-4 sm:px-8 lg:px-12 py-8 lg:py-12 scroll-mt-24">
        <div>
          <div className="min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <label className="relative flex-1">
                <span className="sr-only">Search hardware</span>
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setParam('q', e.target.value, '')}
                  placeholder="Search printers, scanners, monitors..."
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-grey-light border border-transparent focus:bg-white focus:border-navy focus:outline-none text-navy placeholder:text-gray-400"
                />
              </label>
              <div ref={categoryMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setCategoriesOpen((open) => !open)}
                  aria-haspopup="listbox"
                  aria-expanded={categoriesOpen}
                  aria-controls="category-menu"
                  className={`w-full sm:w-auto h-12 px-4 rounded-xl inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap border transition-colors ${
                    categoriesOpen ? 'bg-navy border-navy text-white' : 'bg-grey-light border-transparent text-navy hover:border-navy'
                  }`}
                >
                  <SlidersHorizontal size={16} aria-hidden="true" />
                  {activeCategory === 'All' ? 'All categories' : activeCategory}
                  <ChevronDown
                    size={16}
                    aria-hidden="true"
                    className={`transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {categoriesOpen && (
                    <motion.div
                      id="category-menu"
                      role="listbox"
                      aria-label="Categories"
                      initial={reduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-30 mt-2 left-0 sm:left-auto sm:right-0 w-full sm:w-72 origin-top rounded-xl bg-white border border-border-grey shadow-[8px_8px_0_0_#101D36] p-2"
                    >
                      <p className="px-3 pt-2 pb-2 font-mono text-[11px] font-bold tracking-widest uppercase text-gray-400">
                        Categories
                      </p>
                      <div className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto">
                        {categoryButton('All', hardware.length)}
                        {categories.map((c) => categoryButton(c, categoryCounts[c]))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <label className="flex items-center gap-2">
                <span className="text-sm text-gray-500 whitespace-nowrap">Sort by</span>
                <select
                  value={sort}
                  onChange={(e) => setParam('sort', e.target.value, 'featured')}
                  className="h-12 px-3 rounded-xl bg-grey-light border border-transparent focus:bg-white focus:border-navy focus:outline-none text-navy font-semibold"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </label>
            </div>

            {/* Results summary */}
            {!loading && !error && (
              <div className="mt-6 mb-5 flex items-center justify-between gap-4">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-bold text-navy">{products.length}</span>{' '}
                  {products.length === 1 ? 'product' : 'products'}
                  {activeCategory !== 'All' && <> in <span className="font-bold text-navy">{activeCategory}</span></>}
                  {query && <> for “<span className="font-bold text-navy">{query}</span>”</>}
                </p>
                {(activeCategory !== 'All' || query) && (
                  <button
                    type="button"
                    onClick={() => setSearchParams({}, { replace: true })}
                    className="text-sm font-bold text-navy hover:text-brand-orange-dark whitespace-nowrap"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}

            {error && !loading && (
              <div className="mt-8 rounded-xl bg-red-50 text-red-700 p-6">
                <p className="font-bold">We couldn't load the shop right now.</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            )}

            <div className="grid gap-5 lg:gap-6 grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-6 lg:mt-0">
              {loading
                ? Array.from({ length: 8 }, (_, i) => <SkeletonCard key={i} />)
                : products.map((item) => (
                    <ProductCard
                      key={item.id}
                      item={item}
                      onQuickView={setSelected}
                      onAdd={handleAdd}
                      onRequestQuote={handleRequestQuote}
                    />
                  ))}
            </div>

            {!loading && !error && products.length === 0 && (
              <div className="text-center py-20">
                <PackageSearch size={48} className="mx-auto text-card-grey" aria-hidden="true" />
                <p className="mt-4 text-lg font-bold text-navy">
                  {hardware.length === 0 ? 'No hardware has been added yet' : 'No products match your search'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {hardware.length === 0 ? 'Please check back later.' : 'Try a different keyword or category.'}
                </p>
              </div>
            )}

            {/* Quote CTA */}
            {!loading && hardware.length > 0 && (
              <div className="mt-16 rounded-2xl bg-grey-light p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-navy">Need a full POS setup?</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Tell us about your business and we'll put together a hardware bundle and quote.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openContactSales}
                  className="h-12 px-6 rounded-xl bg-navy hover:bg-navy-mid text-white font-bold whitespace-nowrap transition-colors"
                >
                  Talk to sales
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProductModal
            key={selected.id}
            item={selected}
            onClose={() => setSelected(null)}
            onAdd={handleAdd}
            onBuyNow={handleBuyNow}
            onRequestQuote={handleRequestQuote}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hardware;
