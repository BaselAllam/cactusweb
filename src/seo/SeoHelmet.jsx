import { Helmet } from "react-helmet";
import defaultOgImage from "@/assets/CactusLogoIcon.png";

const BASE_URL = "https://cactusmiles.com";

export default function SeoHelmet({ page, lang = "en" }) {
  const SEO = {
    home: {
      en: {
        title: "Cactus Miles | Tech-Driven Domestic E-Commerce Shipping & Logistics in Egypt",
        desc: "Empower your online business with fast, reliable domestic shipping across Egypt. Powered by smart routing, real-time tracking, and seamless e-commerce integration.",
        url: "/"
      },
      ar: {
        title: "كاكتوس مايلز | شحن داخلي وتوصيل متطور للتجارة الإلكترونية في مصر",
        desc: "حلول شحن وتوصيل محلي ذكية للشركات والمتاجر الإلكترونية في مصر. تتبع لحظي، سرعة في التسليم، وتقنيات ربط متكاملة لتنمو بتجارتك.",
        url: "/"
      }
    },
    about: {
      en: {
        title: "About Us | Transforming E-Commerce Logistics in Egypt - Cactus Miles",
        desc: "Discover how Cactus Miles leverages proprietary tech and a nationwide network to revolutionize last-mile delivery and fulfillment for businesses in Egypt.",
        url: "/about"
      },
      ar: {
        title: "عن الشركة | نعيد تعريف خدمات الشحن والتوصيل في مصر - كاكتوس مايلز",
        desc: "تعرف على كاكتوس مايلز وشغفنا بالحلول اللوجستية الرقمية. نربط التجار والعملاء في كافة محافظات مصر عبر بنية تكنولوجية متطورة.",
        url: "/about"
      }
    },
    contact: {
      en: {
        title: "Contact & Partnership | Onboard Your Business - Cactus Miles",
        desc: "Get in touch to open a merchant account, integrate your online store API, schedule bulk pick up, or consult with our logistics experts.",
        url: "/contact"
      },
      ar: {
        title: "تواصل معنا | اشحن مع كاكتوس مايلز وربط متجرك - تواصل مباشر",
        desc: "تواصل معنا لفتح حساب تجاري، الربط البرمجي للمتاجر، طلب مندوبين للشحن السريع، أو الاستفسار عن باقات الشحن للشركات في مصر.",
        url: "/contact"
      }
    },
    faq: {
      en: {
        title: "FAQs | Delivery Timelines, Cash on Delivery & Merchant Tools - Cactus Miles",
        desc: "Find answers regarding coverage areas across Egypt, daily COD remittances, API integration, return management, and parcel tracking.",
        url: "/faqs"
      },
      ar: {
        title: "الأسئلة الشائعة | التغطية، تحصيل الأموال، والتكامل البرمجي - كاكتوس مايلز",
        desc: "إجابات عن مناطق التغطية في مصر، تحصيل الدفع عند الاستلام، الربط مع المتاجر، مواعيد التوريد، وتتبع الشحنات.",
        url: "/faqs"
      }
    },
    services: {
      en: {
        title: "Services & Solutions | Domestic Delivery, COD & Fulfillment - Cactus Miles",
        desc: "Explore our tech-driven logistics suite: same-day & next-day delivery, automated COD management, e-commerce API integrations, and smart returns.",
        url: "/services"
      },
      ar: {
        title: "خدماتنا اللوجستية | الشحن السريع، التحصيل، والتكامل الذكي - كاكتوس مايلز",
        desc: "استكشف خدمات كاكتوس مايلز: توصيل في نفس اليوم/اليوم التالي داخل مصر، تحصيل الدفع عند الاستلام، الربط البرمجي، وإدارة المرتجعات.",
        url: "/services"
      }
    },
    serviceDetails: {
      en: {
        title: "Service Details | E-Commerce Delivery & Logistics - Cactus Miles",
        desc: "Review coverage zones, SLAs, weight tiers, API setup documentation, and competitive merchant pricing for Egyptian domestic shipping.",
        url: "/service-details"
      },
      ar: {
        title: "تفاصيل الخدمة | أسعار الشحن ومناطق التغطية في مصر - كاكتوس مايلز",
        desc: "اطلع على تفاصيل باقات الشحن الداخلي، أسعار المحافظات، اتفافيات مستوى الخدمة SLA، والدعم الفني للتجارة الإلكترونية.",
        url: "/service-details"
      }
    },
  };

  const pageSEO = SEO[page] || SEO.home;
  const current = pageSEO[lang] || pageSEO.en;
  const url = BASE_URL + current.url;

  const keywordsEn =
    "Cactus Miles, domestic shipping Egypt, e-commerce logistics Egypt, last mile delivery, fast parcel delivery, cash on delivery Egypt, COD remittance, courier service Cairo, e-commerce shipping API, smart logistics technology";
  const keywordsAr =
    "كاكتوس مايلز, شحن داخلي مصر, لوجستيات التجارة الإلكترونية, توصيل طرود, الدفع عند الاستلام مصر, شركة شحن متاجر, ربط متجر الكتروني, شحن القاهرة والمحافظات, تتبع الشحنات, شحن سريع للشركات";

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
      <meta property="og:site_name" content={lang === "ar" ? "كاكتوس مايلز" : "Cactus Miles"} />
      <meta property="og:locale" content={lang === "ar" ? "ar_EG" : "en_US"} />

      {/* Theme & Icons */}
      <meta name="theme-color" content="#4A2418" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href={defaultOgImage} />
    </Helmet>
  );
}