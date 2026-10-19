import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Star, ShoppingBasket, UtensilsCrossed, Building2, Cloud, Package, BarChart3, Store, Headset,
  Shirt, Gift, Beer, Coffee, Wine, LayoutDashboard, Users, Rocket, Layers, Printer, LineChart, Activity, Phone, Mail, Globe,
} from 'lucide-react';
import { useUI } from '../context/UIContext';
import useRequestPos from '../hooks/useRequestPos';
import {
  Section, Eyebrow, H2, Body, Heading, MediaFrame, Reveal, PrimaryButton, TextLink, StatsStrip, Accordion, CtaBand, useAutoAdvance,
} from '../Components/kit';
import { offline, cloud, PRICING_PHONE, PRICING_PHONE_HREF } from '../data/pricing';

const faqData = [
  {
    question: "What is Bloom Swift POS?",
    answer: (
      <>
        <p className="mb-4">Bloom Swift POS is an integrated Electronic Point of Sale system that combines specialized hardware (like a touchscreen terminal) with intuitive software to streamline your business operations.</p>
        <p>While a traditional cash register simply logs transactions, Bloom Swift POS goes a step further. It captures every detail of your sales data and transforms it into comprehensive reports, giving you the insights needed to manage your business more efficiently.</p>
      </>
    )
  },
  {
    question: "Choosing the Ideal Bloom Swift POS System for your needs?",
    answer: (
      <>
        <p className="mb-4">The best Bloom Swift POS system is one that is specifically tailored to your industry and unique operational needs. Rather than a one-size-fits-all approach, the ideal setup provides the exact tools required to scale your business—such as customizable analytics, real-time inventory tracking, and seamless app integrations.</p>
        <p className="mb-4">For example, specialized configurations are available to meet the demands of different sectors:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Retail & Hospitality:</strong> Can include integrated scales, kitchen display systems (KDS), and handheld ordering devices.</li>
          <li><strong>Service Industries (like Nail Salons):</strong> Focuses on appointment scheduling and client management.</li>
          <li><strong>Hotel Dining:</strong> Features support for room service syncing and custom seating charts.</li>
        </ul>
      </>
    )
  },
  {
    question: "whats the power of Bloom Swift POS?",
    answer: (
      <>
        <p className="mb-4">More than just a tool for processing transactions, Bloom Swift POS serves as the central nervous system of your business. Unlike basic cash registers, it automates and integrates multiple core operations into one seamless interface:</p>
        <ul className="space-y-3">
          <li><strong>Inventory & Sales:</strong> Track stock levels in real-time and generate deep-dive sales reports.</li>
          <li><strong>Operational Control:</strong> Manage staff schedules and permissions with ease.</li>
          <li><strong>Customer Engagement:</strong> Use built-in CRM tools and barcoding to speed up service and build loyalty.</li>
          <li><strong>Unified Payments:</strong> Process transactions securely while syncing all data instantly to your backend.</li>
        </ul>
      </>
    )
  },
  {
    question: "How does Bloom Swift POS Operates?",
    answer: (
      <>
        <p className="mb-4">Bloom Swift POS works by integrating directly into your existing workflow, utilizing either a secure cloud-based internet connection or a dedicated local host. As you process transactions, the system automatically captures and organizes your data in real-time.</p>
        <p className="mb-3">By centralizing this information in a secure environment, Bloom Swift POS allows you to:</p>
        <ul className="space-y-3">
          <li><strong>Access Insights Instantly:</strong> Retrieve data from anywhere to generate detailed performance reports.</li>
          <li><strong>Enhance Customer Service:</strong> Use stored history to assist customers quickly and accurately.</li>
          <li><strong>Sync Operations:</strong> Ensure your front-end sales and back-end records are always perfectly aligned.</li>
        </ul>
      </>
    )
  },
  {
    question: "Bloom Swift POS Pricing",
    answer: (
      <>
        <p className="mb-4">The investment for a Bloom Swift POS system is flexible, as it is tailored to the specific scale and complexity of your business. Because every setup—from hardware configurations to specialized software modules—is unique, we provide customized pricing to ensure you only pay for the features you need.</p>
        <p>For a solution that includes custom app integrations or specific hardware bundles, please contact us directly for a personalized quote. Our team will help you build a package that aligns with your budget and growth goals.</p>
      </>
    )
  }
];

