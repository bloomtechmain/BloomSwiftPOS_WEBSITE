import React from 'react';
import { Users, BarChart3, RefreshCw, Zap, Search, Share2, Layers, MousePointerClick, Heart } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { PageHero, Section, Heading, BlockGrid, PhotoBand, CtaBand, Reveal } from '../Components/kit';
import { FeatureSection, HeroStat } from '../Components/IndustryPage';

const quick = [
  { icon: RefreshCw, title: 'Synchronized Customer Insights', desc: 'Eliminate manual data entry by automatically syncing purchase history and customer profiles directly from your POS to your favorite email platform. Whether you use MailChimp, Zoho, or manual exports, your marketing lists stay fresh and accurate without the extra workload.' },
  { icon: Users, title: 'Precision-Targeted Campaigns', desc: 'Stop sending generic blasts and start sending what your customers actually want. Use real-time data to segment your audience based on what they buy, how much they spend, or how long it’s been since their last visit, ensuring every email feels personal and relevant.' },
  { icon: BarChart3, title: 'Boosted Retention and ROI', desc: 'Drive repeat business by automating the "heavy lifting." Set up automated "Thank You" notes, birthday rewards, or win-back campaigns that trigger based on POS activity, turning one-time shoppers into loyal brand advocates with minimal effort.' },
];

const logos = [
  { src: '/Assets/email/mailchimp_icon_146054.png', alt: 'MailChimp' },
  { src: '/Assets/email/zoho_logo_icon_169675.png', alt: 'Zoho Campaigns' },
  { src: '/Assets/email/images.png', alt: 'MailerLite' },
  { src: '/Assets/email/moosend-logo-icon.avif', alt: 'Moosend' },
];

const sections = [
  {
    title: 'Precision-Targeted Campaigns',
    text: ['Generic marketing often goes ignored, but data-driven outreach captures attention by meeting customers exactly where they are in their journey. By leveraging the specific purchase behaviors captured at your POS, you can move beyond broad messaging and deliver content that truly resonates.'],
    points: [
      { title: 'Behavior-Based Segmentation', desc: 'Group customers automatically based on their actual spending habits, such as "high-spenders," "frequent coffee buyers," or "seasonal shoppers," for laser-focused messaging.' },
      { title: 'Reduced Marketing Waste', desc: 'Save time and resources by only sending offers to the people most likely to redeem them, increasing your conversion rates while keeping your brand out of the spam folder.' },
      { title: 'Dynamic Personalization', desc: 'Use specific POS data points—like the date of a last visit or a favorite product category—to trigger timely, relevant emails that make customers feel seen and valued.' },
    ],
    image: { src: '/images/general/phone-laptop-2.webp', alt: 'Precision Targeted Campaigns' },
  },
  {
    title: 'Reach your customers exactly where they engage most',
    text: ['By bridging the gap between your POS and their inbox, you replace fleeting transactions with a high-impact digital experience. Our platform automatically synchronizes checkout data to deliver professional, searchable invoices and personalized rewards directly to your customers’ primary email accounts.'],
    points: [
      { title: 'Reliable Digital Records', desc: 'Eliminate the frustration of lost paper receipts by providing customers with a permanent, searchable archive of their purchases, accessible from any device at any time.' },
      { title: 'Seamless Information Access', desc: 'Empower your customers with the convenience of a dedicated digital history, allowing them to track orders and verify transactions without the clutter of physical paperwork.' },
      { title: 'Automated Loyalty Growth', desc: 'Convert every sale into a lasting relationship by triggering tailored rewards and exclusive updates based on shopping habits, making their next visit the obvious choice.' },
    ],
    image: { src: '/images/general/pointing-laptop.webp', alt: 'Digital Engagement' },
  },
];

const integrations = [
  { icon: Zap, title: 'Build Lasting Brand Recall', desc: 'Move beyond discarded paper receipts by establishing a permanent, branded presence in your customer’s inbox with beautiful, automated follow-ups.' },
  { icon: MousePointerClick, title: 'Drive Frictionless Reorders', desc: 'Insert direct "Buy Again" links and personalized product recommendations into your emails based on past POS history, making the next purchase just one click away.' },
  { icon: Share2, title: 'Simplify Word-of-Mouth', desc: 'Increase your reach by including easy "Forward to a Friend" rewards and social sharing buttons in every digital touchpoint, turning your loyal customers into active advocates.' },
];

