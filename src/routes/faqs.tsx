import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircleQuestion, Search } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { SiteFooter, SiteHeader } from "@/components/layout/SiteChrome";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero.jpg";
import SeoHelmet from "@/seo/SeoHelmet";
import { useFaqs } from "@/hooks/useSiteData";
import LoadingSpinner from "@/components/LoadingSpinner";
import { FAQModel } from "@/services/CoreServices";

const copy = {
  en: {
    eyebrow: "FAQs", title: "Good Questions,\nHonest Answers", sub: "Everything you might want to know before — and after — your first order arrives.",
    search: "Search questions...", noResults: "No FAQs found matching your search.", noFaqs: "No questions have been added yet.", loadError: "We couldn't load the FAQs. Please try again later.",
    general: "General",
    still: "Still have a question?", stillSub: "Our team is happy to help you choose the right products.", ask: "Contact us",
  },
  ar: {
    eyebrow: "الأسئلة الشائعة", title: "أسئلتكم\nوإجاباتنا الصادقة", sub: "كل الي ممكن تحب تعرفه قبل ما أول طلب يوصلك وبعده.",
    search: "ابحث في الأسئلة...", noResults: "مفيش أسئلة بتطابق بحثك.", noFaqs: "لسه مفيش أسئلة اتضافت.", loadError: "مقدرناش نحمّل الأسئلة. جرّب تاني بعد شوية.",
    general: "عام",
    still: "لسه عندك سؤال؟", stillSub: "فريقنا يسعده يساعدك تختار المنتجات المناسبة ليك.", ask: "تواصل معنا",
  },
};

export default function FaqsPage() {
  const { lang, dir } = useLang();
  const t = copy[lang];
  const { data, isLoading, error } = useFaqs();
  const faqs = (data ?? []) as FAQModel[];
  const [query, setQuery] = useState("");

  const title = (f: FAQModel) => (lang === "ar" && f.faq_title_ar) || f.faq_title;
  const description = (f: FAQModel) => (lang === "ar" && f.faq_description_ar) || f.faq_description;

  const categories = useMemo(() => {
    const groups = faqs.reduce<Record<string, FAQModel[]>>((acc, faq) => {
      const name = faq.faq_type || t.general;
      (acc[name] ||= []).push(faq);
      return acc;
    }, {});
    const q = query.trim().toLowerCase();
    return Object.entries(groups)
      .map(([name, items]) => ({
        name,
        faqs: q
          ? items.filter((f) => [f.faq_title, f.faq_title_ar, f.faq_description, f.faq_description_ar].some((s) => s?.toLowerCase().includes(q)))
          : items,
      }))
      .filter((c) => c.faqs.length > 0);
  }, [faqs, query, t.general]);

  return <main dir={dir} className="min-h-screen bg-background text-foreground parchment">
    <SeoHelmet page="faq" lang={lang} />
    <SiteHeader />

    <section className="relative overflow-hidden border-b border-border">
      <img src={hero} alt="" className="absolute inset-0 size-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      <div className="animate-rise relative mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <p className="mb-4 text-xs uppercase tracking-[0.28em] text-primary">{t.eyebrow}</p>
        <h1 className="whitespace-pre-line font-display text-5xl leading-none sm:text-7xl">{t.title}</h1>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-muted-foreground">{t.sub}</p>

        {/* Search */}
        <div className="relative mx-auto mt-10 max-w-md">
          <Search className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-primary" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search}
            aria-label={t.search}
            className="w-full border border-border bg-background/80 py-3.5 pe-4 ps-11 text-sm outline-none backdrop-blur transition focus:border-primary"
          />
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <p role="alert" className="py-12 text-center text-sm text-destructive">{t.loadError}</p>
      ) : categories.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">{faqs.length === 0 ? t.noFaqs : t.noResults}</p>
      ) : (
        categories.map((category) => (
          <div key={category.name} className="mb-10 last:mb-0">
            <h2 className="mb-5 flex items-center gap-3 font-display text-2xl text-primary sm:text-3xl"><span className="h-px w-8 bg-primary/70" />{category.name}</h2>
            <Accordion type="single" collapsible className="border-t border-border">
              {category.faqs.map((faq) => (
                <AccordionItem key={faq.id} value={String(faq.id)} className="border-border">
                  <AccordionTrigger className="gap-4 py-5 text-start text-sm font-medium leading-6 hover:text-primary hover:no-underline sm:text-base">{title(faq)}</AccordionTrigger>
                  <AccordionContent className="whitespace-pre-line pb-5 text-sm leading-8 text-muted-foreground">{description(faq)}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))
      )}
    </section>

    <section className="border-t border-border bg-secondary/40 px-5 py-16 text-center sm:py-20">
      <MessageCircleQuestion className="mx-auto mb-4 size-8 text-primary" />
      <h2 className="font-display text-3xl sm:text-4xl">{t.still}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">{t.stillSub}</p>
      <Button asChild variant="luxury" size="lg" className="mt-8"><Link to="/contact">{t.ask}</Link></Button>
    </section>
    <SiteFooter />
  </main>;
}