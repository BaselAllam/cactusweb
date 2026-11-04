import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LangContext";
import { SiteFooter, SiteHeader } from "@/components/layout/SiteChrome";
import SeoHelmet from "@/seo/SeoHelmet";
import ServiceImage, { getService, whatsappLink } from "@/routes/data";
import { track } from "../lib/pixel";

const ui = {
  en: {
    back: "Back to services", includes: "WHAT YOU'LL DO", facts: "DETAILS", whatsapp: "CHAT ON WHATSAPP",
    msg: (name: string) => `Hello, I'd like to know more about ${name}.`,
    notFound: "We couldn't find this service.",
    faqTitle: "FREQUENTLY ASKED QUESTIONS",
    faqs: [
      { q: "Do I need any riding experience?", a: "No. We have programs for complete beginners as well as experienced riders, and your trainer will start at your level." },
      { q: "What should I wear?", a: "Wear long pants and closed shoes with a small heel. Helmets and basic safety gear are available at the stable." },
      { q: "How do I book a session?", a: "Message us on WhatsApp with the service you want and your preferred days, and our team will confirm a time with you." },
      { q: "Can I try a first session before committing?", a: "Yes. Ask us on WhatsApp about a first session so you can meet the trainer and the horses." },
      { q: "Can I reschedule or cancel?", a: "Yes. Let us know on WhatsApp as early as possible and we'll help you find a new time." },
    ],
  },
  ar: {
    back: "العودة للخدمات", includes: "ماذا ستتعلم", facts: "التفاصيل", whatsapp: "تواصل عبر واتساب",
    msg: (name: string) => `مرحباً، أود معرفة المزيد عن ${name}.`,
    notFound: "تعذر العثور على هذه الخدمة.",
    faqTitle: "الأسئلة الشائعة",
    faqs: [
      { q: "هل أحتاج إلى خبرة سابقة في الفروسية؟", a: "لا. لدينا برامج للمبتدئين تماماً وللفرسان أصحاب الخبرة، وسيبدأ المدرب معك من مستواك." },
      { q: "ماذا أرتدي؟", a: "يُفضل ارتداء بنطلون طويل وحذاء مغلق بكعب صغير. الخوذة ومعدات الأمان الأساسية متوفرة في الإسطبل." },
      { q: "كيف أحجز حصة؟", a: "راسلنا عبر واتساب مع تحديد الخدمة والأيام المناسبة لك، وسيؤكد فريقنا الموعد معك." },
      { q: "هل يمكنني تجربة حصة أولى؟", a: "نعم. اسألنا عبر واتساب عن حصة تجريبية لتتعرف على المدرب والخيول." },
      { q: "هل يمكنني تغيير الموعد أو إلغاؤه؟", a: "نعم. أخبرنا عبر واتساب في أقرب وقت وسنساعدك في تحديد موعد جديد." },
    ],
  },
};

export default function ServiceDetailsPage() {
  const { slug } = useParams();
  const { lang, dir } = useLang();
  const t = ui[lang];
  const service = getService(slug);
  const Back = dir === "rtl" ? ArrowRight : ArrowLeft;

  if (!service) {
    return <main dir={dir} className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto flex min-h-[50vh] max-w-7xl flex-col items-center justify-center gap-4 px-5 text-center">
        <p className="text-sm text-muted-foreground">{t.notFound}</p>
        <Button variant="link" asChild className="text-xs"><Link to="/services"><Back />{t.back}</Link></Button>
      </div>
      <SiteFooter />
    </main>;
  }

  const { icon: Icon } = service;
  const s = service[lang];

  return <main dir={dir} className="min-h-screen bg-background text-foreground">
    <SeoHelmet page="serviceDetails" lang={lang} />
    <SiteHeader />

    <section className="mx-auto max-w-6xl px-5 pt-8 sm:px-8">
      <Button variant="link" asChild className="h-auto p-0 text-xs"><Link to="/services"><Back />{t.back}</Link></Button>
    </section>

    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:px-8 md:grid-cols-2 md:py-16 lg:gap-16">
     <div className={`relative min-w-0 md:order-2`}>
        <ServiceImage src={service.image} alt={s.name} icon={Icon} className="aspect-[4/3] w-full transition duration-500 hover:scale-105" />
      <span className="absolute bottom-3 start-3 flex items-center gap-2 rounded-sm bg-background/85 px-3 py-2 text-xs backdrop-blur">
        <Icon className="size-4 text-primary" />{s.tagline}
      </span>
    </div>

      <div className="flex min-w-0 flex-col justify-center">
        <p className="text-xs uppercase tracking-[0.28em] text-primary">{s.tagline}</p>
        <h1 className="mt-3 font-display text-5xl leading-none sm:text-6xl">{s.name}</h1>
        <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground">{s.description}</p>

        <ul className="mt-6 grid max-w-lg gap-3">
          {s.points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />{point}
            </li>
          ))}
        </ul>

        <div className="mt-8 max-w-md">
          <Button variant="luxury" size="lg" asChild className="w-full">
            <a href={whatsappLink(t.msg(s.name))} target="_blank" rel="noopener noreferrer"
              onClick={() => track("Contact", { content_name: s.name, content_category: "service" })}>
              <MessageCircle className="size-5" />{t.whatsapp}
            </a>
          </Button>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-5 pb-14 sm:px-8">
      <Title>{t.facts}</Title>
      <dl className="grid gap-3 sm:grid-cols-3">
        {s.facts.map(([label, value]) => (
          <div key={label} className="min-w-0 rounded-sm border border-border bg-card p-4">
            <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</dt>
            <dd className="mt-1 text-sm">{value}</dd>
          </div>
        ))}
      </dl>
    </section>

    <section className="mx-auto max-w-3xl px-5 pb-16 sm:px-8">
      <Title>{t.faqTitle}</Title>
      <div className="divide-y divide-border rounded-sm border border-border bg-card">
        {t.faqs.map(({ q, a }) => (
          <details key={q} className="group px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
              {q}
              <ChevronDown className="size-4 shrink-0 text-primary transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{a}</p>
          </details>
        ))}
      </div>
    </section>
    <SiteFooter />
  </main>;
}

function Title({ children }: { children: string }) {
  return <div className="mb-8 flex items-center justify-center gap-4"><span className="h-px w-12 bg-primary/70" /><h2 className="font-display text-xl uppercase text-primary sm:text-2xl">{children}</h2><span className="h-px w-12 bg-primary/70" /></div>;
}