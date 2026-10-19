import React from 'react';
import { Check, Minus, Phone, Sparkles } from 'lucide-react';
import { Section, Eyebrow, H2, Reveal, PrimaryButton, Heading } from './kit';
import { offline, cloud, PRICING_PHONE, PRICING_PHONE_HREF } from '../data/pricing';

const Mono = ({ children, className = '' }) => (
  <span className={`font-mono text-xs font-bold tracking-widest uppercase ${className}`}>{children}</span>
);

const cardBase = 'group h-full flex flex-col rounded-xl p-7 transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1';
const cardLight = 'bg-grey-light shadow-[5px_5px_0_0_#D5DAE3] hover:bg-white hover:shadow-[8px_8px_0_0_#101D36]';
const cardNavy = 'bg-navy text-white shadow-[5px_5px_0_0_#D5DAE3] hover:shadow-[8px_8px_0_0_#FF6B00]';

const PlanCard = ({ plan, i, cloudPlan = false }) => {
  const on = plan.popular;
  return (
    <div className={`${cardBase} ${on ? cardNavy : cardLight}`}>
      <div className="flex items-center gap-3">
        <Mono className="text-brand-orange">{String(i + 1).padStart(2, '0')}</Mono>
        {on && <span className="ml-auto text-[11px] leading-4 font-semibold px-2.5 rounded-md bg-white/10 text-white">Most popular</span>}
      </div>
      <h3 className={`mt-4 text-xl font-extrabold ${on ? 'text-white' : 'text-navy'}`}>{plan.name}</h3>
      <div className="mt-4">
        {plan.price ? (
          <>
            <div className={`text-4xl font-extrabold tracking-tight ${on ? 'text-white' : 'text-navy'}`}>
              {!cloudPlan && <span className={`text-base font-bold mr-1 ${on ? 'text-white/60' : 'text-gray-500'}`}>Rs.</span>}
              {plan.price}
            </div>
            <div className={`mt-1 text-sm ${on ? 'text-white/60' : 'text-gray-500'}`}>{plan.unit}</div>
          </>
        ) : (
          <div className={`text-2xl font-extrabold ${on ? 'text-white' : 'text-navy'}`}>{plan.quote}</div>
        )}
      </div>
      {(plan.text || plan.bold) && (
        <p className={`mt-5 pt-5 border-t leading-relaxed ${on ? 'border-white/10 text-white/70' : 'border-gray-200 text-gray-600'}`}>
          {plan.text} {plan.bold && <strong className={on ? 'text-white' : 'text-navy'}>{plan.bold}</strong>}
        </p>
      )}
    </div>
  );
};

// `compact` drops the headline + intro when the page hero already shows them.
export const OfflinePlans = ({ compact = false }) => (
  <Section bg="white" id="offline">
    {compact ? (
      <Reveal className="mb-12">
        <Eyebrow>{offline.sectors}</Eyebrow>
        <p className="text-2xl lg:text-3xl font-extrabold text-navy">{offline.edition}</p>
      </Reveal>
    ) : (
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-12">
        <Reveal className="lg:col-span-7">
          <Eyebrow>{offline.sectors}</Eyebrow>
          <H2>{offline.headline[0]} <span className="text-brand-orange-dark">{offline.headline[1]}</span></H2>
          <p className="mt-4 text-lg text-gray-600">{offline.edition}</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5">
          <Mono className="text-gray-400">{offline.tagline}</Mono>
          <p className="mt-3 text-lg text-gray-700 leading-relaxed">{offline.intro}</p>
        </Reveal>
      </div>
    )}
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
      {offline.plans.map((p, i) => (
        <Reveal key={p.name} delay={i * 0.06} className="h-full">
          <PlanCard plan={p} i={i} />
        </Reveal>
      ))}
    </div>
  </Section>
);

const Cell = ({ v }) => {
  if (v === true) {
    return (
      <span className="inline-flex w-6 h-6 rounded-full bg-navy text-white items-center justify-center" aria-label="Included">
        <Check size={13} strokeWidth={3} aria-hidden="true" />
      </span>
    );
  }
  if (v === false) {
    return (
      <span className="inline-flex w-6 h-6 items-center justify-center text-gray-300" aria-label="Not included">
        <Minus size={16} aria-hidden="true" />
      </span>
    );
  }
  return <span className="font-bold text-navy">{v}</span>;
};

