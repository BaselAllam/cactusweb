import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { SiteFooter, SiteHeader } from "@/components/layout/SiteChrome";
import { Button } from "@/components/ui/button";
import SeoHelmet from '@/seo/SeoHelmet';
import { toast } from "@/hooks/use-toast";
import { submitContactUs } from "@/services/CoreServices";
import PhoneInput from "@/components/PhoneInput";

const copy = {
  en: {
    eyebrow: "Contact Us", title: "We'd love to hear from you", sub: "Questions about a product, an order or a gift? Send us a message.",
    name: "Full name", email: "Email", phone: "Phone (optional)", subject: "Subject (optional)", message: "Message", send: "Send message", sending: "Sending...",
    required: "This field is required", badEmail: "Enter a valid email", badPhone: "Enter a valid phone number", tooLong: "Too long",
    failed: "Something went wrong. Please try again.", thanks: "Thank you!", thanksSub: "Your message has been sent.", another: "Send another message",
    success: "Success", sorry: "Sorry", toastThanks: "Thanks for contacting Sabeel Farm. We'll get back to you soon.",
    info: [["Address", "Shorouk City, Cairo, Egypt"], ["Phone", "+20 10 1143 8199"], ["Email", "info@sabeelfarm.com"], ["Hours", "Sat – Thu, 10am – 10pm"]],
  },
  ar: {
    eyebrow: "تواصل معنا", title: "يسعدنا نسمع منك", sub: "عندك سؤال عن منتج أو طلب أو هدية؟ ابعتلنا رسالة.",
    name: "الاسم بالكامل", email: "البريد الإلكتروني", phone: "الهاتف (اختياري)", subject: "الموضوع (اختياري)", message: "الرسالة", send: "ابعت الرسالة", sending: "جارٍ الإرسال...",
    required: "الحقل ده مطلوب", badEmail: "اكتب بريد إلكتروني صحيح", badPhone: "اكتب رقم هاتف صحيح", tooLong: "النص طويل أوي",
    failed: "حصلت مشكلة. جرّب تاني.", thanks: "شكراً ليك!", thanksSub: "رسالتك وصلتنا.", another: "ابعت رسالة تانية",
    success: "تم بنجاح", sorry: "معلش", toastThanks: "شكراً لتواصلك مع مزرعة سبيل، هنرد عليك قريب.",
    info: [["العنوان", "مدينة الشروق، القاهرة، مصر"], ["الهاتف", "+20 10 1143 8199"], ["البريد", "info@sabeelfarm.com"], ["المواعيد", "السبت – الخميس، 10 ص – 10 م"]],
  },
};

type Field = "name" | "email" | "phone" | "subject" | "message";
const empty: Record<Field, string> = { name: "", email: "", phone: "", subject: "", message: "" };
const icons = [MapPin, Phone, Mail, Clock];

