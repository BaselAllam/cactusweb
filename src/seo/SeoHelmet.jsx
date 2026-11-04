import { Helmet } from "react-helmet";
import defaultOgImage from "@/assets/LogoFull.png";

const BASE_URL = "https://sabeelfarm.com";

export default function SeoHelmet({ page, lang = "en" }) {
  const SEO = {
    home: {
      en: {
        title: "Sabeel Stable | Horse Riding, Training, Boarding & Equestrian Club",
        desc: "Experience premier equestrian activities at Sabeel Stable. Offering professional horse riding lessons, horse boarding, guided trail rides, and horse training.",
        url: "/"
      },
      ar: {
        title: "إسطبل سبيل | ركوب الخيل، التدريب، الإيواء والنادي الفروسي",
        desc: "استمتع بأفضل تجربة فروسية في إسطبل سبيل. نقدم دروس ركوب الخيل للمبتدئين والمحترفين، إيواء وتدريب الخيل، والجولات الخلاء.",
        url: "/"
      }
    },
    about: {
      en: {
        title: "About Us | Sabeel Horse Riding Stable & Sanctuary",
        desc: "Learn about Sabeel Stable, our passion for horses, expert trainers, and our commitment to providing top-tier equestrian care and riding experiences.",
        url: "/about"
      },
      ar: {
        title: "عن الإسطبل | حكاية إسطبل سبيل للفروسية",
        desc: "تعرف على إسطبل سبيل، شغفنا بالخيل، فريق المدربين المحترفين، والتزامنا بتقديم أعلى مستويات الرعاية وتجارب ركوب الخيل.",
        url: "/about"
      }
    },
    contact: {
      en: {
        title: "Contact Us | Book Riding Lessons & Stabling - Sabeel Stable",
        desc: "Get in touch with Sabeel Stable to book riding lessons, inquire about horse boarding, schedule private events, or visit our facilities.",
        url: "/contact"
      },
      ar: {
        title: "تواصل معنا | حجز دروس الركوب وإيواء الخيل - إسطبل سبيل",
        desc: "تواصل مع إسطبل سبيل للحجز، والاستفسار عن خدمات إيواء وتدريب الخيل، وإقامة الفعاليات الخاصة أو زيارة المزرعة والإسطبل.",
        url: "/contact"
      }
    },
    faq: {
      en: {
        title: "FAQs | Riding Gear, Safety, Packages & Boarding - Sabeel Stable",
        desc: "Find answers about riding attire, beginner safety guidelines, horse boarding packages, session booking, and age requirements at Sabeel Stable.",
        url: "/faqs"
      },
      ar: {
        title: "الأسئلة الشائعة | معدات الركوب، السلامة، والباقات - إسطبل سبيل",
        desc: "إجابات عن الملابس المناسبة، قواعد السلامة للمبتدئين، باقات إيواء الخيل، مواعيد الجلسات، والشروط في إسطبل سبيل.",
        url: "/faqs"
      }
    },
    services: {
      en: {
        title: "Services & Programs | Riding Lessons, Boarding & Tours",
        desc: "Explore all Sabeel Stable services: beginner & advanced riding lessons, full-service horse boarding, desert/trail rides, and equine care.",
        url: "/services"
      },
      ar: {
        title: "خدماتنا وبرامجنا | دروس الركوب، الإيواء، والجولات - إسطبل سبيل",
        desc: "استكشف خدمات إسطبل سبيل: دروس ركوب الخيل لجميع المستويات، إيواء واستضافة الخيل، رحلات وجولات ركوب الخيل، والعناية بالفروسية.",
        url: "/services"
      }
    },
    serviceDetails: {
      en: {
        title: "Service Details | Sabeel Stable Equestrian Club",
        desc: "View session details, duration, trainer info, equipment requirements, and pricing for our horse riding packages and stable services.",
        url: "/service-details"
      },
      ar: {
        title: "تفاصيل الخدمة | نادي وإسطبل سبيل للفروسية",
        desc: "اطلع على تفاصيل الحصة، المدة، معلومات المدربين، المستلزمات المطلوبة، والأسعار لباقات ركوب وإيواء الخيل.",
        url: "/service-details"
      }
    },
  };

  const pageSEO = SEO[page] || SEO.home;
  const current = pageSEO[lang] || pageSEO.en;
  const url = BASE_URL + current.url;

  const keywordsEn =
    "Sabeel Stable, horse riding, equestrian club, horse riding lessons, horse boarding, horseback riding, trail rides, horse training, Arabian horses, stable services, riding school";
  const keywordsAr =
    "سبيل, إسطبل سبيل, ركوب الخيل, نادي فروسية, تعليم ركوب الخيل, إيواء الخيل, تدريب الخيل, خيل عربية اصيلة, مدرسة فروسية, رحلات خيل, فروسية";

  return (
    <Helmet>
      <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} />
      <title>{current.title}</title>
      <meta name="description" content={current.desc} />
      <meta name="keywords" content={lang === "ar" ? keywordsAr : keywordsEn} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="en" href={`${BASE_URL}${current.url}`} />
      <link rel="alternate" hrefLang="ar" href={`${BASE_URL}${current.url}`} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph Metadata */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={current.title} />
      <meta property="og:description" content={current.desc} />
      <meta property="og:image" content={defaultOgImage} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={lang === "ar" ? "إسطبل سبيل" : "Sabeel Stable"} />
      <meta property="og:locale" content={lang === "ar" ? "ar_EG" : "en_US"} />

      {/* Theme & Icons */}
      <meta name="theme-color" content="#4A2418" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href={defaultOgImage} />
    </Helmet>
  );
}