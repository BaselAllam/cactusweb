import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Eye, Gem, Heart, Leaf, Quote, Target } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { SiteFooter, SiteHeader } from "@/components/layout/SiteChrome";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero.jpg";
import founderPP from "@/assets/ba.jpg";
import SeoHelmet from "@/seo/SeoHelmet";

const copy = {
  en: {
    eyebrow: "About Us", title: "The Farm's Goodness", sub: "Sabeel was born from a simple belief: the food we choose for our own homes is the food we should bring to yours.",
    founderEyebrow: "Founder's Message", founderTitle: "From our farm to your home",
    pull: "Good food should taste like home, wherever it reaches you.",
    founder: [
      "When we started Sabeel, we wanted to share what we grew up with: honey from the hive, tahini made the old way, fresh cheese and milk, and birds raised with care. Simple, natural food that tastes the way it should.",
      "Everything we sell is what we would put on our own table. We never take shortcuts, because real flavor comes from patience, honest ingredients, and respect for the land.",
      "Thank you for letting our farm be part of your family's table. It is the greatest honor of our work.",
    ],
    name: "Bassel Allam", role: "Founder of Sabeel Farm",
    purposeEyebrow: "What Drives Us", purposeTitle: "Our vision & mission",
    vision: "Our Vision", visionText: "To become the most trusted name in natural farm food, a path people take to bring real, honest flavor into every home.",
    mission: "Our Mission", missionText: "To bring natural products from our farm straight to your door at fair prices, so every family can enjoy food the way it was meant to be.",
    values: [["Natural", "Honest products, no shortcuts."], ["Fresh", "From our farm straight to your door."], ["Fair", "Natural prices, like our products."]],
    ctaTitle: "Bring the farm's goodness to your table", cta: "Explore our products",
  },
  ar: {
    eyebrow: "من نحن", title: "خير المزرعة", sub: "سبيل بدأت من فكرة بسيطة: الي نرضاه لبيتنا هو الي نوصله لبيتك.",
    founderEyebrow: "رسالة المؤسس", founderTitle: "من مزرعتنا لبيتك",
    pull: "الأكل الحلو لازم يطعمه زي أكل البيت، مهما وصل لك.",
    founder: [
      "لما بدأنا سبيل، كنا عايزين نشارك الناس الي اتربينا عليه: عسل من الخلية، وطحينة بالطريقة القديمة، وجبنة ولبن طازج، وطيور اتربّت بحب. أكل بسيط وطبيعي وطعمه زي ما لازم يكون.",
      "كل الي بنبيعه هو نفسه الي بنحطه على سفرتنا. مبنختصرش في حاجة، لأن الطعم الحقيقي بييجي من الصبر والمكونات الصادقة واحترام الأرض.",
      "شكراً إنكم خلّيتوا مزرعتنا جزء من سفرة بيوتكم، وده أكبر شرف في شغلنا.",
    ],
    name: "باسل علام", role: "مؤسس مزرعة سبيل",
    purposeEyebrow: "الي بيحركنا", purposeTitle: "رؤيتنا ورسالتنا",
    vision: "رؤيتنا", visionText: "إننا نبقى الاسم الأكتر ثقة في منتجات المزرعة الطبيعية، سبيل الناس لطعم حقيقي وصادق في كل بيت.",
    mission: "رسالتنا", missionText: "نوصّل منتجات مزرعتنا الطبيعية لباب بيتك بأسعار طبيعية، عشان كل أسرة تاكل الأكل زي ما لازم يكون.",
    values: [["طبيعي", "منتجات صادقة من غير اختصارات."], ["طازج", "من مزرعتنا لحد باب بيتك."], ["بسعر عادل", "أسعار طبيعية زي منتجاتنا."]],
    ctaTitle: "هات خير المزرعة لسفرتك", cta: "اكتشف منتجاتنا",
  },
};