export default function ContactPage() {
  const { lang, dir } = useLang();
  const t = copy[lang];
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const schema = z.object({
    name: z.string().trim().min(1, t.required).max(100, t.tooLong),
    email: z.string().trim().min(1, t.required).email(t.badEmail).max(255, t.tooLong),
    // Allows formatting characters that phone inputs often add: ( ) . -
    phone: z.string().trim().max(25, t.tooLong).refine((v) => !v || /^\+?[0-9\s().-]{8,25}$/.test(v), t.badPhone),
    subject: z.string().trim().max(150, t.tooLong),
    message: z.string().trim().min(1, t.required).max(2000, t.tooLong),
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Partial<Record<Field, string>> = {};
      for (const issue of r.error.issues) { const k = issue.path[0] as Field; if (!errs[k]) errs[k] = issue.message; }
      setErrors(errs);
      return;
    }
    setErrors({});
    setErrorMessage("");
    setStatus("sending");
    try {
      const res = await submitContactUs({
        full_name: r.data.name,
        user_email: r.data.email,
        user_phone: r.data.phone,
        subject: r.data.subject,
        message: r.data.message,
      });

      if (res.status === 201) {
        toast({ title: t.success, description: t.toastThanks });
        setForm(empty);
        setStatus("sent");
      } else {
        throw new Error(t.failed);
      }
    } catch (err: any) {
      const apiErrors = err?.response?.data?.data;
      const message = apiErrors ? Object.values(apiErrors).flat().join(", ") : err?.message || t.failed;
      toast({ title: t.sorry, description: `${message}`, variant: "destructive" });
      setErrorMessage(String(message));
      setStatus("error");
    }
  }

  const update = (k: Field, value: string) => {
    setForm((f) => ({ ...f, [k]: value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
    if (status === "error") setStatus("idle");
  };

  const input = "w-full border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary disabled:opacity-60";
  const field = (k: Field, label: string, type = "text") => <label className="block"><span className="mb-2 block text-xs text-muted-foreground">{label}</span>
    {k === "message"
      ? <textarea rows={6} value={form[k]} onChange={(e) => update(k, e.target.value)} className={input} maxLength={2000} disabled={status === "sending"} />
      : <input type={type} value={form[k]} onChange={(e) => update(k, e.target.value)} className={input} disabled={status === "sending"} dir={type === "email" || type === "tel" ? "ltr" : undefined} />}
    {errors[k] && <span className="mt-1 block text-xs text-destructive">{errors[k]}</span>}</label>;

  return <main dir={dir} className="min-h-screen bg-background text-foreground parchment">
    <SeoHelmet page="contact" lang={lang} />
    <SiteHeader/>
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
      <div className="animate-rise mb-12 text-center"><p className="mb-3 text-xs uppercase tracking-[0.28em] text-primary">{t.eyebrow}</p><h1 className="font-display text-4xl sm:text-6xl">{t.title}</h1><p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted-foreground">{t.sub}</p></div>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <aside className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:content-start">
          {t.info.map(([label, value], i) => { const Icon = icons[i] ?? Mail; return <div key={label} className="flex items-start gap-4 border border-border bg-card p-5"><Icon className="size-5 shrink-0 text-primary"/><div><p className="text-xs uppercase tracking-wider">{label}</p><p className="mt-1 text-sm text-muted-foreground" dir={i === 1 ? "ltr" : undefined}>{value}</p></div></div>; })}
        </aside>
        <div className="border border-border bg-card p-6 sm:p-8">
          {status === "sent" ? <div className="py-12 text-center"><CheckCircle2 className="mx-auto size-12 text-primary"/><h2 className="mt-4 font-display text-3xl">{t.thanks}</h2><p className="mt-2 text-sm text-muted-foreground">{t.thanksSub}</p><Button variant="luxury" className="mt-8" onClick={() => setStatus("idle")}>{t.another}</Button></div>
          : <form onSubmit={submit} noValidate className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">{field("name", t.name)}{field("email", t.email, "email")}</div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="block">
                <span className="mb-2 block text-xs text-muted-foreground">{t.phone}</span>
                <div
                  dir="ltr"
                  className="
                    [&_input]:h-auto [&_input]:w-full [&_input]:rounded-none [&_input]:border [&_input]:border-border
                    [&_input]:bg-background [&_input]:px-4 [&_input]:py-3 [&_input]:text-sm [&_input]:text-foreground
                    [&_input]:shadow-none [&_input]:outline-none [&_input]:ring-0 [&_input]:transition
                    [&_input:focus]:border-primary [&_input:disabled]:opacity-60
                    [&_button]:rounded-none [&_button]:border-border [&_button]:bg-background [&_button]:shadow-none
                  "
                >
                  <PhoneInput
                    value={form.phone}
                    onChange={(value) => update("phone", value)}
                    placeholder="+20 10 1234 5678"
                    required={true}
                    showFlag={true}
                  />
                </div>
                {errors.phone && <span className="mt-1 block text-xs text-destructive">{errors.phone}</span>}
              </div>
              {field("subject", t.subject)}
            </div>
            {field("message", t.message)}
            {status === "error" && <p role="alert" className="text-sm text-destructive">{errorMessage || t.failed}</p>}
            <Button type="submit" variant="luxury" size="lg" disabled={status === "sending"} className="w-full sm:w-auto sm:justify-self-start">{status === "sending" ? t.sending : t.send}</Button>
          </form>}
        </div>
      </div>
    </section>
    <SiteFooter/>
  </main>;
}