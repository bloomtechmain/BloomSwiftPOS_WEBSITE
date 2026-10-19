import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Motion helpers                                                      */
/* ------------------------------------------------------------------ */

export const Reveal = ({ children, delay = 0, className = '', as = 'div', ...rest }) => {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
};

const Mono = ({ children, className = '' }) => (
  <span className={`font-mono text-xs font-bold tracking-widest uppercase ${className}`}>{children}</span>
);

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

const sectionBg = {
  white: 'bg-white',
  grey: 'bg-grey-light',
  dark: 'bg-navy-dark text-white',
  navy: 'bg-navy text-white',
};

export const Section = ({ bg = 'white', id, className = '', innerClassName = '', children }) => (
  <section id={id} className={`${sectionBg[bg] || bg} py-20 lg:py-24 ${className}`}>
    <div className={`w-full px-4 sm:px-8 lg:px-12 ${innerClassName}`}>{children}</div>
  </section>
);

export const Eyebrow = ({ children, center = false, dark = false, className = '' }) => {
  const color = dark ? 'text-brand-orange' : 'text-brand-orange-dark';
  const rule = dark ? 'bg-brand-orange' : 'bg-brand-orange-dark';
  return (
    <p className={`${color} font-bold tracking-widest text-sm uppercase mb-4 flex items-center gap-2 ${center ? 'justify-center' : ''} ${className}`}>
      <span className={`w-6 h-px ${rule}`} />
      {children}
      {center && <span className={`w-6 h-px ${rule}`} />}
    </p>
  );
};

export const H2 = ({ children, dark = false, className = '' }) => (
  <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight ${dark ? 'text-white' : 'text-navy'} ${className}`}>
    {children}
  </h2>
);

export const Body = ({ children, dark = false, className = '' }) => (
  <div className={`text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-gray-700'} space-y-5 ${className}`}>{children}</div>
);

