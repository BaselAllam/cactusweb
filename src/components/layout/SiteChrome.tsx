import { Link, useLocation } from "react-router-dom";
import { ArrowUp, Facebook, Gift, Instagram, ShieldCheck, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { useLang } from "@/contexts/LangContext";
import logoImg from "@/assets/LogoTrans.png";
import { useCategories } from "@/hooks/useSiteData";
import LoadingSpinner from "../LoadingSpinner";

const chrome = {
  en: { nav: ["Home", "Services", "About", "Contact", "Faqs"], open: "Open menu", close: "Close menu", slogan: "The farm's goodness, to your doorstep.", follow: "Follow Us", tax: "Tax Number", rights: "© 2026 Sabeel Farm. All rights reserved." },
  ar: { nav: ["الرئيسية", "خدماتنا", "من نحن", "تواصل معنا", "الأسئلة الشائعة"], open: "فتح القائمة", close: "إغلاق القائمة", slogan: "خير المزرعة لباب بيتك 🚜", follow: "تابعنا", tax: "الرقم الضريبي", rights: "© 2026 مزرعة سبيل. جميع الحقوق محفوظة." },
};

export function Logo({ className = "h-11 w-auto" }: { className?: string }) {
  return (
    <img
      src={logoImg}
      alt="Sabeel Farm"
      width={250}
      height={250}
      decoding="async"
      draggable={false}
      className={`select-none object-contain ${className}`}
    />
  );
}

function NavItem({ i, label, className, onClick, active }: { i: number; label: string; className: string; onClick?: () => void; active?: boolean }) {
  const to = i === 0 ? "/" : i === 1 ? "/services" : i === 2 ? "/about" : i === 3 ? "/contact" : "/faqs";
  return <Link to={to} onClick={onClick} aria-current={active ? "page" : undefined} className={`${className} ${active ? "!text-primary after:!w-full" : ""}`}>{label}</Link>;
}

export function SiteHeader() {
  const { lang, setLang } = useLang();
  const t = chrome[lang];
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    if (!menu) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [menu]);

  const link = "relative text-[11px] uppercase tracking-[0.22em] text-foreground/70 transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none after:absolute after:-bottom-2 after:start-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-500 hover:after:w-full";
  const langBtn = (code: "en" | "ar", text: string) => (
    <button onClick={() => setLang(code)} aria-pressed={lang === code} className={`rounded-full px-3 py-1 transition-colors ${lang === code ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{text}</button>
  );

  return <header className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-500 ${scrolled || menu ? "h-20 border-border/70 bg-background/90 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)]" : "h-20 border-border/30 bg-background/60"}`}>
    <div className="mx-auto grid h-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-5 px-5 sm:px-8">
      <div className="flex items-center gap-1 justify-self-start rounded-full border border-border/70 p-0.5 text-[11px] tracking-widest">
        {langBtn("en", "EN")}{langBtn("ar", "عربي")}
      </div>

      <Link to="/" aria-label="Sabeel Farm home" className="group justify-self-center text-primary transition-transform duration-500 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60">
        <Logo className={`w-auto transition-all duration-500 group-hover:drop-shadow-[0_0_10px_hsl(var(--primary)/0.55)] ${scrolled || menu ? "h-20" : "h-20"}`} />
      </Link>

      <nav aria-label="Main" className="hidden items-center gap-9 justify-self-end lg:flex">
        {t.nav.map((item, i) => <NavItem key={item} i={i} label={item} active={(i === 0 && pathname === "/") || (i === 1 && pathname.startsWith("/services")) || (i === 2 && pathname.startsWith("/about")) || (i === 3 && pathname.startsWith("/contact")) || (i === 4 && pathname === "/faqs")} className={link} />)}
      </nav>
    </div>

    <nav id="mobile-nav" aria-label="Mobile" className={`absolute inset-x-0 top-full h-[calc(100svh-4rem)] overflow-y-auto bg-background/98 backdrop-blur-xl transition-all duration-500 lg:hidden ${menu ? "visible opacity-100" : "invisible opacity-0"}`}>
      <div className="mx-auto flex max-w-md flex-col px-8 pt-6">
        {t.nav.map((item, i) => (
          <NavItem key={item} i={i} label={item} onClick={() => setMenu(false)} active={(i === 0 && pathname === "/") || (i === 1 && pathname.startsWith("/services")) || (i === 2 && pathname.startsWith("/about")) || (i === 3 && pathname.startsWith("/contact")) || (i === 4 && pathname === "/faqs")}
            className="flex items-center justify-between border-b border-border/40 py-5 font-display text-2xl font-light tracking-wide transition-colors hover:text-primary" />
        ))}
        <div className="mt-10 flex justify-center text-primary"><Logo className="h-14 w-auto opacity-40" /></div>
      </div>
    </nav>
  </header>;
}

const footerCopy = {
  en: {
    explore: "Explore", shop: "Shop", company: "Company", faq: "FAQ", top: "Back to top",
    categories: ["Honey", "Tahini", "Cheese", "Milk & Dairy", "Birds & Meats"],
    perks: [["Same-day delivery", "Straight to your door"], ["Natural products", "The same ones we choose for our own homes"], ["Fair prices", "As natural as our products"]],
  },
  ar: {
    explore: "استكشف", shop: "تسوق", company: "الشركة", faq: "الأسئلة الشائعة", top: "العودة للأعلى",
    categories: ["العسل", "الطحينة", "الجبن", "الألبان ومنتجاتها", "الطيور واللحوم"],
    perks: [["توصيل في نفس اليوم 🛵", "خير المزرعة لباب بيتك"], ["منتجات طبيعية ❤️", "الي نرضاها لبيتنا نوصلها لباب بيتك"], ["أسعار طبيعية 🫶", "زي منتجاتنا بالظبط"]],
  },
};

const perkIcons = [Truck, ShieldCheck, Gift];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/_sabeelfarm/?hl=en", icon: <Instagram className="size-4" /> },
  { label: "Facebook", href: "https://www.facebook.com/sabeelfarm", icon: <Facebook className="size-4" /> },
];

