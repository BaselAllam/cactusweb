import { useState } from 'react';
import { ChevronRight, MapPin, UsersRound, Images } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/contexts/LangContext';
import { HorseIcon, WhatsAppIcon } from '@/components/sabeel-icons';
import hero from '@/assets/hero.jpeg';
import story from '@/assets/story.jpeg';
import horse from '@/assets/horse.jpeg';
import stables from '@/assets/stables.jpeg';
import logo from '@/assets/LogoTrans.png';
import training from '@/assets/trainingstrip.jpeg';
import { Link } from 'react-router-dom';
import { SiteFooter, SiteHeader } from '@/components/layout/SiteChrome';

const branchMeta = [['Cairo Branch', 'Sheikh Zayed'], ['Giza Branch', '6th of October'], ['Alexandria Branch', 'Al Rehab']] as const;

const copy = {
  en: {
    mainNav: 'Main navigation', openMenu: 'Open menu', mobileNav: 'Mobile navigation',
    heroAlt: 'A boy connecting with his horse at Sabeel at sunset',
    title: 'A love of horses', tagline: 'An instinct. A connection. A love that starts young.',
    sub: ['At Sabeel, our love of horses is a way of life.', 'Breeding, training, boarding — the whole world of horses,', 'all in one place.'],
    contact: 'Contact Us', contactCaption: 'Connect with us on WhatsApp',
    servicesTitle: 'Our Services', servicesSub: 'Everything a horse lover needs, in one place',
    services: [
      ['Horse Boarding', 'Professional care and boarding in a safe, comfortable environment.'],
      ['Horse Breeding', 'Exceptional bloodlines, raised to the highest standards.'],
      ['Riding & Training', 'Riding programs for every level, from children to adults.'],
      ['Female Trainers', 'Dedicated female trainers for women, and male trainers for men.'],
    ],
    storyAlt: 'A rider and horse among the palms at sunset', storyTitle: 'Our Story',
    storyText: 'Our journey began with a genuine love of horses, rooted in instinct and heritage. From childhood, horses taught us patience, strength and discipline. Today, we share that love with everyone who wants to experience it. We offer more than training or riding — we offer a way of life.',
    storyQuote: ['“Horses are not just animals —', 'they are our teachers in life.”'],
    trainAlt: 'A Sabeel horse wearing a leather bridle', trainTitle: 'Training', trainSub: 'Professional training. Every level.',
    courses: [
      ['Children’s Training', 'Fun, safe first steps'],
      ['Adult Training', 'Confidence and connection'],
      ['Women’s Training', 'Dedicated female trainers'],
      ['Men’s Training', 'Expert, personal guidance'],
    ],
    branchesAlt: 'Sabeel wooden stables and palm trees', branchesTitle: 'Our Branches', branchesSub: 'Closer to you. Always here for you.',
    branches: [['Cairo Branch', 'Sheikh Zayed'], ['Giza Branch', '6th of October'], ['Alexandria Branch', 'Al Rehab']],
    branchAria: (name: string) => `Find ${name} on the map`,
    reviewsTitle: 'Client Reviews', starsAria: '5 out of 5 stars', reviewGroup: (n: number) => `Show review group ${n}`,
    reviews: [
      ['An amazing experience in every way. A professional team with genuine care for the horses.', 'Ahmed Hamdy', 'Adult rider'],
      ['My son used to be afraid of horses. Now he loves them and rides with confidence.', 'Sara Mohamed', 'Parent'],
      ['The trainers at Sabeel offer more than lessons. This truly is a way of life.', 'Mahmoud Ali', 'Regular rider'],
    ],
    galleryAlt: 'Explore the world of Sabeel', galleryTitle: 'Discover Our World', gallerySub: 'Our training, our horses, our home.', galleryBtn: 'View Gallery',
    footerTagline: 'A love of horses. A way of life.', getInTouch: 'Get in touch', throughWhatsApp: 'Through WhatsApp', footerNav: 'Footer navigation', rights: 'All rights reserved.',
    galleryModal: 'Sabeel Gallery', contactModal: 'Contact Sabeel', close: 'Close', photosAlt: 'Photographs from the world of Sabeel', prevImage: 'Previous image', nextImage: 'Next image',
    dialogTitle: 'Contact Sabeel', dialogSub: 'Riding, boarding and all things horses', openWa: 'Open WhatsApp',
    waMessage: 'Hello Sabeel, I would like to know more about riding lessons and horse services.',
  },
  ar: {
    mainNav: 'القائمة الرئيسية', openMenu: 'فتح القائمة', mobileNav: 'قائمة الهاتف',
    heroAlt: 'طفل يعانق خيله في سبيل عند الغروب',
    title: 'حُبّ الخيل', tagline: 'فطرة .. وجد علموهالي من وأنا صغير',
    sub: ['في سبيل، نعيش حب الخيل كفلسفة حياة.', 'تربية، تدريب، إيواء .. وكل ما يخص عالم الخيل', 'في مكان واحد.'],
    contact: 'تواصل معنا', contactCaption: 'تواصل معنا عبر واتساب',
    servicesTitle: 'خدماتنا', servicesSub: 'كل ما يحتاجه عشاق الخيل في مكان واحد',
    services: [
      ['خدمات الإيواء', 'إيواء ورعاية احترافية للخيل في بيئة آمنة ومريحة.'],
      ['تربية الخيول', 'اختيار وتربية أفضل السلالات لأعلى معايير الجودة.'],
      ['التدريب', 'برامج تدريبية لجميع المستويات (أطفال – كبار).'],
      ['مدربات سيدات', 'مدربات متخصصات لتدريب السيدات فقط ورجال للرجال.'],
    ],
    storyAlt: 'فارس يركب حصاناً وسط النخيل عند غروب الشمس', storyTitle: 'قصتنا',
    storyText: 'بدأت رحلتنا من حب صادق للخيل، وهو حب نابع من الفطرة والتراث. منذ أن كنت صغيراً، تعلمت من الخيل الصبر، القوة، والانضباط. واليوم، نشارك هذا الحب مع كل من يريد أن يعيش هذه التجربة. نمنحك أكثر من مجرد تدريب أو ركوب .. نمنحك أسلوب حياة.',
    storyQuote: ['"الخيل ليست مجرد حيوانات ..', 'بل معلمان في الحياة"'],
    trainAlt: 'حصان سبيل الأصيل', trainTitle: 'التدريبات', trainSub: 'تدريب احترافي .. لكل المستويات',
    courses: [
      ['تدريب الأطفال', 'بأسلوب ممتع وآمن'],
      ['تدريب الكبار', 'بناء الثقة والتواصل مع الخيل'],
      ['مدربات سيدات', 'تدريب حصري للسيدات'],
      ['رجال للرجال', 'مستوى احترافي وتوجيه متخصص'],
    ],
    branchesAlt: 'إسطبلات سبيل وسط النخيل', branchesTitle: 'فروعنا', branchesSub: 'مواقعنا قريبة منك .. لنكون دائماً في خدمتك',
    branches: [['فرع القاهرة', 'الشيخ زايد'], ['فرع الجيزة', '٦ أكتوبر'], ['فرع الإسكندرية', 'الرحاب']],
    branchAria: (name: string) => `عرض ${name} على الخريطة`,
    reviewsTitle: 'آراء عملائنا', starsAria: '٥ من ٥ نجوم', reviewGroup: (n: number) => `عرض مجموعة الآراء ${n}`,
    reviews: [
      ['تجربة رائعة بكل المقاييس، فريق محترف واهتمام حقيقي بالخيل.', 'أحمد حمدي', 'متدرب بالغ'],
      ['ابني كان خايف من الخيل، دلوقتي بقى بيحبها وبيتعلم بثقة.', 'سارة محمد', 'ولية أمر'],
      ['المدربين في سبيل مش مجرد مدربين، ده أسلوب حياة حقيقي.', 'محمود علي', 'عميل دائم'],
    ],
    galleryAlt: 'اكتشف عالم سبيل', galleryTitle: 'اكتشف عالمنا', gallerySub: 'صور من التدريبات، الخيول، وأجواء المكان', galleryBtn: 'شاهد المعرض',
    footerTagline: 'حب الخيل .. أسلوب حياة', getInTouch: 'تواصل معنا', throughWhatsApp: 'من خلال واتساب', footerNav: 'روابط أسفل الصفحة', rights: 'جميع الحقوق محفوظة.',
    galleryModal: 'معرض سبيل', contactModal: 'تواصل مع سبيل', close: 'إغلاق', photosAlt: 'صور من عالم سبيل', prevImage: 'الصورة السابقة', nextImage: 'الصورة التالية',
    dialogTitle: 'تواصل معنا', dialogSub: 'للتدريب، الإيواء وكل ما يخص الخيل', openWa: 'فتح واتساب',
    waMessage: 'مرحباً سبيل، أود معرفة المزيد عن التدريب وخدمات الخيل.',
  },
};