export const OfflineComparison = () => {
  const names = offline.plans.map((p) => p.name);
  return (
    <Section bg="grey">
      <Heading eyebrow="Compare packages" title="What each package includes" className="mb-12" />
      <Reveal className="rounded-2xl bg-white shadow-[8px_8px_0_0_#101D36] overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th scope="col" className="p-5 lg:px-8"><Mono className="text-gray-400">Feature</Mono></th>
              {names.map((n) => (
                <th key={n} scope="col" className="p-5 text-center font-extrabold text-navy whitespace-nowrap">{n}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {offline.features.map(([label, ...vals]) => (
              <tr key={label} className="border-b border-gray-100 last:border-0 hover:bg-grey-light transition-colors">
                <th scope="row" className="p-4 lg:px-8 font-semibold text-gray-700">{label}</th>
                {vals.map((v, k) => (
                  <td key={k} className="p-4 text-center"><Cell v={v} /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {offline.notes.map((n, i) => (
          <Reveal key={n.title} delay={i * 0.06} className="border-l-2 border-gray-300 pl-5">
            <Mono className="text-brand-orange">{String(i + 1).padStart(2, '0')}</Mono>
            <h3 className="mt-2 font-extrabold text-navy">{n.title}</h3>
            <p className="mt-1 text-gray-600 leading-relaxed">{n.text}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
        <PrimaryButton href={PRICING_PHONE_HREF}>
          <Phone size={18} aria-hidden="true" />
          {PRICING_PHONE}
        </PrimaryButton>
        <p className="text-gray-700 font-semibold">{offline.cta}</p>
      </Reveal>
      <p className="mt-8 text-sm text-gray-500 max-w-3xl">{offline.smallPrint}</p>
    </Section>
  );
};

export const CloudPlans = ({ bg = 'grey' }) => (
  <Section bg={bg} id="cloud">
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-12">
      <Reveal className="lg:col-span-7">
        <Eyebrow>{cloud.badge}</Eyebrow>
        <H2>{cloud.headline[0]} <span className="text-brand-orange-dark">{cloud.headline[1]}</span></H2>
        <p className="mt-4 text-lg text-gray-600">{cloud.intro}</p>
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end">
        {cloud.perks.map((p) => (
          <span key={p} className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 font-bold text-navy">
            <Check size={16} className="text-brand-orange-dark" aria-hidden="true" />
            {p}
          </span>
        ))}
      </Reveal>
    </div>
    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
      {cloud.plans.map((p, i) => (
        <Reveal key={p.name} delay={i * 0.06} className="h-full">
          <PlanCard plan={p} i={i} cloudPlan />
        </Reveal>
      ))}
    </div>
    <div className="mt-10 grid lg:grid-cols-12 gap-6 lg:gap-8">
      <Reveal className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-3">
        {cloud.features.map((f) => (
          <div key={f} className="flex items-center gap-3 rounded-xl bg-white p-4">
            <span className="w-6 h-6 rounded-full bg-navy text-white inline-flex items-center justify-center shrink-0">
              <Check size={13} strokeWidth={3} aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold text-navy">{f}</span>
          </div>
        ))}
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-4 rounded-xl bg-navy text-white p-6 flex items-center gap-4">
        <span className="w-11 h-11 rounded-lg bg-white/10 inline-flex items-center justify-center shrink-0">
          <Sparkles size={20} aria-hidden="true" />
        </span>
        <div>
          <Mono className="text-brand-orange">{cloud.addOn.tag}</Mono>
          <div className="font-extrabold text-lg">{cloud.addOn.title}</div>
          <div className="text-white/60 text-sm">{cloud.addOn.text}</div>
        </div>
      </Reveal>
    </div>
    <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
      <PrimaryButton href={PRICING_PHONE_HREF}>
        <Phone size={18} aria-hidden="true" />
        {PRICING_PHONE}
      </PrimaryButton>
      <p className="text-gray-700 font-semibold">{cloud.cta}</p>
    </Reveal>
  </Section>
);