const valueIcons = [Gem, Leaf, Heart];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [el]);
  return <div ref={setEl} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-1000 ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${className}`}>{children}</div>;
}

function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return <p className={`flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-primary ${center ? "justify-center" : ""}`}><span className="h-px w-8 bg-primary/60" />{children}{center && <span className="h-px w-8 bg-primary/60" />}</p>;
}

export default function AboutPage() {
  const { lang, dir } = useLang();
  const t = copy[lang];
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const pad = (n: number) => String(n).padStart(2, "0");

  return <main dir={dir} className="min-h-screen overflow-x-clip bg-background text-foreground selection:bg-primary/30 parchment">
    <SeoHelmet page="about" lang={lang} />
    <SiteHeader />

    {/* HERO */}
    <section className="relative isolate overflow-hidden border-b border-border/60">
      <img src={hero} alt="" className="absolute inset-0 -z-20 size-full scale-105 object-cover opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/75 to-background/30" />
      <div className="pointer-events-none absolute inset-4 -z-10 hidden border border-primary/20 sm:block" />
      <div className="pointer-events-none absolute -start-24 top-1/3 -z-10 size-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="animate-rise mx-auto max-w-4xl px-5 py-28 text-center sm:px-8 sm:py-40">
        <Eyebrow center>{t.eyebrow}</Eyebrow>
        <h1 className="mt-7 font-display text-5xl font-light leading-[0.95] tracking-tight sm:text-8xl">{t.title}</h1>
        <p className="mx-auto mt-8 max-w-xl text-sm leading-8 text-foreground/70 sm:text-base">{t.sub}</p>
        <span className="mx-auto mt-10 block h-12 w-px bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>

    {/* FOUNDER */}
    <section className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute -end-32 top-1/3 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal>
          <div className="relative mx-auto max-w-md">
            <div className="absolute -bottom-5 -end-5 size-full border border-primary/40" />
            <img src={founderPP} alt={t.founderTitle} loading="lazy" className="relative aspect-[4/5] w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-6 pt-20">
              <p className="font-display text-2xl font-light italic text-primary">{t.name}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-foreground/70">{t.role}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <Eyebrow>{t.founderEyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-light leading-[1.05] tracking-tight sm:text-6xl">{t.founderTitle}</h2>
          <div className="mt-8 flex gap-5 border-s border-primary/50 ps-6">
            <p className="font-display text-2xl font-light italic leading-snug text-primary sm:text-3xl">{t.pull}</p>
          </div>
          <div className="mt-8 space-y-5">
            {t.founder.map((p, i) => <p key={p} className={`text-sm leading-8 sm:text-base ${i === 0 ? "text-foreground/85 first-letter:float-start first-letter:me-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-primary" : "text-muted-foreground"}`}>{p}</p>)}
          </div>
          <div className="mt-10 flex items-center gap-5">
            <Quote className="size-8 shrink-0 text-primary/50" strokeWidth={1.3} />
            <div>
              <p className="font-display text-3xl font-light italic text-primary">{t.name}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{t.role}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* VISION & MISSION */}
    <section className="relative overflow-hidden border-y border-border/60 bg-card/40 px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute -start-32 bottom-0 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mb-14 text-center sm:mb-20">
          <Eyebrow center>{t.purposeEyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-light tracking-tight sm:text-6xl">{t.purposeTitle}</h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {[
            { Icon: Eye, label: t.vision, text: t.visionText },
            { Icon: Target, label: t.mission, text: t.missionText },
          ].map(({ Icon, label, text }, i) => (
            <Reveal key={label} delay={i * 150}>
              <article className="group relative h-full overflow-hidden border border-border/80 bg-background/60 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/10 sm:p-12">
                <span aria-hidden className="pointer-events-none absolute -end-2 -top-6 font-display text-[9rem] font-light leading-none text-primary/[0.07] transition-colors duration-500 group-hover:text-primary/15">{pad(i + 1)}</span>
                <span className="relative grid size-14 place-items-center rounded-full border border-primary/50 text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground"><Icon className="size-6" strokeWidth={1.3} /></span>
                <h3 className="relative mt-8 font-display text-3xl font-light tracking-tight sm:text-4xl">{label}</h3>
                <span className="relative mt-5 block h-px w-12 bg-primary transition-all duration-500 group-hover:w-24" />
                <p className="relative mt-6 text-sm leading-8 text-muted-foreground sm:text-base">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Values */}
        <div className="mt-5 grid divide-y divide-border/60 border border-border/80 bg-background/40 sm:grid-cols-3 sm:divide-x sm:divide-y-0 rtl:sm:divide-x-reverse">
          {t.values.map(([title, desc], i) => { const Icon = valueIcons[i]; return (
            <Reveal key={title} delay={i * 100} className="flex items-center gap-4 p-6 sm:justify-center">
              <Icon className="size-5 shrink-0 text-primary" strokeWidth={1.4} />
              <div><p className="text-sm tracking-wide">{title}</p><p className="mt-0.5 text-xs text-muted-foreground">{desc}</p></div>
            </Reveal>
          ); })}
        </div>
      </div>
    </section>

    {/* CLOSING CTA */}
    <section className="relative isolate overflow-hidden">
      <img src={hero} alt="" loading="lazy" className="absolute inset-0 -z-20 size-full object-cover opacity-30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/70 to-background" />
      <Reveal className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <h2 className="font-display text-4xl font-light leading-tight tracking-tight sm:text-6xl">{t.ctaTitle}</h2>
        <Button asChild variant="luxury" size="lg" className="mt-10 bg-primary text-primary-foreground shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.6)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"><Link to="/products">{t.cta}<Arrow /></Link></Button>
      </Reveal>
    </section>

    <SiteFooter />
  </main>;
}