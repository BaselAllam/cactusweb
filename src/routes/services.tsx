import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Award, Check, Clock, HeartHandshake, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LangContext";
import { SiteFooter, SiteHeader } from "@/components/layout/SiteChrome";
import SeoHelmet from "@/seo/SeoHelmet";
import { track } from "../lib/pixel";
import ServiceImage, { categories, services, whatsappLink } from "./data";
import heroImage from "@/assets/hero.jpg";

const ui = {
  en: {
    title: "OUR SERVICES",
    sub: "Training, boarding and breeding services for horse lovers, delivered by experienced and caring teams.",
    jump: "Jump to a section",
    details: "View full details",
    stepsTitle: "HOW IT WORKS",
    steps: [
      { t: "Message us", d: "Tell us what you need and your preferred days on WhatsApp." },
      { t: "Meet your team", d: "We match you with the right trainer, horse or care plan." },
      { t: "Start with us", d: "Begin in a safe, relaxed and well-organised setting." },
      { t: "Grow at your pace", d: "Move forward step by step as you gain confidence." },
    ],
    whyTitle: "WHY CHOOSE US",
    why: [
      { i: ShieldCheck, t: "Safety first", d: "Helmets, supervised sessions and calm horses chosen for training." },
      { i: Award, t: "Experienced team", d: "Patient trainers and caretakers who know horses well." },
      { i: HeartHandshake, t: "Horses you can trust", d: "Well-cared-for horses that are used to new riders." },
      { i: Clock, t: "Flexible schedule", d: "Weekday and weekend slots to fit your routine." },
    ],
    ctaTitle: "Not sure which service fits?",
    ctaText: "Tell us what you need and we'll recommend the right one.",
    whatsapp: "CHAT ON WHATSAPP",
    msg: "Hello, I'd like help choosing the right service.",
  },
  ar: {
    title: "خدماتنا",
    sub: "خدمات تدريب وإيواء وتربية لمحبي الخيول، يقدمها فريق ذو خبرة واهتمام.",
    jump: "انتقل إلى القسم",
    details: "عرض كل التفاصيل",
    stepsTitle: "كيف تبدأ",
    steps: [
      { t: "راسلنا", d: "أخبرنا بما تحتاجه والأيام المناسبة لك عبر واتساب." },
      { t: "تعرّف على فريقك", d: "نختار لك المدرب أو الحصان أو خطة الرعاية المناسبة." },
      { t: "ابدأ معنا", d: "نبدأ في أجواء آمنة ومريحة ومنظمة." },
      { t: "تقدّم بالسرعة التي تناسبك", d: "تتقدم خطوة بخطوة كلما زادت ثقتك." },
    ],
    whyTitle: "لماذا تختارنا",
    why: [
      { i: ShieldCheck, t: "الأمان أولاً", d: "خوذات وحصص تحت الإشراف وخيول هادئة مخصصة للتدريب." },
      { i: Award, t: "فريق ذو خبرة", d: "مدربون ومشرفون صبورون يعرفون الخيول جيداً." },
      { i: HeartHandshake, t: "خيول تثق بها", d: "خيول معتنى بها ومعتادة على الفرسان الجدد." },
      { i: Clock, t: "مواعيد مرنة", d: "مواعيد خلال الأسبوع ونهايته تناسب جدولك." },
    ],
    ctaTitle: "لست متأكداً أي خدمة تناسبك؟",
    ctaText: "أخبرنا بما تحتاجه وسنرشح لك الخدمة المناسبة.",
    whatsapp: "تواصل عبر واتساب",
    msg: "مرحباً، أحتاج مساعدة في اختيار الخدمة المناسبة.",
  },
};

