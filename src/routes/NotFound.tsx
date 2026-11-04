import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { Logo, SiteFooter, SiteHeader } from "@/components/layout/SiteChrome";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero.jpg";
import { useCategories } from "@/hooks/useSiteData";
import LoadingSpinner from "@/components/LoadingSpinner";
import { imgUrl } from "@/services/api";

const copy = {
  en: {
    eyebrow: "Error 404",
    title: "This page wandered off the farm",
    sub: "The page you're looking for doesn't exist or has moved. Let us walk you back to the good stuff.",
    home: "BACK TO HOME", shop: "BROWSE PRODUCTS",
    discover: "Or discover",
    cats: ["Honey", "Cheese", "Milk & Dairy"],
    more: [["About us", "/about"], ["Contact", "/contact"]],
    tried: "Requested",
    docTitle: "Page not found | Sabeel Farm",
  },
  ar: {
    eyebrow: "خطأ 404",
    title: "الصفحة دي تاهت في الغيط 🌾",
    sub: "الصفحة اللي بتدوّر عليها مش موجودة أو اتنقلت. تعالى نرجّعك لخير المزرعة.",
    home: "العودة للرئيسية", shop: "تصفح المنتجات",
    discover: "أو اكتشف",
    cats: ["العسل", "الجبن", "الألبان ومنتجاتها"],
    more: [["من نحن", "/about"], ["تواصل معنا", "/contact"]],
    tried: "الرابط المطلوب",
    docTitle: "الصفحة غير موجودة | مزرعة سبيل",
  },
};

// Soft wisps of "scent" that rise behind the content.
const wisps = [
  { left: "8%", size: 120, delay: 0, dur: 14 },
  { left: "22%", size: 180, delay: 3, dur: 18 },
  { left: "38%", size: 100, delay: 6, dur: 13 },
  { left: "55%", size: 200, delay: 1.5, dur: 20 },
  { left: "70%", size: 130, delay: 8, dur: 15 },
  { left: "84%", size: 170, delay: 4.5, dur: 17 },
];

const styles = `
@keyframes tayeb-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
@keyframes tayeb-wisp { 0% { transform: translateY(0) scale(.6); opacity: 0; } 20% { opacity: .5; } 100% { transform: translateY(-70vh) scale(1.5); opacity: 0; } }
@keyframes tayeb-pulse { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
.tayeb-rise { animation: tayeb-rise .9s cubic-bezier(.2,.7,.2,1) both; }
.tayeb-wisp { animation: tayeb-wisp linear infinite; }
.tayeb-pulse { animation: tayeb-pulse 3s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) { .tayeb-rise, .tayeb-wisp, .tayeb-pulse { animation: none; } .tayeb-wisp { display: none; } }
`;