/* Hero selector: the site's main solutions */
const services = [
  {
    title: 'Retail',
    tag: 'All-in-one Retail POS',
    line: 'Streamline operations, automate inventory, and elevate your marketing to help your retail business thrive.',
    tools: ['Clothing store', 'Convenience and grocery stores', 'Gift shops and more!'],
    to: '/retail-pos',
    image: { src: '/images/clothing/boutique.webp', alt: 'Bright clothing boutique with garments on rails' },
  },
  {
    title: 'Hospitality',
    tag: 'POS made for an exceptional experience',
    line: 'Sync front and back of house, boost sales and integrate with delivery apps —all while accepting payments quickly.',
    tools: ['Pubs and Bars', 'Restaurants & fine dining', 'Cafe shops and more'],
    to: '/hospitality-pos',
    image: { src: '/images/restaurant/fine-dining.webp', alt: 'Guests sharing dinner at a restaurant table' },
  },
  {
    title: 'Enterprise',
    tag: 'Multisite POS Solution',
    line: 'Cloud Based or On Premise solution for complex business needs needing to operate multiple POS systems in one location or mutlitple locations',
    tools: ['Centralized platform', 'Staff and business management', '24/7 support'],
    image: { src: '/images/hotel/lobby.webp', alt: 'Large hotel lobby with a central reception area' },
  },
  {
    title: 'Cloud Based POS',
    tag: 'Cloud Based POS',
    line: 'Bring your company to the future',
    tools: ['Real-Time Access', 'Seamless Scalability', 'Secure Data Backups'],
    to: '/cloud-based-pos',
    image: { src: '/images/general/pos-stand-2.webp', alt: 'Customer paying at a tablet point of sale on a salon counter' },
  },
];

const HERO_MS = 6000;