export function SiteFooter({ id }: { id?: string }) {
  const { lang, dir } = useLang();
  const t = chrome[lang];
  const f = footerCopy[lang];
  const rights = t.rights.replace(/\d{4}/, String(new Date().getFullYear()));
  const { data: categories = [], isLoading: catsLoading } = useCategories();

  const link = "group inline-flex items-center gap-2 text-[13px] text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary rtl:hover:-translate-x-1";
  const heading = "mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-primary after:h-px after:flex-1 after:bg-border/70";

  return <footer id={id} dir={dir} className="relative overflow-hidden border-t border-border bg-card/40">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
    <div className="pointer-events-none absolute -bottom-16 -end-10 text-primary opacity-[0.05]"><Logo className="h-[26rem] w-auto" /></div>
    <div className="pointer-events-none absolute -start-24 top-1/2 size-72 rounded-full bg-primary/10 blur-3xl" />

    <div className="relative border-b border-border/60">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-border/60 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 rtl:sm:divide-x-reverse">
        {f.perks.map(([title, desc], i) => { const Icon = perkIcons[i]; return (
          <div key={title} className="flex items-center gap-4 py-5 sm:justify-center sm:px-6">
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-primary/40 text-primary"><Icon className="size-5" strokeWidth={1.4} /></span>
            <div><p className="text-sm">{title}</p><p className="text-[11px] text-muted-foreground">{desc}</p></div>
          </div>
        ); })}
      </div>
    </div>

    <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-12 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Link to="/" aria-label="Sabeel Farm home" className="inline-block text-primary transition-opacity hover:opacity-80"><Logo className="h-[4.5rem] w-auto" /></Link>
          <p className="mt-5 max-w-xs font-display text-xl font-light leading-snug text-foreground/90">{t.slogan}</p>
          <div className="mt-6 flex items-center gap-2.5 text-primary">
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer" className="grid size-10 place-items-center rounded-full border border-border/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground">{s.icon}</a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8 lg:ps-10">
          <div>
            <h3 className={heading}>{f.explore}</h3>
            <div className="flex flex-col items-start gap-3">
              {[0, 1].map((i) => <NavItem key={i} i={i} label={t.nav[i]} className={link} />)}
            </div>
          </div>
          <div>
            <h3 className={heading}>{f.shop}</h3>
            <div className="flex flex-col items-start gap-3">
              {catsLoading ? <LoadingSpinner /> : categories.map((c) => <Link key={c.id} to="/services" className={link}>{lang === 'ar' ? c.category_name_ar : c.category_name}</Link>)}
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h3 className={heading}>{f.company}</h3>
            <div className="flex flex-col items-start gap-3">
              {[1, 2, 3, 4].map((i) => <NavItem key={i} i={i} label={t.nav[i]} className={link} />)}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 flex flex-col-reverse items-center gap-4 border-t border-border/60 pt-6 sm:flex-row sm:justify-between">
        <p className="text-[11px] text-muted-foreground">{rights}</p>
        <div className="flex items-center gap-5">
          <p className="flex items-center gap-2 text-[11px] text-muted-foreground">{t.tax}<span className="text-primary">694-357-944</span></p>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label={f.top} className="grid size-9 place-items-center rounded-full border border-border/70 text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground"><ArrowUp className="size-4" /></button>
        </div>
      </div>
    </div>
  </footer>;
}