export default function ServicesPage() {
  const { lang, dir } = useLang();
  const t = ui[lang];
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return <main dir={dir} className="min-h-screen bg-background text-foreground">
    <SeoHelmet page="services" lang={lang} />
    <SiteHeader />

    {/* Hero */}
    <section className="relative isolate overflow-hidden border-b border-border/70">
      <ServiceImage src={heroImage} alt="" icon={ShieldCheck} eager className="absolute inset-0 -z-20 size-full" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 via-background/80 to-background" />
      <div className="mx-auto max-w-6xl px-5 pb-12 pt-16 text-center sm:px-8 sm:pb-16 sm:pt-24">
        <h1 className="font-display text-4xl text-primary sm:text-6xl">{t.title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-foreground/80">{t.sub}</p>

        <p className="mb-4 mt-10 text-xs text-muted-foreground">{t.jump}</p>
        <nav className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-3">
          {categories.map(({ key, icon: Icon, ...rest }) => (
            <a key={key} href={`#${key}`} className="group grid place-items-center gap-2 rounded-sm border border-border bg-card/70 px-3 py-4 backdrop-blur transition hover:border-primary/70">
              <Icon className="size-6 text-primary" />
              <span className="font-display text-xs leading-tight sm:text-sm">{rest[lang].title}</span>
            </a>
          ))}
        </nav>
      </div>
    </section>

    {/* Categories */}
    {categories.map(({ key, ...cat }) => {
      const c = cat[lang];
      const list = services.filter((s) => s.category === key);
      return (
        <section key={key} id={key} className="scroll-mt-24 border-b border-border/70 last:border-b-0">
          <div className="mx-auto max-w-6xl px-5 pt-16 text-center sm:px-8 sm:pt-20">
            <Title>{c.title}</Title>
            <p className="mx-auto -mt-4 max-w-xl text-sm leading-7 text-muted-foreground">{c.sub}</p>
          </div>

          <div className="mx-auto max-w-6xl divide-y divide-border/70 px-5 sm:px-8">
            {list.map(({ slug, icon: Icon, image, ...rest }, i) => {
              const s = rest[lang];
              return (
                <section key={slug} id={slug} className="grid scroll-mt-24 items-center gap-8 py-14 md:grid-cols-2 md:gap-14 md:py-20">
                  <div className={`relative min-w-0 ${i % 2 ? "md:order-2" : ""}`}>
                    <Link to={`/services/${slug}`} aria-label={s.name} className="block overflow-hidden rounded-sm border border-border bg-card">
                      <ServiceImage src={image} alt={s.name} icon={Icon} className="aspect-[4/3] w-full transition duration-500 hover:scale-105" />
                    </Link>
                    <span className="absolute bottom-3 start-3 flex items-center gap-2 rounded-sm bg-background/85 px-3 py-2 text-xs backdrop-blur">
                      <Icon className="size-4 text-primary" />{s.tagline}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-display text-4xl leading-none sm:text-5xl">{s.name}</h2>
                    <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">{s.description}</p>

                    <ul className="mt-6 grid max-w-lg gap-3 sm:grid-cols-2">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{p}</li>
                      ))}
                    </ul>

                    <dl className="mt-6 grid max-w-lg grid-cols-3 divide-x divide-border rounded-sm border border-border bg-card rtl:divide-x-reverse">
                      {s.facts.map(([label, value]) => (
                        <div key={label} className="min-w-0 p-3">
                          <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</dt>
                          <dd className="mt-1 text-sm">{value}</dd>
                        </div>
                      ))}
                    </dl>

                    <ul className="mt-6 max-w-lg space-y-1 text-xs leading-6 text-muted-foreground">
                      {s.benefits.map((b) => <li key={b}>– {b}</li>)}
                    </ul>

                    <Button variant="luxury" asChild className="mt-8">
                      <Link to={`/services/${slug}`}>{t.details}<Arrow className="size-4" /></Link>
                    </Button>
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      );
    })}

    {/* How it works */}
    <section className="border-y border-border/70 bg-card/30 px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Title>{t.stepsTitle}</Title>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((s, i) => (
            <li key={s.t} className="rounded-sm border border-border bg-card p-5">
              <span className="font-display text-3xl text-primary">{(i + 1).toLocaleString(lang === "ar" ? "ar-EG" : "en-US")}</span>
              <h3 className="mt-3 text-sm font-medium">{s.t}</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* Why us */}
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <Title>{t.whyTitle}</Title>
      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {t.why.map(({ i: Icon, t: title, d }) => (
          <div key={title} className="flex gap-4">
            <Icon className="mt-1 size-6 shrink-0 text-primary" />
            <div><h3 className="text-sm font-medium">{title}</h3><p className="mt-1 text-xs leading-6 text-muted-foreground">{d}</p></div>
          </div>
        ))}
      </div>
    </section>

    {/* Closing CTA */}
    <section className="border-t border-border/70 bg-card/30 px-5 py-16 text-center sm:px-8">
      <h2 className="font-display text-3xl text-primary sm:text-4xl">{t.ctaTitle}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">{t.ctaText}</p>
      <Button variant="luxury" size="lg" asChild className="mt-7">
        <a href={whatsappLink(t.msg)} target="_blank" rel="noopener noreferrer" onClick={() => track("Contact", { content_category: "services" })}>
          <MessageCircle className="size-5" />{t.whatsapp}
        </a>
      </Button>
    </section>
    <SiteFooter />
  </main>;
}

function Title({ children }: { children: string }) {
  return <div className="mb-10 flex items-center justify-center gap-4"><span className="h-px w-12 bg-primary/70" /><h2 className="font-display text-xl uppercase text-primary sm:text-2xl">{children}</h2><span className="h-px w-12 bg-primary/70" /></div>;
}