export default function NotFound() {
  const { lang, dir } = useLang();
  const t = copy[lang];
  const { pathname } = useLocation();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const stage = useRef<HTMLElement>(null);
  const { data: categories = [], isLoading: catsLoading } = useCategories();

  useEffect(() => {
    const prevTitle = document.title;
    document.title = t.docTitle;
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => { document.title = prevTitle; meta.remove(); };
  }, [t.docTitle]);

  const onMove = (e: React.PointerEvent) => {
    const el = stage.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
    el.style.setProperty("--mx", String((x - 0.5) * 2));
    el.style.setProperty("--my", String((y - 0.5) * 2));
  };

  const digit = "font-display text-[7.5rem] font-light leading-none text-transparent [-webkit-text-stroke:1.5px_hsl(var(--primary)/0.75)] sm:text-[12rem] lg:text-[15rem]";

  return <main dir={dir} className="flex min-h-screen flex-col overflow-x-clip bg-background text-foreground selection:bg-primary/30 parchment">
    <style>{styles}</style>
    <SiteHeader />

    <section
      ref={stage}
      onPointerMove={onMove}
      style={{ "--gx": "50%", "--gy": "40%", "--mx": "0", "--my": "0" } as React.CSSProperties}
      className="relative isolate flex flex-1 items-center justify-center overflow-hidden px-5 py-16 sm:px-8 sm:py-20"
    >
      {/* Backdrop */}
      <img src={hero} alt="" className="absolute inset-0 -z-30 size-full object-cover opacity-25" />
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-background via-background/75 to-background" />
      <div className="pointer-events-none absolute inset-0 -z-10 transition-[background] duration-300" style={{ background: "radial-gradient(520px circle at var(--gx) var(--gy), hsl(var(--primary) / 0.16), transparent 60%)" }} />
      <div className="pointer-events-none absolute inset-4 -z-10 hidden border border-primary/20 lg:block" />
      {wisps.map((w, i) => (
        <span key={i} aria-hidden className="tayeb-wisp pointer-events-none absolute -bottom-20 -z-10 rounded-full bg-primary/20 blur-3xl" style={{ left: w.left, width: w.size, height: w.size, animationDelay: `${w.delay}s`, animationDuration: `${w.dur}s` }} />
      ))}

      <div className="tayeb-rise mx-auto w-full max-w-3xl text-center">
        {/* 4 [logo] 4 */}
        <div dir="ltr" aria-hidden className="flex items-center justify-center gap-1 sm:gap-6">
          <span className={digit} style={{ transform: "translate(calc(var(--mx) * -8px), calc(var(--my) * -5px))" }}>4</span>
          <span className="text-primary drop-shadow-[0_0_28px_hsl(var(--primary)/0.5)]">
            <Logo className="h-28 w-auto sm:h-44 lg:h-56" />
          </span>
          <span className={digit} style={{ transform: "translate(calc(var(--mx) * -8px), calc(var(--my) * -5px))" }}>4</span>
        </div>
        <h1 className="sr-only">404</h1>

        <p className="mt-9 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.4em] text-primary"><span className="h-px w-8 bg-primary/60" /><span className="tayeb-pulse">{t.eyebrow}</span><span className="h-px w-8 bg-primary/60" /></p>
        <h2 className="mt-5 font-display text-3xl font-light leading-tight tracking-tight sm:text-5xl">{t.title}</h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-8 text-muted-foreground">{t.sub}</p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button asChild variant="luxury" size="lg" className="bg-primary text-primary-foreground shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.6)] transition-transform hover:-translate-y-0.5 hover:bg-primary/90"><Link to="/"><Home className="size-4" />{t.home}</Link></Button>
          <Button asChild variant="luxury" size="lg" className="transition-transform hover:-translate-y-0.5"><Link to="/products">{t.shop}<Arrow /></Link></Button>
        </div>

        {/* Discover */}
        <div className="mt-14">
          <p className="mb-5 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.35em] text-muted-foreground"><span className="h-px w-8 bg-border" />{t.discover}<span className="h-px w-8 bg-border" /></p>
          <div className="mx-auto grid max-w-xl grid-cols-3 gap-3 sm:gap-4">
            {catsLoading ? <LoadingSpinner /> : categories.map((i) => (
              <Link key={i.id} to="/products" className="group relative block aspect-[4/5] overflow-hidden border border-border/70 transition-all duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <img src={`${imgUrl}${i.image}`} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition duration-[1200ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
                <div className="pointer-events-none absolute inset-2 border border-primary/0 transition-colors duration-500 group-hover:border-primary/40" />
                <span className="absolute inset-x-0 bottom-0 p-3 font-display text-xs uppercase tracking-wider sm:p-4 sm:text-sm">{lang === 'ar' ? i.category_name_ar : i.category_name}</span>
              </Link>
            ))}
          </div>
          <div className="mt-7 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            {t.more.map(([label, to]) => <Link key={label} to={to} className="underline-offset-4 transition-colors hover:text-primary hover:underline">{label}</Link>)}
          </div>
          <p dir="ltr" className="mx-auto mt-8 max-w-full truncate text-[11px] text-muted-foreground/60">{t.tried}: <span className="text-primary/80">{pathname}</span></p>
        </div>
      </div>
    </section>

    <SiteFooter />
  </main>;
}