const ServiceRow = ({ s, i, active, onActivate, onOpen, progressKey, reduce }) => (
  <li className="border-t border-white/10 last:border-b relative">
    <button
      type="button"
      onMouseEnter={() => onActivate(i)}
      onFocus={() => onActivate(i)}
      onClick={() => onOpen(i)}
      className="w-full flex items-baseline gap-5 py-3 xl:py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded"
    >
      <span className={`font-mono text-xs font-bold ${active ? 'text-brand-orange' : 'text-white/35'}`}>{String(i + 1).padStart(2, '0')}</span>
      <span className={`text-2xl sm:text-3xl xl:text-[2.1rem] font-extrabold tracking-tight transition-colors ${active ? 'text-white' : 'text-white/35 hover:text-white/70'}`}>{s.title}</span>
      <ArrowRight size={20} className={`ml-auto self-center text-brand-orange transition-all ${active ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} aria-hidden="true" />
    </button>
    {active && (
      <motion.span
        key={progressKey}
        className="absolute left-0 -bottom-px h-0.5 bg-brand-orange origin-left w-full"
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: reduce ? 0 : HERO_MS / 1000, ease: 'linear' }}
        aria-hidden="true"
      />
    )}
  </li>
);

const HeroCaption = ({ s, i, onOpen }) => (
  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10 bg-gradient-to-t from-navy-dark via-navy-dark/80 to-transparent pt-24">
    <span className="font-mono text-xs font-bold text-brand-orange tracking-widest">{String(i + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}</span>
    <h2 className="mt-2 text-2xl lg:text-3xl font-extrabold text-white">{s.title}</h2>
    <p className="mt-2 text-white/75 max-w-lg">{s.line}</p>
    <div className="mt-4 flex flex-wrap gap-2">
      {s.tools.map((t) => (
        <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-white/10 text-white/80">{t}</span>
      ))}
    </div>
    <TextLink dark onClick={() => onOpen(i)} className="mt-5">Explore this service</TextLink>
  </div>
);

const HeroPhoto = ({ index, reduce, onOpen, className = '' }) => {
  const s = services[index];
  return (
    <div className={`relative overflow-hidden bg-navy-dark ${className}`}>
      <AnimatePresence initial={false}>
        <motion.img
          key={s.image.src}
          src={s.image.src}
          alt={s.image.alt}
          className="absolute inset-0 w-full h-full object-cover"
          initial={reduce ? false : { opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: reduce ? 1 : 1.04 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.9 }, scale: { duration: 7, ease: 'linear' } }}
          fetchPriority={index === 0 ? 'high' : 'auto'}
        />
      </AnimatePresence>
      <HeroCaption s={s} i={index} onOpen={onOpen} />
    </div>
  );
};

/* Three pillars: a tiny pipeline that lights up step by step */
const pillars = [
  {
    ...services[0],
    icon: ShoppingBasket,
    photo: { src: '/images/clothing/shop.webp', alt: 'Retail shop interior with clothing displays and shelves' },
    flow: ['operations', 'inventory', 'marketing'],
    tiles: [Shirt, Store, Gift],
  },
  {
    ...services[1],
    icon: UtensilsCrossed,
    photo: { src: '/images/restaurant/dining-room.webp', alt: 'Restaurant dining room set with tables and chairs' },
    flow: ['Front of house', 'Back of house', 'Delivery apps', 'Payments'],
    tiles: [Beer, Wine, Coffee],
  },
  {
    ...services[2],
    icon: Building2,
    photo: { src: '/images/general/office-presentation.webp', alt: 'Team meeting in a bright open-plan office' },
    flow: ['Cloud Based', 'On Premise', 'multiple locations'],
    tiles: [LayoutDashboard, Users, Headset],
  },
];

const Pipeline = ({ steps }) => {
  const reduce = useReducedMotion();
  const [lit, setLit] = useState(reduce ? steps.length : 0);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (reduce || !inView) return undefined;
    const t = setInterval(() => setLit((l) => (l >= steps.length ? 0 : l + 1)), 900);
    return () => clearInterval(t);
  }, [reduce, inView, steps.length]);
  return (
    <motion.div onViewportEnter={() => setInView(true)} viewport={{ once: true }} className="flex items-center gap-1.5">
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          {i > 0 && <span className={`h-px flex-1 min-w-3 transition-colors duration-300 ${i < lit ? 'bg-brand-orange' : 'bg-white/15'}`} aria-hidden="true" />}
          <span className={`text-[11px] font-semibold px-2.5 py-1.5 rounded-md whitespace-nowrap transition-colors duration-300 ${i < lit ? 'bg-white text-navy' : 'bg-white/[0.06] text-white/50'}`}>{s}</span>
        </React.Fragment>
      ))}
    </motion.div>
  );
};

const allInOne = [
  { icon: Rocket, title: 'Rapid Deployment:', text: 'Get up and running immediately with intuitive onboarding that lets you train staff in minutes.' },
  { icon: Layers, title: 'Omnichannel Ready:', text: 'Seamlessly manage in-store sales, online orders, deliveries, and collections from a single interface.' },
  { icon: Printer, title: 'Hardware Flexibility:', text: 'Choose a standalone setup for small-scale deployments or a full hardware suite—including a high-speed printer, scanner, and secure cash drawer.' },
  { icon: LineChart, title: 'Comprehensive Insights:', text: 'Access your business data anytime, anywhere.' },
  { icon: Activity, title: 'Real-Time Analytics:', text: 'Monitor performance with live reporting on sales margins, stock levels, staff productivity, and customer trends.' },
];

const testimonials = [
  {
    name: 'Heaven Bakers (PVT) Ltd',
    quote: '"The new POS system has been a total game-changer, making our bakery\'s checkout process incredibly smooth and intuitive even during the morning rush. The installation was seamless, and the streamlined interface allows our team to focus more on our customers and less on the screen."',
    note: 'Best Customer Service, amazing response',
  },
  {
    name: 'Weerasingha Hardware',
    quote: '"The new POS system has completely transformed how we manage our heavy foot traffic and complex inventory. It handles bulk hardware scanning and special orders with ease, making our daily operations significantly more efficient."',
    note: 'Amazing Software exactly what we needed',
  },
  {
    name: 'Disna Fashion House',
    quote: '"The new POS system has elevated our boutique\'s shopping experience, making everything from size exchanges to style lookups effortless for our staff. Its sleek interface fits perfectly with our store\'s aesthetic while providing the robust reporting we need to stay on top of seasonal trends."',
    note: 'The report system increased our profits by 40% and lower our losses by 30%',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const requestPos = useRequestPos();
  const { setIsContactSalesOpen } = useUI();
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useAutoAdvance(services.length, HERO_MS, paused);

  const openService = (i) => {
    const s = services[i];
    if (s.to) navigate(s.to);
    else setIsContactSalesOpen(true);
  };

  return (
    <div>
      {/* Hero: editorial service selector */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="lg:grid lg:grid-cols-2 lg:min-h-[calc(100vh-5rem)] lg:max-h-[900px]">
          <div className="px-4 sm:px-8 lg:px-12 pt-14 pb-10 lg:py-12 xl:py-14 flex flex-col justify-center">
            <Reveal>
              <Eyebrow dark>Bloom Swift POS</Eyebrow>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-[1.08] tracking-tight">
                The Complete <span className="block text-brand-orange">Bloom Swift POS Solution</span>
              </h1>
              <p className="mt-6 text-lg text-white/75 leading-relaxed max-w-xl">
                Simplify your sales, track your stock, and grow your business faster.
                Get everything you need to sell faster, serve better, and grow stronger with our all-in-one Bloom Swift POS solution.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <PrimaryButton onClick={() => requestPos()}>Get Started</PrimaryButton>
                <TextLink dark onClick={() => setIsContactSalesOpen(true)}>Contact Sales</TextLink>
              </div>
            </Reveal>

            {/* Mobile photo */}
            <HeroPhoto index={active} reduce={reduce} onOpen={openService} className="lg:hidden mt-10 -mx-4 sm:-mx-8 aspect-[4/5] sm:aspect-[16/11]" />

            <div className="mt-10 lg:mt-10" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
              <p className="font-mono text-[11px] font-bold tracking-widest uppercase text-white/45 mb-2">Solutions</p>
              <ul>
                {services.map((s, i) => (
                  <ServiceRow key={s.title} s={s} i={i} active={i === active} onActivate={setActive} onOpen={openService} progressKey={`${active}-${paused}`} reduce={reduce || paused} />
                ))}
              </ul>
            </div>
          </div>

          {/* Desktop photo, full bleed */}
          <HeroPhoto index={active} reduce={reduce} onOpen={openService} className="hidden lg:block min-h-full" />
        </div>
      </section>

      {/* Keyword strip */}
      <section className="bg-white border-b border-border-grey">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <StatsStrip
            items={[
              { icon: Package, label: 'Inventory Management' },
              { icon: BarChart3, label: 'Real-time Analytics' },
              { icon: Store, label: 'Multi-store Support' },
              { icon: Headset, label: '24/7 Support' },
            ]}
          />
        </div>
      </section>

      {/* Three pillars */}
      <Section bg="dark">
        <Heading center dark eyebrow="Solutions" title="Retail, Hospitality & Enterprise" className="mb-14" />
        <div className="grid lg:grid-cols-3 lg:grid-rows-[auto_auto_auto_1fr_auto_auto] gap-y-0">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal
                key={p.title}
                delay={i * 0.1}
                className={`group/col grid lg:grid-rows-subgrid lg:row-span-6 gap-5 py-10 lg:py-0 lg:px-8 xl:px-10 ${i > 0 ? 'border-t lg:border-t-0 lg:border-l border-white/10' : 'lg:pl-0'} ${i === pillars.length - 1 ? 'lg:pr-0' : ''}`}
              >
                <div className="group relative h-52 rounded-xl overflow-hidden">
                  <img src={p.photo.src} alt={p.photo.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                  <span className="absolute left-0 bottom-0 w-16 h-1 bg-brand-orange" />
                </div>
                <div className="flex items-center gap-3">
                  <Icon size={26} strokeWidth={1.5} className="text-white" aria-hidden="true" />
                  <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-white/45">{p.tag}</span>
                </div>
                <h3 className="text-3xl font-extrabold text-white">{p.title}</h3>
                <p className="text-white/70 leading-relaxed">{p.line}</p>
                <div className="bg-white/[0.03] rounded-xl p-5 overflow-x-auto">
                  <Pipeline steps={p.flow} />
                </div>
                <ul className="grid grid-cols-2 gap-2">
                  {p.tools.map((t, ti) => {
                    const TIcon = p.tiles[ti];
                    return (
                      <li key={t} className={`group flex items-center gap-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] transition-colors p-2.5 ${ti === 2 ? 'col-span-2' : ''}`}>
                        <span className="w-8 h-8 rounded-md bg-white/10 text-white group-hover:bg-white group-hover:text-navy inline-flex items-center justify-center shrink-0 transition-colors">
                          <TIcon size={16} strokeWidth={1.75} aria-hidden="true" />
                        </span>
                        <span className="text-sm font-semibold text-white/85">{t}</span>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* The Complete All-in-One Solution */}
      <Section bg="white">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-0">
          <div className="lg:col-span-5 lg:pr-14">
            <Reveal>
              <Eyebrow>Why Bloom Swift POS</Eyebrow>
              <H2>The Complete All-in-One Solution</H2>
              <Body className="mt-6 max-w-xl">
                <p>Bloom Swift POS is designed to be the only tool you need to scale your business, increase profitability, and stay ahead of the curve. Our platform provides a future-proof foundation that adapts as your business evolves.</p>
              </Body>
            </Reveal>
            <MediaFrame className="mt-10" src="/images/general/touchscreen-till.webp" alt="Cashier using a touchscreen till at a shop counter" />
          </div>
          <div className="lg:col-span-7 lg:pl-14 lg:border-l border-gray-200">
            <ol>
              {allInOne.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal as="li" key={item.title} delay={i * 0.06} className="group grid grid-cols-[auto_1fr] sm:grid-cols-[3rem_1fr_auto] gap-x-5 gap-y-2 py-7 border-b border-gray-200 first:pt-0 lg:first:pt-2">
                    <span className="font-mono text-sm font-bold text-brand-orange pt-1">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="text-xl font-extrabold text-navy">{item.title}</h3>
                      <p className="mt-2 text-gray-600 leading-relaxed max-w-xl">{item.text}</p>
                    </div>
                    <span className="hidden sm:inline-flex w-11 h-11 rounded-lg bg-grey-light text-navy-mid group-hover:bg-navy group-hover:text-white items-center justify-center transition-colors">
                      <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>
      </Section>

      {/* Support Without Compromise */}
      <Section bg="grey">
        <Heading
          eyebrow="Support"
          title="Support Without Compromise"
          imageLeft
          image={{ src: '/images/general/pos-terminal.webp', alt: 'Touchscreen POS terminal with receipt printer on a counter' }}
        >
          <p>We are committed to your success with round-the-clock technical support and a dedicated partnership model. From your first day, you'll receive personalized, one-on-one onboarding to ensure your system is configured perfectly for your workflow.</p>
          <p>Our commitment doesn't end after setup; we offer unlimited training and coaching to help you and your team master every feature and maximize your business potential.</p>
        </Heading>
      </Section>

      {/* Pricing preview */}
      <Section bg="white">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Pricing</Eyebrow>
            <H2>{offline.headline[0]} <span className="text-brand-orange-dark">{offline.headline[1]}</span></H2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-lg text-gray-700 leading-relaxed">{offline.intro}</p>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <Reveal className="group rounded-xl bg-grey-light p-8 shadow-[5px_5px_0_0_#D5DAE3] hover:bg-white hover:shadow-[8px_8px_0_0_#101D36] hover:-translate-x-1 hover:-translate-y-1 transition-all">
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-brand-orange">01 · Offline desktop</span>
            <p className="mt-3 text-gray-600">{offline.edition}</p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
              {offline.plans.filter((p) => p.price).map((p) => (
                <div key={p.name}>
                  <div className="text-sm font-bold text-navy-soft">{p.name}</div>
                  <div className="text-3xl font-extrabold text-navy"><span className="text-base font-bold text-gray-500 mr-1">Rs.</span>{p.price}</div>
                  <div className="text-xs text-gray-500">{p.unit}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08} className="group rounded-xl bg-grey-light p-8 shadow-[5px_5px_0_0_#D5DAE3] hover:bg-white hover:shadow-[8px_8px_0_0_#101D36] hover:-translate-x-1 hover:-translate-y-1 transition-all">
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-brand-orange">02 · Cloud</span>
            <p className="mt-3 text-gray-600">{cloud.intro}</p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
              {cloud.plans.map((p) => (
                <div key={p.name}>
                  <div className="text-sm font-bold text-navy-soft">{p.name}</div>
                  <div className="text-3xl font-extrabold text-navy">{p.price}</div>
                  <div className="text-xs text-gray-500">{p.unit}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-10">
          <PrimaryButton to="/pricing">See all packages</PrimaryButton>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section bg="grey">
        <div className="grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>FAQ</Eyebrow>
            <H2>Have More Questions?</H2>
            <Body className="mt-6 max-w-xl">
              <p>If you're looking for more details on how Bloom Swift POS can transform your operations, we're here to help. You can explore our Frequently Asked Questions for quick answers or request a callback to speak with one of our specialists.</p>
            </Body>
            <TextLink onClick={() => setIsContactSalesOpen(true)} className="mt-8">Contact Sales</TextLink>
          </Reveal>
          <div className="lg:col-span-7">
            <Accordion items={faqData} />
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section bg="white">
        <Heading
          center
          eyebrow="Customers"
          title="What Our Customers Say"
          sub="Don't just take our word for it—hear from businesses that have transformed their operations with Bloom Swift POS."
          className="mb-14"
        />
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="h-full">
              <figure className="group h-full flex flex-col rounded-xl p-7 bg-grey-light shadow-[5px_5px_0_0_#D5DAE3] hover:bg-white hover:shadow-[8px_8px_0_0_#101D36] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, s) => <Star key={s} size={16} className="text-navy fill-navy" aria-hidden="true" />)}
                  <span className="ml-auto font-mono text-xs font-bold text-brand-orange">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <blockquote className="mt-5 text-gray-700 leading-relaxed flex-grow">{t.quote}</blockquote>
                <figcaption className="mt-6 pt-5 border-t border-gray-200">
                  <h3 className="text-lg font-extrabold text-navy">{t.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-navy-soft">{t.note}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Contact CTA */}
      <CtaBand
        eyebrow="Get started"
        title={offline.cta}
        text={<p>{offline.intro}</p>}
        actions={[
          { label: 'Get Started', onClick: () => requestPos() },
          { label: 'Contact Sales', onClick: () => setIsContactSalesOpen(true) },
        ]}
        rows={[
          { icon: Phone, label: 'Phone', value: PRICING_PHONE, href: PRICING_PHONE_HREF },
          { icon: Mail, label: 'Email', value: 'info@bloomswiftpos.com', href: 'mailto:info@bloomswiftpos.com' },
          { icon: Globe, label: 'Web', value: 'www.bloomswiftPOS.com', href: 'https://bloomswiftpos.com' },
        ]}
      />
    </div>
  );
};

export default Home;
