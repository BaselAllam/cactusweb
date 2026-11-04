import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { ReviewsModel } from "@/services/ProductsServices";

const ui = {
  en: { title: "CUSTOMER REVIEWS", sub: "What our customers say", prev: "Previous review", next: "Next review", loading: "Loading…", error: "We couldn't load reviews.", reviews: "reviews", anonymous: "Customer" },
  ar: { title: "آراء العملاء", sub: "ماذا يقول عملاؤنا", prev: "التقييم السابق", next: "التقييم التالي", loading: "جارٍ التحميل…", error: "تعذر تحميل التقييمات.", reviews: "تقييم", anonymous: "عميل" },
};

const AUTOPLAY_MS = 7000;

function Stars({ value, className = "size-4" }: { value: number; className?: string }) {
  const rounded = Math.round(value);
  return (
    <span className="flex items-center gap-0.5" role="img" aria-label={`${value} / 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`${className} ${n <= rounded ? "fill-primary text-primary" : "text-border"}`} />
      ))}
    </span>
  );
}

export default function ProductReviews({ reviews, isLoading, isError }: { reviews?: ReviewsModel[]; isLoading?: boolean; isError?: boolean }) {
  const { lang, dir } = useLang();
  const t = ui[lang];
  const locale = lang === "ar" ? "ar-EG" : "en-US";
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const list = reviews ?? [];
  const total = list.length;
  const current = total ? list[index % total] : undefined;
  const average = total ? list.reduce((s, r) => s + (r.rate ?? 0), 0) / total : 0;

  const Prev = dir === "rtl" ? ArrowRight : ArrowLeft;
  const Next = dir === "rtl" ? ArrowLeft : ArrowRight;
  const step = (d: number) => setIndex((i) => (i + d + total) % total);

  useEffect(() => {
    if (paused || total < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, total, index]);

  const reviewerName = (r: ReviewsModel) => {
    const u = r.user;
    const name = [u?.first_name, u?.last_name].filter(Boolean).join(" ").trim();
    return name || t.anonymous;
  };

  const formatDate = (d?: string) => {
    if (!d) return "";
    const date = new Date(d);
    return isNaN(date.getTime()) ? "" : date.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
  };

  if (!isLoading && !isError && !total) return null;

  return (
    <section className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
      <div className="mb-8 flex items-center justify-center gap-4">
        <span className="h-px w-12 bg-primary/70" />
        <h2 className="font-display text-xl uppercase text-primary sm:text-2xl">{t.title}</h2>
        <span className="h-px w-12 bg-primary/70" />
      </div>

      {isLoading && <p className="py-10 text-center text-sm text-muted-foreground">{t.loading}</p>}
      {isError && !isLoading && <p className="py-10 text-center text-sm text-muted-foreground">{t.error}</p>}

      {current && (
        <div
          className="rounded-sm border border-border bg-card px-6 py-8 text-center sm:px-12 sm:py-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* Summary */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl leading-none text-foreground">{average.toLocaleString(locale, { maximumFractionDigits: 1, minimumFractionDigits: 1 })}</span>
              <span className="text-xs text-muted-foreground">/ {(5).toLocaleString(locale)}</span>
            </div>
            <Stars value={average} className="size-5" />
            <p className="text-xs text-muted-foreground">{total.toLocaleString(locale)} {t.reviews}</p>
          </div>

          <span className="my-6 mx-auto block h-px w-16 bg-border" />

          {/* Slide — fixed min-height prevents layout jumping between reviews */}
          <div key={current.id} aria-live="polite" className="tayeb-fade flex min-h-[10rem] flex-col items-center justify-center sm:min-h-[8.5rem]">
            <blockquote className="max-w-xl text-base leading-8 text-foreground sm:text-lg sm:leading-9">
              <span aria-hidden className="text-primary/60">“</span>
              {current.review}
              <span aria-hidden className="text-primary/60">”</span>
            </blockquote>
            <footer className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <Stars value={current.rate} className="size-3.5" />
              <span className="h-3 w-px bg-border" />
              <span className="font-medium uppercase tracking-widest text-foreground">{reviewerName(current)}</span>
              {formatDate(current.created_at) && <>
                <span className="h-3 w-px bg-border" />
                <time dateTime={current.created_at}>{formatDate(current.created_at)}</time>
              </>}
            </footer>
          </div>

          {/* Controls */}
          {total > 1 && (
            <div className="mt-8 flex items-center justify-center gap-5">
              <button type="button" aria-label={t.prev} onClick={() => step(-1)}
                className="grid size-10 place-items-center rounded-full border border-border text-primary transition hover:border-primary hover:bg-primary/10">
                <Prev className="size-4" />
              </button>
              <div className="flex max-w-[10rem] flex-wrap items-center justify-center gap-1.5">
                {list.slice(0, 8).map((r, i) => (
                  <button key={r.id} type="button" aria-label={`${i + 1}`} onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${i === index % Math.min(total, 8) ? "w-5 bg-primary" : "w-1.5 bg-border hover:bg-primary/50"}`} />
                ))}
              </div>
              <button type="button" aria-label={t.next} onClick={() => step(1)}
                className="grid size-10 place-items-center rounded-full border border-border text-primary transition hover:border-primary hover:bg-primary/10">
                <Next className="size-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}