export const Heading = ({ eyebrow, title, sub, children, image, imageLeft = false, center = false, dark = false, className = '' }) => {
  const text = (
    <Reveal className={center ? 'text-center mx-auto max-w-3xl' : ''}>
      {eyebrow && <Eyebrow center={center} dark={dark}>{eyebrow}</Eyebrow>}
      <H2 dark={dark}>{title}</H2>
      {sub && <p className={`text-lg mt-4 ${dark ? 'text-white/60' : 'text-gray-600'} ${center ? 'mx-auto' : ''} max-w-3xl`}>{sub}</p>}
      {children && <Body dark={dark} className={`mt-6 ${center ? 'mx-auto' : ''} max-w-3xl`}>{children}</Body>}
    </Reveal>
  );
  if (!image) return <div className={className}>{text}</div>;
  return (
    <div className={`grid lg:grid-cols-12 gap-12 lg:gap-16 items-center ${className}`}>
      <div className={`lg:col-span-6 ${imageLeft ? 'lg:order-2' : ''}`}>{text}</div>
      <div className={`lg:col-span-6 ${imageLeft ? 'lg:order-1' : ''}`}>
        <MediaFrame {...image} />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Photos                                                              */
/* ------------------------------------------------------------------ */

const OrangeBar = ({ className = '' }) => <span className={`absolute left-0 bottom-0 w-16 h-1 bg-brand-orange ${className}`} />;

export const MediaFrame = ({ src, alt, aspect = 'aspect-[4/3]', className = '', priority = false }) => (
  <Reveal className={`relative group pr-4 pb-4 ${className}`}>
    <div className="absolute top-4 left-4 right-0 bottom-0 rounded-2xl bg-navy" aria-hidden="true" />
    <div className={`relative rounded-2xl overflow-hidden bg-grey-light ${aspect}`}>
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
      <OrangeBar />
    </div>
  </Reveal>
);

export const PhotoBand = ({ src, alt }) => {
  const reduce = useReducedMotion();
  return (
    <div className="relative w-full overflow-hidden h-[260px] sm:h-[360px] lg:h-[440px] bg-navy">
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        initial={reduce ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-navy/10 to-transparent" />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

const ActionBase = ({ to, href, onClick, className, children, ...rest }) => {
  if (to) return <Link to={to} className={className} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={className} {...rest}>{children}</a>;
  return <button type="button" onClick={onClick} className={className} {...rest}>{children}</button>;
};

export const PrimaryButton = ({ children, className = '', ...rest }) => (
  <ActionBase
    {...rest}
    className={`group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-bold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-orange ${className}`}
  >
    {children}
    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
  </ActionBase>
);

export const TextLink = ({ children, dark = false, className = '', ...rest }) => (
  <ActionBase
    {...rest}
    className={`group inline-flex items-center gap-2 font-bold whitespace-nowrap ${dark ? 'text-white hover:text-white/80' : 'text-navy hover:text-navy-soft'} transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded ${className}`}
  >
    {children}
    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
  </ActionBase>
);

export const Actions = ({ actions = [], dark = false, className = '' }) => (
  <div className={`flex flex-wrap items-center gap-x-8 gap-y-4 ${className}`}>
    {actions.map((a, i) =>
      a.primary !== false && i === 0 ? (
        <PrimaryButton key={i} to={a.to} href={a.href} onClick={a.onClick}>{a.label}</PrimaryButton>
      ) : (
        <TextLink key={i} dark={dark} to={a.to} href={a.href} onClick={a.onClick}>{a.label}</TextLink>
      )
    )}
  </div>
);

/* ------------------------------------------------------------------ */
/* Page hero (split)                                                   */
/* ------------------------------------------------------------------ */

export const PageHero = ({ breadcrumb, eyebrow, title, text, actions = [], image, children }) => (
  <section className="relative bg-navy text-white overflow-hidden">
    {image && (
      <div className="hidden lg:block absolute inset-y-0 right-0 w-1/2">
        <img src={image.src} alt={image.alt} className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" />
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-navy to-transparent" />
      </div>
    )}
    <div className="relative w-full px-4 sm:px-8 lg:px-12 py-16 lg:py-24 lg:min-h-[640px] flex items-center">
      <div className="w-full lg:w-1/2 lg:pr-12">
        <Reveal>
          {breadcrumb && (
            <nav aria-label="Breadcrumb" className="text-sm text-white/45 mb-6 flex flex-wrap gap-2">
              {breadcrumb.map((b, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {b.to ? <Link to={b.to} className="hover:text-white">{b.label}</Link> : <span className="text-white/70">{b.label}</span>}
                </span>
              ))}
            </nav>
          )}
          {eyebrow && <Eyebrow dark>{eyebrow}</Eyebrow>}
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-[1.08] tracking-tight">{title}</h1>
          {text && <div className="mt-6 text-lg text-white/75 leading-relaxed max-w-xl space-y-4">{text}</div>}
          {actions.length > 0 && <Actions actions={actions} dark className="mt-10" />}
          {children}
        </Reveal>
      </div>
    </div>
    {image && (
      <div className="lg:hidden relative aspect-[4/3] w-full">
        <img src={image.src} alt={image.alt} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-navy to-transparent" />
      </div>
    )}
  </section>
);

/* ------------------------------------------------------------------ */
/* Block cards                                                         */
/* ------------------------------------------------------------------ */

const gridCols = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
};

export const IconChip = ({ icon: Icon, dark = false, size = 'w-10 h-10', className = '' }) => (
  <span
    className={`${size} rounded-lg inline-flex items-center justify-center shrink-0 transition-colors ${
      dark ? 'bg-white/10 text-white group-hover:bg-white group-hover:text-navy' : 'bg-white text-navy-mid group-hover:bg-navy group-hover:text-white'
    } ${className}`}
  >
    {Icon && <Icon size={20} strokeWidth={1.75} aria-hidden="true" />}
  </span>
);

export const PointList = ({ points = [], dark = false, className = '' }) => (
  <ul className={`space-y-3 ${className}`}>
    {points.map((p, i) => (
      <li key={i} className="flex gap-3">
        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" aria-hidden="true" />
        <span className={dark ? 'text-white/70' : 'text-gray-700'}>
          {p.label && <strong className={dark ? 'text-white' : 'text-navy'}>{p.label} </strong>}
          {p.text}
        </span>
      </li>
    ))}
  </ul>
);

export const BlockCard = ({ icon, num, tag, title, sub, desc, points, chips, image, dark = false, children }) => (
  <div
    className={`group h-full flex flex-col rounded-xl overflow-hidden transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 ${
      dark
        ? 'bg-white/[0.05] shadow-[5px_5px_0_0_rgba(255,255,255,0.06)] hover:bg-white/[0.08] hover:shadow-[8px_8px_0_0_rgba(255,255,255,0.14)]'
        : 'bg-grey-light shadow-[5px_5px_0_0_#D5DAE3] hover:bg-white hover:shadow-[8px_8px_0_0_#101D36]'
    }`}
  >
    {image && (
      <div className="relative h-48 lg:h-56 overflow-hidden">
        <img src={image.src} alt={image.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
        <OrangeBar />
      </div>
    )}
    <div className="p-7 flex-1 flex flex-col">
      {(icon || num || tag) && (
        <div className="flex items-center gap-3 mb-5">
          {icon && <IconChip icon={icon} dark={dark} />}
          {num && <Mono className="text-brand-orange">{num}</Mono>}
          {tag && (
            <span className={`ml-auto text-[11px] font-semibold px-2.5 py-1 rounded-md ${dark ? 'bg-white/10 text-white/80' : 'bg-white text-gray-600'}`}>{tag}</span>
          )}
        </div>
      )}
      <h3 className={`text-xl font-extrabold ${dark ? 'text-white' : 'text-navy'}`}>{title}</h3>
      {sub && <p className={`mt-1 text-sm ${dark ? 'text-white/50' : 'text-gray-500'}`}>{sub}</p>}
      {desc && <div className={`mt-3 leading-relaxed ${dark ? 'text-white/70' : 'text-gray-700'}`}>{desc}</div>}
      {points && points.length > 0 && <PointList points={points} dark={dark} className="mt-5" />}
      {chips && chips.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span key={c} className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${dark ? 'bg-white/10 text-white/70' : 'bg-white text-gray-600'}`}>{c}</span>
          ))}
        </div>
      )}
      {children}
    </div>
  </div>
);

export const BlockGrid = ({ items = [], cols = 3, dark = false, numbered = true, className = '' }) => (
  <div className={`grid grid-cols-1 ${gridCols[cols]} gap-6 lg:gap-8 ${className}`}>
    {items.map((item, i) => (
      <Reveal key={i} delay={Math.min(i, 6) * 0.06} className="h-full">
        <BlockCard num={numbered ? String(i + 1).padStart(2, '0') : undefined} dark={dark} {...item} />
      </Reveal>
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/* Explorer (list → detail)                                            */
/* ------------------------------------------------------------------ */

export const Explorer = ({ items = [] }) => {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const item = items[active] || items[0];
  if (!item) return null;
  const Icon = item.icon;
  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <div className="lg:col-span-5 flex flex-col gap-3" role="tablist" aria-orientation="vertical">
        {items.map((it, i) => {
          const on = i === active;
          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={on}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`text-left rounded-xl px-5 py-4 flex items-center gap-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                on ? 'bg-navy text-white' : 'bg-grey-light text-navy hover:bg-grey-hover'
              }`}
            >
              <Mono className={on ? 'text-brand-orange' : 'text-gray-400'}>{String(i + 1).padStart(2, '0')}</Mono>
              <span className="font-bold flex-1">{it.title}</span>
              <ArrowRight size={18} className={`text-brand-orange transition-all duration-200 ${on ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} aria-hidden="true" />
            </button>
          );
        })}
      </div>
      <div className="lg:col-span-7 lg:sticky lg:top-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl bg-white p-8 lg:p-10 shadow-[8px_8px_0_0_#101D36]"
            role="tabpanel"
          >
            {Icon && (
              <span className="w-12 h-12 rounded-xl bg-navy text-white inline-flex items-center justify-center mb-6">
                <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
              </span>
            )}
            <h3 className="text-2xl lg:text-3xl font-extrabold text-navy">{item.title}</h3>
            {item.sub && <p className="mt-2 text-gray-500">{item.sub}</p>}
            {item.desc && <div className="mt-4 text-lg text-gray-700 leading-relaxed space-y-4">{item.desc}</div>}
            {item.points && item.points.length > 0 && (
              <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                {item.points.map((p, i) => (
                  <li key={i} className="flex gap-3 rounded-lg bg-grey-light p-4 text-gray-700">
                    <Check size={18} className="text-navy mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      {p.label && <strong className="text-navy">{p.label} </strong>}
                      {p.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {item.chips && (
              <div className="mt-6 flex flex-wrap gap-2">
                {item.chips.map((c) => (
                  <span key={c} className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-grey-light text-gray-600">{c}</span>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Ruled table                                                         */
/* ------------------------------------------------------------------ */

export const StackTable = ({ header, rows = [] }) => (
  <div className="border-t border-gray-200">
    {header && (
      <div className="hidden sm:grid grid-cols-[1fr_2fr] py-3 border-b border-gray-200">
        {header.map((h) => <Mono key={h} className="text-gray-400">{h}</Mono>)}
      </div>
    )}
    {rows.map((r, i) => (
      <Reveal key={i} delay={Math.min(i, 8) * 0.04} className="group grid sm:grid-cols-[1fr_2fr] gap-2 sm:gap-8 py-5 border-b border-gray-200 hover:bg-grey-light transition-colors sm:px-3">
        <div className="flex items-center gap-3">
          {r.icon && <IconChip icon={r.icon} className="!bg-grey-light group-hover:!bg-navy" />}
          <span className="font-bold text-navy">{r.label}</span>
        </div>
        <div className="text-gray-600 leading-relaxed">{r.value}</div>
      </Reveal>
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/* Stats / keyword strip                                               */
/* ------------------------------------------------------------------ */

export const StatsStrip = ({ items = [], dark = false }) => (
  <div className={`grid grid-cols-2 lg:grid-cols-4 ${dark ? 'divide-white/10' : 'divide-gray-200'}`}>
    {items.map((it, i) => {
      const Icon = it.icon;
      return (
        <Reveal
          key={i}
          delay={i * 0.06}
          className={`py-6 px-5 lg:px-8 ${i % 2 === 0 ? 'pl-0 lg:pl-8' : 'border-l'} ${i === 0 ? 'lg:!pl-0' : 'lg:border-l'} ${i >= 2 ? 'border-t lg:border-t-0' : ''} ${
            dark ? 'border-white/10' : 'border-gray-200'
          }`}
        >
          {it.value && <div className={`text-3xl md:text-4xl font-extrabold ${dark ? 'text-white' : 'text-navy'}`}>{it.value}</div>}
          {Icon && !it.value && <Icon size={26} strokeWidth={1.75} className={dark ? 'text-white' : 'text-navy'} aria-hidden="true" />}
          <div className={`mt-2 ${it.value ? 'text-sm' : 'text-base font-bold'} ${dark ? 'text-white/60' : it.value ? 'text-gray-500' : 'text-navy'}`}>{it.label}</div>
        </Reveal>
      );
    })}
  </div>
);

/* ------------------------------------------------------------------ */
/* FlowChart (process)                                                 */
/* ------------------------------------------------------------------ */

const FlowCard = ({ step, i, hover, setHover }) => (
  <div
    onMouseEnter={() => setHover(i)}
    onMouseLeave={() => setHover(null)}
    className={`rounded-xl p-5 bg-white transition-all duration-200 ${
      hover === i ? '-translate-y-1 shadow-[6px_6px_0_0_#101D36]' : 'shadow-[4px_4px_0_0_#D5DAE3]'
    }`}
  >
    <Mono className="text-brand-orange">{String(i + 1).padStart(2, '0')}</Mono>
    <h3 className="mt-2 font-extrabold text-navy">{step.title}</h3>
    {step.desc && <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{step.desc}</p>}
  </div>
);

const FlowNode = ({ step, i, hover, setHover, reduce }) => {
  const Icon = step.icon;
  return (
    <motion.span
      initial={reduce ? false : { scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 + i * 0.12 }}
      onMouseEnter={() => setHover(i)}
      onMouseLeave={() => setHover(null)}
      className={`relative z-10 w-14 h-14 rounded-full inline-flex items-center justify-center transition-colors shadow-[0_0_0_6px_#F5F6F8] ${
        hover === i ? 'bg-navy text-white' : 'bg-white text-navy'
      }`}
    >
      {Icon && <Icon size={22} strokeWidth={1.75} aria-hidden="true" />}
    </motion.span>
  );
};

export const FlowChart = ({ steps = [] }) => {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(null);
  const n = steps.length;
  const edge = `${50 / n}%`;
  return (
    <>
      {/* Desktop zigzag */}
      <div className="hidden lg:grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`, gridTemplateRows: 'auto auto auto' }}>
        {steps.map((s, i) => (
          <div key={`t${i}`} className="px-2 flex flex-col justify-end" style={{ gridColumn: i + 1, gridRow: 1 }}>
            {i % 2 === 0 && (
              <>
                <Reveal delay={0.1 + i * 0.1}><FlowCard step={s} i={i} hover={hover} setHover={setHover} /></Reveal>
                <span className="mx-auto w-px h-8 bg-gray-300" aria-hidden="true" />
              </>
            )}
          </div>
        ))}
        <div className="relative flex items-center" style={{ gridColumn: `1 / span ${n}`, gridRow: 2 }}>
          <span className="absolute h-0.5 bg-gray-300" style={{ left: edge, right: edge }} aria-hidden="true" />
          <motion.span
            className="absolute h-0.5 bg-navy origin-left"
            style={{ left: edge, right: edge }}
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          {!reduce && (
            <span className="absolute h-0.5" style={{ left: edge, right: edge }} aria-hidden="true">
              <motion.span
                className="absolute -top-[4px] -ml-[5px] w-2.5 h-2.5 rounded-full bg-brand-orange"
                animate={{ left: ['0%', '100%'] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'linear', delay: 1.4 }}
              />
            </span>
          )}
          <div className="relative grid w-full" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
            {steps.map((s, i) => (
              <div key={`n${i}`} className="flex justify-center">
                <FlowNode step={s} i={i} hover={hover} setHover={setHover} reduce={reduce} />
              </div>
            ))}
          </div>
        </div>
        {steps.map((s, i) => (
          <div key={`b${i}`} className="px-2 flex flex-col" style={{ gridColumn: i + 1, gridRow: 3 }}>
            {i % 2 === 1 && (
              <>
                <span className="mx-auto w-px h-8 bg-gray-300" aria-hidden="true" />
                <Reveal delay={0.1 + i * 0.1}><FlowCard step={s} i={i} hover={hover} setHover={setHover} /></Reveal>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Mobile timeline */}
      <div className="lg:hidden relative pl-20">
        <span className="absolute left-7 top-7 bottom-7 w-0.5 bg-gray-300" aria-hidden="true" />
        <motion.span
          className="absolute left-7 top-7 bottom-7 w-0.5 bg-navy origin-top"
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          aria-hidden="true"
        />
        <div className="space-y-6">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-20 top-0">
                <FlowNode step={s} i={i} hover={hover} setHover={setHover} reduce={reduce} />
              </span>
              <Reveal><FlowCard step={s} i={i} hover={hover} setHover={setHover} /></Reveal>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

/* ------------------------------------------------------------------ */
/* Feature band (navy, with badge)                                     */
/* ------------------------------------------------------------------ */

export const FeatureBand = ({ eyebrow, title, sub, text, points = [], badge, image }) => (
  <Section bg="navy">
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
      <div className={badge || image ? 'lg:col-span-8' : 'lg:col-span-12'}>
        <Reveal>
          {eyebrow && <Eyebrow dark>{eyebrow}</Eyebrow>}
          <H2 dark>{title}</H2>
          {sub && <p className="text-lg mt-4 text-white/60 max-w-3xl">{sub}</p>}
          {text && <Body dark className="mt-6 max-w-3xl">{text}</Body>}
        </Reveal>
        {points.length > 0 && (
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {points.map((p, i) => (
              <Reveal key={i} delay={i * 0.06} className="group bg-white/[0.05] hover:bg-white/[0.08] transition-colors rounded-xl p-5 flex gap-4">
                <IconChip icon={p.icon} dark />
                <div>
                  <h3 className="font-bold text-white">{p.title}</h3>
                  {p.text && <p className="mt-1 text-sm text-white/60 leading-relaxed">{p.text}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
      {badge && (
        <Reveal delay={0.15} className="lg:col-span-4">
          <div className="bg-white/[0.05] rounded-2xl p-10 text-center">
            <Mono className="text-white/50">{badge.label}</Mono>
            <div className="mt-4 text-5xl font-extrabold text-white leading-none">{badge.word}</div>
            {badge.caption && <p className="mt-4 text-white/60">{badge.caption}</p>}
            <span className="mt-6 mx-auto block w-12 h-1 bg-brand-orange" aria-hidden="true" />
          </div>
        </Reveal>
      )}
      {!badge && image && (
        <div className="lg:col-span-4"><MediaFrame {...image} aspect="aspect-[4/5]" /></div>
      )}
    </div>
  </Section>
);

/* ------------------------------------------------------------------ */
/* Benefits panel                                                      */
/* ------------------------------------------------------------------ */

export const BenefitsPanel = ({ title, items = [], footerLabel, action }) => (
  <Reveal className="rounded-2xl bg-navy text-white p-7">
    {title && <h3 className="text-lg font-extrabold mb-5">{title}</h3>}
    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-0.5 w-6 h-6 rounded-full bg-white text-navy inline-flex items-center justify-center shrink-0">
            <Check size={14} strokeWidth={3} aria-hidden="true" />
          </span>
          <span className="text-white/75 text-sm leading-relaxed">
            {it.label && <strong className="block text-white text-base">{it.label}</strong>}
            {it.text}
          </span>
        </li>
      ))}
    </ul>
    {action && (
      <div className="mt-7 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        {footerLabel && <Mono className="text-white/50">{footerLabel}</Mono>}
        <PrimaryButton to={action.to} href={action.href} onClick={action.onClick} className="!px-6 !py-3">{action.label}</PrimaryButton>
      </div>
    )}
  </Reveal>
);

/* ------------------------------------------------------------------ */
/* Closing CTA band                                                    */
/* ------------------------------------------------------------------ */

export const CONTACT = {
  phone: '+94 077 026 2675',
  phoneHref: 'tel:0770262675',
  email: 'info@bloomswiftpos.com',
  emailHref: 'mailto:info@bloomswiftpos.com',
};

export const CtaBand = ({ eyebrow, title, text, actions = [], cardTitle, cardText, rows }) => {
  const contactRows = rows || [
    { icon: Phone, label: 'Phone', value: CONTACT.phone, href: CONTACT.phoneHref },
    { icon: Mail, label: 'Email', value: CONTACT.email, href: CONTACT.emailHref },
  ];
  return (
    <Section bg="navy">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <Reveal className="lg:col-span-7">
          {eyebrow && <Eyebrow dark>{eyebrow}</Eyebrow>}
          <H2 dark>{title}</H2>
          {text && <Body dark className="mt-6 max-w-xl">{text}</Body>}
          {actions.length > 0 && <Actions actions={actions} dark className="mt-10" />}
        </Reveal>
        <Reveal delay={0.15} className="lg:col-span-5">
          {cardTitle && <h3 className="text-lg font-extrabold">{cardTitle}</h3>}
          {cardText && <p className="mt-1 text-white/60">{cardText}</p>}
          <div className={`${cardTitle || cardText ? 'mt-6' : ''} border-t border-white/10`}>
            {contactRows.map((r, i) => {
              const Icon = r.icon || MapPin;
              const inner = (
                <>
                  <span className="w-11 h-11 rounded-full bg-white/10 inline-flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-navy transition-colors">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <Mono className="block text-white/45 text-[11px]">{r.label}</Mono>
                    <span className="block font-bold mt-0.5 break-all">{r.value}</span>
                  </span>
                </>
              );
              return r.href ? (
                <a key={i} href={r.href} className="group flex items-center gap-4 py-5 border-b border-white/10 hover:bg-white/[0.03] transition-colors">{inner}</a>
              ) : (
                <div key={i} className="group flex items-center gap-4 py-5 border-b border-white/10">{inner}</div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  );
};

/* ------------------------------------------------------------------ */
/* FAQ accordion                                                       */
/* ------------------------------------------------------------------ */

export const Accordion = ({ items = [], initial = 0 }) => {
  const [open, setOpen] = useState(initial);
  const reduce = useReducedMotion();
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const on = open === i;
        return (
          <Reveal key={i} delay={i * 0.05} className={`rounded-xl overflow-hidden transition-colors ${on ? 'bg-white shadow-[6px_6px_0_0_#101D36]' : 'bg-grey-light hover:bg-grey-hover'}`}>
            <button
              type="button"
              onClick={() => setOpen(on ? null : i)}
              aria-expanded={on}
              className="w-full flex items-center gap-4 p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-navy rounded-xl"
            >
              <Mono className="text-brand-orange">{String(i + 1).padStart(2, '0')}</Mono>
              <span className="text-lg font-bold text-navy flex-1">{item.question}</span>
              <ChevronDown size={22} className={`text-navy shrink-0 transition-transform ${on ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 sm:pl-[4.25rem] text-gray-700 leading-relaxed [&_strong]:text-navy">{item.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        );
      })}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Auto-advance helper (timers live in useEffect only)                  */
/* ------------------------------------------------------------------ */

export const useAutoAdvance = (count, ms, paused) => {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const timer = useRef(null);
  useEffect(() => {
    if (paused || reduce || count < 2) return undefined;
    timer.current = setTimeout(() => setIndex((i) => (i + 1) % count), ms);
    return () => clearTimeout(timer.current);
  }, [index, paused, reduce, count, ms]);
  return [index, setIndex];
};
