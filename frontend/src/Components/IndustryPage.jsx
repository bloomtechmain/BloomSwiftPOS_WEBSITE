import React from 'react';
import {
  Check, MessageCircle, Mail, Clock, RefreshCw, Utensils, WifiOff, Headset, Target, BarChart3, Package, TrendingUp, Sparkles, Heart,
} from 'lucide-react';
import useRequestPos from '../hooks/useRequestPos';
import {
  Section, Eyebrow, H2, Body, MediaFrame, PhotoBand, Reveal, PageHero, BlockGrid, Heading, CtaBand,
} from './kit';

/*
  Shared template for the industry / solution pages. Each page passes its own (unchanged) copy as data.

  data = {
    service,                        // name passed to /request-pos
    breadcrumb,                     // [{ label, to? }]
    hero: { eyebrow?, title, sub?, text, image, actions },
    quick: { title?, text?, items: [{ icon, title, desc }] },
    sections: [{ eyebrow?, title, text: [..], points?: [{ title, desc }], after?: [..], image }],
    band: { src, alt },             // PhotoBand after the second section
    summary: { title, text, items: [{ icon, title, desc }], cols? },
    cta: { title, text, actions },
  }

  An action is { label, request: true } (login check → /request-pos), { label, to }, { label, href } or { label, onClick }.
*/

// Icons for summary items that had none in the original pages (matched on title keywords).
const ICONS = [
  [/whatsapp/i, MessageCircle], [/email/i, Mail], [/throughput|hour/i, Clock], [/churn/i, RefreshCw],
  [/ingredient/i, Utensils], [/offline/i, WifiOff], [/support/i, Headset], [/success|goal/i, Target],
  [/dashboard|report|analytic/i, BarChart3], [/inventory|stock/i, Package], [/metric|performance|growth|margin|profit/i, TrendingUp],
  [/loyal/i, Heart],
];
const withIcons = (items = []) =>
  items.map((it) => (it.icon ? it : { ...it, icon: (ICONS.find(([re]) => re.test(it.title)) || [null, Sparkles])[1] }));

const toActions =(actions = [], requestPos, service) =>
  actions.map((a) => (a.request ? { label: a.label, onClick: () => requestPos(service), primary: a.primary } : a));

// Small hairline stat under the hero actions (used where the original hero had a floating badge).
export const HeroStat = ({ label, value }) => (
  <div className="mt-10 pt-6 border-t border-white/10 flex items-baseline gap-4">
    <span className="font-mono text-xs font-bold tracking-widest uppercase text-white/50">{label}</span>
    <span className="text-xl font-extrabold text-white">{value}</span>
  </div>
);

const PointTiles =({ points, onGrey }) => (
  <ul className="mt-8 grid sm:grid-cols-2 gap-3">
    {points.map((p, i) => (
      <Reveal as="li" key={i} delay={Math.min(i, 6) * 0.05} className={`flex gap-3 rounded-xl p-4 ${onGrey ? 'bg-white' : 'bg-grey-light'}`}>
        <span className="mt-0.5 w-6 h-6 rounded-full bg-navy text-white inline-flex items-center justify-center shrink-0">
          <Check size={13} strokeWidth={3} aria-hidden="true" />
        </span>
        <span className="text-sm text-gray-600 leading-relaxed">
          {p.title && <strong className="block text-base text-navy">{p.title}</strong>}
          {p.desc}
        </span>
      </Reveal>
    ))}
  </ul>
);

export const FeatureSection = ({ s, i, total, offset = 0 }) => {
  const onGrey = (i + offset) % 2 === 0;
  const imageLeft = (i + offset) % 2 === 0;
  return (
    <Section bg={onGrey ? 'grey' : 'white'}>
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className={`lg:col-span-6 ${imageLeft ? 'lg:order-2' : ''}`}>
          <Reveal>
            {s.logo && (
              <span className={`inline-flex items-center justify-center w-20 h-20 rounded-xl mb-6 ${onGrey ? 'bg-white' : 'bg-grey-light'}`}>
                <img src={s.logo.src} alt={s.logo.alt} className="w-12 h-12 object-contain" loading="lazy" />
              </span>
            )}
            <Eyebrow>{s.eyebrow ||`${String(i + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`}</Eyebrow>
            <H2>{s.title}</H2>
            {s.text && s.text.length > 0 && (
              <Body className="mt-6 max-w-3xl">
                {s.text.map((t, k) => <p key={k}>{t}</p>)}
              </Body>
            )}
          </Reveal>
          {s.points && s.points.length > 0 && <PointTiles points={s.points} onGrey={onGrey} />}
          {s.after && s.after.length > 0 && (
            <Body className="mt-6 max-w-3xl">
              {s.after.map((t, k) => <p key={k}>{t}</p>)}
            </Body>
          )}
        </div>
        <div className={`lg:col-span-6 ${imageLeft ? 'lg:order-1' : ''}`}>
          {s.image && <MediaFrame {...s.image} />}
        </div>
      </div>
    </Section>
  );
};

const IndustryPage = ({ data, children }) => {
  const requestPos = useRequestPos();
  const { service, breadcrumb, hero, quick, sections = [], band, summary, cta } = data;
  return (
    <div className="bg-white">
      <PageHero
        breadcrumb={breadcrumb}
        eyebrow={hero.eyebrow}
        title={hero.title}
        text={
          <>
            {hero.sub && <p className="text-xl lg:text-2xl font-bold text-white">{hero.sub}</p>}
            {hero.text && <p>{hero.text}</p>}
          </>
        }
        actions={toActions(hero.actions, requestPos, service)}
        image={hero.image}
      >
        {hero.stat && <HeroStat {...hero.stat} />}
      </PageHero>

      {quick && (
        <Section bg="white">
          {(quick.title || quick.text) && <Heading center title={quick.title} sub={quick.text} className="mb-14" />}
          <BlockGrid items={withIcons(quick.items)} cols={quick.items.length === 4 ? 4 : 3} />
        </Section>
      )}

      {sections.map((s, i) => (
        <React.Fragment key={i}>
          <FeatureSection s={s} i={i} total={sections.length} />
          {i === 1 && band && <PhotoBand {...band} />}
        </React.Fragment>
      ))}
      {sections.length < 2 && band && <PhotoBand {...band} />}

      {children}

      {summary && (
        <Section bg="dark">
          <Heading center dark eyebrow={summary.eyebrow} title={summary.title} sub={summary.text} className="mb-14" />
          <BlockGrid items={withIcons(summary.items)} cols={summary.cols || 4} dark />
        </Section>
      )}

      {cta && (
        <CtaBand
          eyebrow={cta.eyebrow}
          title={cta.title}
          text={cta.text && <p>{cta.text}</p>}
          actions={toActions(cta.actions, requestPos, service)}
        />
      )}
    </div>
  );
};

export default IndustryPage;