const platforms = [
  {
    logo: { src: '/Assets/email/mailchimp_icon_146054.png', alt: 'Mailchimp Logo' },
    eyebrow: 'Platform',
    title: 'Mailchimp',
    text: ['The all-in-one marketing platform that helps you grow your business. With our integration, sync your POS contacts to Mailchimp instantly, segment them based on purchase history, and send personalized campaigns that drive revenue.'],
    points: [{ title: 'Advanced behavioral targeting' }, { title: 'Automated customer journeys' }, { title: 'Detailed revenue reporting' }],
    image: { src: '/images/general/phone-laptop.webp', alt: 'Mailchimp Integration' },
  },
  {
    logo: { src: '/Assets/email/zoho_logo_icon_169675.png', alt: 'Zoho Campaigns Logo' },
    eyebrow: 'Platform',
    title: 'Zoho Campaigns',
    text: ['Part of the Zoho ecosystem, this platform is perfect for businesses needing deep CRM integration. Create responsive emails and automate workflows to engage your audience at the right time.'],
    points: [{ title: 'Seamless CRM synchronization' }, { title: 'A/B testing capabilities' }, { title: 'Dynamic content personalization' }],
    image: { src: '/images/general/coworking-desk.webp', alt: 'Zoho Campaigns Integration' },
  },
  {
    logo: { src: '/Assets/email/images.png', alt: 'MailerLite Logo' },
    eyebrow: 'Platform',
    title: 'MailerLite',
    text: ['Advanced email marketing made simple. Connect your POS to MailerLite to automate your welcome emails, reward loyal customers, and design beautiful newsletters with an intuitive drag-and-drop editor.'],
    points: [{ title: 'Intuitive drag-and-drop builder' }, { title: 'Landing page integration' }, { title: 'Subscriber management' }],
    image: { src: '/images/general/team-whiteboard.webp', alt: 'MailerLite Integration' },
  },
];

const EmailCampaign = () => {
  const { setIsContactSalesOpen } = useUI();
  return (
    <div className="bg-white">
      <PageHero
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Integrations' }, { label: 'Email Campaign' }]}
        eyebrow="Email Marketing Integration"
        title="Custom Email Campaign"
        text={<p>Our platform bridges the gap between your sales counter and your customer's inbox by automatically transforming daily transaction data into actionable marketing insights.</p>}
        actions={[{ label: 'Get Started', onClick: () => setIsContactSalesOpen(true) }]}
        image={{ src: '/images/email/workspace.webp', alt: 'Email Campaign Background' }}
      >
        <HeroStat label="Engagement Rate" value="+60% Increase" />
      </PageHero>

      <Section bg="white">
        <BlockGrid items={quick} cols={3} />
      </Section>

      <Section bg="grey" className="!py-14">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <p className="lg:col-span-3 font-mono text-xs font-bold tracking-widest uppercase text-gray-500">Seamlessly Integrates With</p>
          <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {logos.map((l, i) => (
              <Reveal key={l.alt} delay={i * 0.05} className="flex items-center justify-center rounded-xl bg-white p-6 h-28">
                <img src={l.src} alt={l.alt} className="max-h-16 w-auto object-contain" loading="lazy" />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {sections.map((s, i) => (
        <React.Fragment key={s.title}>
          <FeatureSection s={s} i={i} offset={1} total={sections.length} />
          {i === 0 && <PhotoBand src="/images/email/desk.webp" alt="Email Campaign Dashboard" />}
        </React.Fragment>
      ))}

      <Section bg="dark">
        <Heading
          center
          dark
          title="Seamless email marketing integrations (like Mailchimp, Zoho, and MailerLite) POS Integration"
          sub="Transform your point-of-sale from a final transaction into a long-term connection by turning every receipt into a gateway for your email marketing funnel. By automatically capturing customer data at checkout, you transition from one-off sales to consistent, professional engagement that keeps your brand top-of-mind in your customer's inbox."
          className="mb-14"
        />
        <BlockGrid items={integrations} cols={3} dark />
      </Section>

      <Section bg="white" className="!pb-0">
        <Heading
          center
          eyebrow="Platforms"
          title="Supported Platforms"
          sub="We integrate seamlessly with the world's leading email marketing platforms to help you stay connected with your customers."
        />
      </Section>
      {platforms.map((p, i) => (
        <FeatureSection key={p.title} s={p} i={i} offset={1} total={platforms.length} />
      ))}

      <CtaBand
        title="Ready to transform your customer relationships?"
        text={<p>Start syncing your POS data with your favorite email marketing tools today.</p>}
        actions={[{ label: 'Contact Sales', onClick: () => setIsContactSalesOpen(true) }]}
      />
    </div>
  );
};

export default EmailCampaign;
