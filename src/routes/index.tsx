import { useState } from 'react';
import {
  ArrowRight, ChevronRight, MapPin, UserPlus, Package, ShieldCheck, Clock, Headset, Tag,
  Store, Building2, User, Boxes, MonitorSmartphone, Truck, CircleCheck, Star, UsersRound, Smartphone, UserRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/contexts/LangContext';
import hero from '@/assets/hero.jpeg';
import horse from '@/assets/horse.jpeg';
import stables from '@/assets/stables.jpeg';
import { Link } from 'react-router-dom';
import { SiteFooter, SiteHeader } from '@/components/layout/SiteChrome';

const cityNames = ['Alexandria', 'Port Said', 'Cairo', 'Ismailia', 'Giza', 'Suez'] as const;

const copy = {
  en: {
    heroEyebrow: 'SHIPPING & LOGISTICS',
    title: 'Shipping made simple.', tagline: 'Your business grows.',
    sub: ['Fast, reliable and affordable shipping solutions', 'to deliver your products to your customers', 'anywhere in Egypt.'],
    createAccount: 'Create Merchant Account', learnMore: 'Learn More', contactCaption: 'Start shipping in minutes',
    badges: ['Secure & Reliable', 'Fast Delivery', '24/7 Support', 'Best Rates'],
    servicesEyebrow: 'OUR SERVICES', servicesTitle: 'Everything you need to ship with confidence', servicesSub: 'Solutions for every kind of sender',
    services: [
      ['For E-commerce', 'Connect your store and start shipping in minutes.'],
      ['For Businesses', 'Flexible corporate solutions tailored to your needs.'],
      ['For Individuals', 'Send parcels easily and track every step.'],
      ['Custom Solutions', 'Custom shipping solutions built for you.'],
    ],
    cardLink: 'Learn more',
    coverageEyebrow: 'WHERE WE SHIP', coverageTitle: 'We deliver across Egypt and we’re expanding.',
    coverageSub: 'We currently cover major cities and continue to expand to serve more areas every day.',
    coverageBtn: 'See All Coverage Areas', legendServed: 'Our Service Areas', legendSoon: 'Expanding Soon',
    coverageAlt: 'Caclius delivery network',
    cities: ['Alexandria', 'Port Said', 'Cairo', 'Ismailia', 'Giza', 'Suez'],
    cityLabel: 'Service area', cityAria: (name: string) => `Find ${name} on the map`,
    stepsEyebrow: 'HOW IT WORKS', stepsTitle: 'How shipping with Caclius works',
    steps: [
      ['Create Account', 'Sign up as a merchant and complete your profile.'],
      ['Create Shipment', 'Add order details and generate your shipment.'],
      ['We Pick & Ship', 'We pick up your parcel and deliver it safely.'],
      ['Delivered', 'Your customer receives and you grow.'],
    ],
    stats: [['10M+', 'Parcels Delivered'], ['220+', 'Cities Covered'], ['50K+', 'Happy Merchants'], ['5+', 'Years of Experience']],
    reviewsEyebrow: 'TESTIMONIALS', reviewsTitle: 'Loved by businesses like yours', starsAria: '5 out of 5 stars', reviewGroup: (n: number) => `Show review group ${n}`,
    reviews: [
      ['Caclius made our shipping operations so easy and reliable. Highly recommended!', 'Ahmed Hassan', 'Founder, Urban Wear', 'AH'],
      ['Great support, fast delivery, and the best rates in the market. Keep it up!', 'Sara Khaled', 'CEO, SK Store', 'SK'],
      ['Finally a shipping partner we can trust to deliver on time, every time.', 'Mohamed Adel', 'Owner, Tech Accessories', 'MA'],
    ],
    ctaTitle: 'Ready to grow your business with Caclius?', ctaSub: 'Create your merchant account now and start shipping today.',
    appTitle: 'Track shipments anytime, anywhere', appSub: 'Manage your shipments, track in real-time and grow your business on the go.',
    googlePlay: 'Get it on Google Play', appStore: 'Download on the App Store',
  },
  ar: {
    heroEyebrow: 'الشحن والخدمات اللوجستية',
    title: 'الشحن بكل سهولة.', tagline: 'وأعمالك تنمو.',
    sub: ['حلول شحن سريعة وموثوقة وبأسعار مناسبة', 'لتوصيل منتجاتك إلى عملائك', 'في أي مكان داخل مصر.'],
    createAccount: 'إنشاء حساب تاجر', learnMore: 'اعرف المزيد', contactCaption: 'ابدأ الشحن في دقائق',
    badges: ['آمن وموثوق', 'توصيل سريع', 'دعم على مدار الساعة', 'أفضل الأسعار'],
    servicesEyebrow: 'OUR SERVICES', servicesTitle: 'كل ما تحتاجه للشحن بثقة', servicesSub: 'حلول مناسبة لكل أنواع المرسلين',
    services: [
      ['للمتاجر الإلكترونية', 'اربط متجرك وابدأ الشحن في دقائق.'],
      ['للشركات', 'حلول مرنة للشركات مصممة حسب احتياجاتك.'],
      ['للأفراد', 'أرسل طرودك بسهولة وتابع كل خطوة.'],
      ['حلول مخصصة', 'حلول شحن مخصصة مصممة خصيصاً لك.'],
    ],
    cardLink: 'اعرف المزيد',
    coverageEyebrow: 'WHERE WE SHIP', coverageTitle: 'نوصّل في جميع أنحاء مصر ونتوسع باستمرار.',
    coverageSub: 'نغطي حالياً المدن الرئيسية ونواصل التوسع لخدمة مناطق أكثر كل يوم.',
    coverageBtn: 'عرض كل مناطق التغطية', legendServed: 'مناطق الخدمة', legendSoon: 'قريباً توسعات جديدة',
    coverageAlt: 'شبكة توصيل كاكليوس',
    cities: ['الإسكندرية', 'بورسعيد', 'القاهرة', 'الإسماعيلية', 'الجيزة', 'السويس'],
    cityLabel: 'منطقة خدمة', cityAria: (name: string) => `عرض ${name} على الخريطة`,
    stepsEyebrow: 'HOW IT WORKS', stepsTitle: 'كيف يعمل الشحن مع كاكليوس',
    steps: [
      ['إنشاء حساب', 'سجّل كتاجر وأكمل ملفك الشخصي.'],
      ['إنشاء شحنة', 'أضف تفاصيل الطلب وأنشئ الشحنة.'],
      ['نستلم ونشحن', 'نستلم طردك من عندك ونوصله بأمان.'],
      ['تم التسليم', 'يستلم عميلك طلبه وتنمو أعمالك.'],
    ],
    stats: [['+10M', 'طرد تم توصيله'], ['+220', 'مدينة نغطيها'], ['+50K', 'تاجر سعيد'], ['+5', 'سنوات من الخبرة']],
    reviewsEyebrow: 'TESTIMONIALS', reviewsTitle: 'محبوبون من شركات مثل شركتك', starsAria: '٥ من ٥ نجوم', reviewGroup: (n: number) => `عرض مجموعة الآراء ${n}`,
    reviews: [
      ['كاكليوس جعلت عمليات الشحن عندنا سهلة وموثوقة. أنصح بها بشدة!', 'أحمد حسن', 'مؤسس، أربان وير', 'أ ح'],
      ['دعم ممتاز وتوصيل سريع وأفضل الأسعار في السوق. استمروا!', 'سارة خالد', 'الرئيس التنفيذي، SK Store', 'س خ'],
      ['أخيراً شريك شحن نثق فيه ليوصل في الموعد في كل مرة.', 'محمد عادل', 'صاحب متجر إكسسوارات تقنية', 'م ع'],
    ],
    ctaTitle: 'جاهز لتنمية أعمالك مع كاكليوس؟', ctaSub: 'أنشئ حساب التاجر الآن وابدأ الشحن اليوم.',
    appTitle: 'تتبّع شحناتك في أي وقت ومن أي مكان', appSub: 'أدر شحناتك وتتبعها لحظة بلحظة ونمِّ أعمالك وأنت في حركة.',
    googlePlay: 'حمّله من Google Play', appStore: 'حمّله من App Store',
  },
};

function SectionTitle({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return <div className="section-title"><span className="eyebrow" dir="ltr">{eyebrow}</span><h2><span>{children}</span></h2></div>;
}

export default function Index() {
  const { lang, dir } = useLang();
  const t = copy[lang];
  const [reviewPage, setReviewPage] = useState(0);
  const badgeIcons = [ShieldCheck, Clock, Headset, Tag];
  const serviceIcons = [Store, Building2, User, Boxes];
  const stepIcons = [UserPlus, MonitorSmartphone, Truck, CircleCheck];
  const statIcons = [Package, MapPin, UsersRound, Star];
  const reviews = t.reviews;

  return <main dir={dir} className="min-h-screen bg-background text-foreground">
    <section id="home" className="hero photo-section">
      <img className="section-photo hero-photo" src={hero} alt="" width={1920} height={1024} fetchPriority="high" />
      <div className="hero-shade" />
      <SiteHeader/>
      <div className="hero-content">
        <span className="eyebrow" dir="ltr">{t.heroEyebrow}</span>
        <h1>{t.title}</h1>
        <p className="hero-tagline">{t.tagline}</p>
        <p className="hero-description">{t.sub[0]}<br />{t.sub[1]}<br />{t.sub[2]}</p>
        <div className="hero-actions">
          <Button asChild variant="ghost"><Link to="/signup"><UserRound /><span>{t.createAccount}</span><ChevronRight /></Link></Button>
          <Button asChild variant="ghost"><Link to="/services"><span>{t.learnMore}</span></Link></Button>
        </div>
        <span className="contact-caption">{t.contactCaption}</span>
      </div>
    </section>

    <section id="services" className="services-section parchment wave-top">
      <div className="content-width">
        <ul className="badge-row">{t.badges.map((label, i) => { const Icon = badgeIcons[i]; return <li key={i}><Icon aria-hidden="true" /><span>{label}</span></li>; })}</ul>
        <SectionTitle eyebrow={t.servicesEyebrow}>{t.servicesTitle}</SectionTitle>
        <p className="section-subtitle">{t.servicesSub}</p>
        <div className="services-grid">{t.services.map(([title, desc], i) => { const Icon = serviceIcons[i]; return <article className="service-card" key={i}><Icon className="horse-icon" strokeWidth={1.5} aria-hidden="true" /><h3>{title}</h3><p>{desc}</p><Link className="card-link" to="/services"><span>{t.cardLink}</span><ArrowRight aria-hidden="true" /></Link></article>; })}</div>
      </div>
    </section>

    <section id="coverage" className="branches-section parchment wave-top">
      <img className="branch-photo" src={stables} alt={t.coverageAlt} loading="lazy" width={1408} height={1024} />
      <div className="branches-content">
        <SectionTitle eyebrow={t.coverageEyebrow}>{t.coverageTitle}</SectionTitle>
        <p className="section-subtitle">{t.coverageSub}</p>
        <div className="branches-grid">{t.cities.map((name, i) => <a className="branch-card" key={i} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${cityNames[i]}, Egypt`)}`} target="_blank" rel="noopener noreferrer" aria-label={t.cityAria(name)}><MapPin fill="currentColor" /><h3>{name}</h3><p>{t.cityLabel}</p></a>)}</div>
        <div className="coverage-footer">
          <Button asChild variant="ghost"><Link to="/coverage"><span>{t.coverageBtn}</span><MapPin /></Link></Button>
          <ul className="coverage-legend"><li><MapPin aria-hidden="true" />{t.legendServed}</li><li><span className="legend-dot" aria-hidden="true" />{t.legendSoon}</li></ul>
        </div>
      </div>
      <div className="branch-map" aria-hidden="true"><svg viewBox="0 0 200 200"><path d="m66 15 33 10 8 15 24-5 15 21 27 4-6 32 16 20-27 16-11 29-28-5-17 30-28-10-9-31-25-10 7-28-13-21 16-31Z"/><path d="m66 15 26 43 54-2M92 58l-29 47-25 24m54-71 36 52 28 18m-93-23 65 5-11 42m-54-47 27 77M99 25l-7 33m75 34-39 18"/></svg><MapPin className="map-pin map-pin-one"/><MapPin className="map-pin map-pin-two"/><MapPin className="map-pin map-pin-three"/></div>
    </section>

    <section id="how-it-works" className="steps-section parchment">
      <div className="content-width">
        <SectionTitle eyebrow={t.stepsEyebrow}>{t.stepsTitle}</SectionTitle>
        <ol className="steps-grid">{t.steps.map(([title, desc], i) => { const Icon = stepIcons[i]; return <li className="step-item" key={i}><div className="step-icon"><Icon strokeWidth={1.5} aria-hidden="true" /><span className="step-number">{i + 1}</span></div><h3>{title}</h3><p>{desc}</p></li>; })}</ol>
        <div className="stats-strip">{t.stats.map(([value, label], i) => { const Icon = statIcons[i]; return <div className="stat-item" key={i}><Icon aria-hidden="true" strokeWidth={1.5} /><div><strong dir="ltr">{value}</strong><span>{label}</span></div></div>; })}</div>
      </div>
    </section>

    <section id="reviews" className="reviews-section photo-section"><img className="section-photo review-bg" src={horse} alt="" loading="lazy" width={1920} height={1024} /><div className="reviews-shade"/><div className="content-width"><SectionTitle eyebrow={t.reviewsEyebrow}>{t.reviewsTitle}</SectionTitle><div className="reviews-grid" aria-live="polite">{reviews.map((_, i) => { const review = reviews[(i + reviewPage) % reviews.length]; if (!review) return null; return <article key={i} className="review-card parchment"><div className="stars" aria-label={t.starsAria}>★★★★★</div><div className="review-body"><p>{review[0]}</p><div className="review-avatar review-initials" aria-hidden="true">{review[3]}</div></div><h3>{review[1]}</h3><span>{review[2]}</span></article>; })}</div><div className="review-dots">{[0, 1, 2].map(i => <Button variant="ghost" key={i} size="icon" className={`review-dot ${reviewPage === i ? 'selected' : ''}`} aria-label={t.reviewGroup(i + 1)} aria-pressed={reviewPage === i} onClick={() => setReviewPage(i)}><span /></Button>)}</div></div></section>

    <section id="get-started" className="gallery-section photo-section"><img className="section-photo review-bg" src={stables} alt="" loading="lazy" width={1408} height={1024}/><div className="gallery-shade"/><div className="gallery-content"><h2>{t.ctaTitle}</h2><p>{t.ctaSub}</p><Button asChild><Link to="/signup">{t.createAccount}<UserPlus /></Link></Button></div></section>

    <section id="app" className="app-section parchment">
      <div className="content-width app-band">
        <Smartphone className="app-phone" strokeWidth={1.2} aria-hidden="true" />
        <div className="app-copy"><h2>{t.appTitle}</h2><p>{t.appSub}</p></div>
        <div className="app-stores">
          <a className="sabeel-button" href="#" aria-label={t.googlePlay}><Smartphone /><span>{t.googlePlay}</span></a>
          <a className="sabeel-button" href="#" aria-label={t.appStore}><Smartphone /><span>{t.appStore}</span></a>
        </div>
      </div>
    </section>
    <SiteFooter/>

  </main>;
}