function SectionTitle({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return <div className="section-title"><span className="eyebrow" dir="ltr">{eyebrow}</span><h2><span>{children}</span></h2></div>;
}

export default function Index() {
  const { lang, dir } = useLang();
  const t = copy[lang];
  const [reviewPage, setReviewPage] = useState(0);
  const serviceIcons = [<HorseIcon stable />, <HorseIcon />, <HorseIcon rider />, <UsersRound className="people-icon" strokeWidth={1.5} />];
  const reviews = t.reviews;
  const contactButton = (small = false) => <Button variant="ghost" onClick={() => {}}><WhatsAppIcon /><span>{t.contact}</span><ChevronRight /></Button>;

  return <main dir={dir} className="min-h-screen bg-background text-foreground">
    <section id="home" className="hero photo-section">
      <img className="section-photo hero-photo" src={hero} alt={t.heroAlt} width={1920} height={1024} fetchPriority="high" />
      <div className="hero-shade" />
      <SiteHeader/>
      <img className="hero-logo" src={logo} width={1024} height={1024} alt="سبيل — Sabeel Horse Academy" />
      <div className="hero-content">
        <span className="eyebrow" dir="ltr">MORE THAN A STABLE</span>
        <h1>{t.title}</h1>
        <p className="hero-tagline">{t.tagline}</p>
        <p className="hero-description">{t.sub[0]}<br />{t.sub[1]}<br />{t.sub[2]}</p>
        {contactButton()}
        <span className="contact-caption">{t.contactCaption}</span>
      </div>
    </section>

    <section id="services" className="services-section parchment wave-top">
      <div className="content-width">
        <SectionTitle eyebrow="OUR SERVICES">{t.servicesTitle}</SectionTitle>
        <p className="section-subtitle">{t.servicesSub}</p>
        <div className="services-grid">{t.services.map(([title, desc], i) => <article className="service-card" key={i}>{serviceIcons[i]}<h3>{title}</h3><p>{desc}</p></article>)}</div>
      </div>
    </section>

    <section id="story" className="story-section parchment">
      <div className="story-image"><img src={story} alt={t.storyAlt} loading="lazy" width={1200} height={1024} /><span className="handwritten" dir="ltr">Horses<br />are a way<br />of life</span></div>
      <div className="story-content"><SectionTitle eyebrow="OUR STORY">{t.storyTitle}</SectionTitle><p>{t.storyText}</p><blockquote>{t.storyQuote[0]}<br />{t.storyQuote[1]}</blockquote><div className="horse-divider"><HorseIcon /></div></div>
    </section>

    <section id="training" className="training-section photo-section">
      <img className="section-photo" src={horse} alt={t.trainAlt} loading="lazy" width={1920} height={1024} />
      <div className="training-content content-width"><span className="eyebrow" dir="ltr">TRAINING</span><h2>{t.trainTitle}</h2><p className="training-subtitle">{t.trainSub}</p><div className="training-grid">{t.courses.map(([title, desc], i) => <article className="training-item" key={i}><div className={`training-photo training-photo-${i}`}><img src={training} alt={title} loading="lazy" width={1920} height={768} /></div><h3>{title}</h3><p>{desc}</p></article>)}</div></div>
    </section>

    <section id="branches" className="branches-section parchment wave-top">
      <img className="branch-photo" src={stables} alt={t.branchesAlt} loading="lazy" width={1408} height={1024} />
      <div className="branches-content"><SectionTitle eyebrow="OUR BRANCHES">{t.branchesTitle}</SectionTitle><p className="section-subtitle">{t.branchesSub}</p><div className="branches-grid">{t.branches.map(([name, area], i) => <a className="branch-card" key={i} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Sabeel horse academy ${branchMeta[i][0]} ${branchMeta[i][1]} Egypt`)}`} target="_blank" rel="noopener noreferrer" aria-label={t.branchAria(name)}><MapPin fill="currentColor" /><h3>{name}</h3><p>{area}</p></a>)}</div></div>
      <div className="branch-map" aria-hidden="true"><svg viewBox="0 0 200 200"><path d="m66 15 33 10 8 15 24-5 15 21 27 4-6 32 16 20-27 16-11 29-28-5-17 30-28-10-9-31-25-10 7-28-13-21 16-31Z"/><path d="m66 15 26 43 54-2M92 58l-29 47-25 24m54-71 36 52 28 18m-93-23 65 5-11 42m-54-47 27 77M99 25l-7 33m75 34-39 18"/></svg><MapPin className="map-pin map-pin-one"/><MapPin className="map-pin map-pin-two"/><MapPin className="map-pin map-pin-three"/></div>
    </section>

    <section id="reviews" className="reviews-section photo-section"><img className="section-photo review-bg" src={horse} alt="" loading="lazy" width={1920} height={1024} /><div className="reviews-shade"/><div className="content-width"><SectionTitle eyebrow="CLIENT REVIEWS">{t.reviewsTitle}</SectionTitle><div className="reviews-grid" aria-live="polite">{reviews.map((_, i) => { const review = reviews[(i + reviewPage) % reviews.length]; if (!review) return null; return <article key={i} className="review-card parchment"><div className="stars" aria-label={t.starsAria}>★★★★★</div><div className="review-body"><p>{review[0]}</p><div className={`review-avatar review-avatar-${(i + reviewPage) % 3}`}><img src={training} alt={review[1]} loading="lazy" width={1920} height={768}/></div></div><h3>{review[1]}</h3><span>{review[2]}</span></article>; })}</div><div className="review-dots">{[0, 1, 2].map(i => <Button variant="ghost" key={i} size="icon" className={`review-dot ${reviewPage === i ? 'selected' : ''}`} aria-label={t.reviewGroup(i + 1)} aria-pressed={reviewPage === i} onClick={() => setReviewPage(i)}><span /></Button>)}</div></div></section>

    <section id="gallery" className="gallery-section photo-section"><img className="section-photo review-bg" src={horse} alt="" loading="lazy" width={1920} height={1024}/><img className="gallery-stables" src={stables} alt={t.galleryAlt} loading="lazy" width={1408} height={1024}/><div className="gallery-shade"/><div className="gallery-content"><h2>{t.galleryTitle}</h2><p>{t.gallerySub}</p><Button asChild><Link to="/gallery">{t.galleryBtn}<Images /></Link></Button></div></section>
    <SiteFooter/>

  </main>;
}