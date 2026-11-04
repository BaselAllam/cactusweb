import { Baby, Dna, Mars, Sprout, Stethoscope, Trees, Users, Venus, Warehouse, Trophy, GraduationCap, Home, type LucideIcon } from "lucide-react";
import hero from "@/assets/hero.jpeg";
import children from "@/assets/children.jpg";
import adult from "@/assets/adults.jpg";
import women from "@/assets/women.jpg";
import men from "@/assets/men.jpg";
import { useState } from "react";

export const WHATSAPP_NUMBER = "+201115857997";

export type Lang = "en" | "ar";

type Localized = {
  name: string;
  tagline: string;
  description: string;
  points: string[];
  benefits: string[];
  facts: [label: string, value: string][];
};

export type CategoryKey = "training" | "boarding" | "breeding";

export type Service = {
  slug: string;
  category: CategoryKey;
  icon: LucideIcon;
  image?: string;
  en: Localized;
  ar: Localized;
};

export type Category = {
  key: CategoryKey;
  icon: LucideIcon;
  en: { title: string; sub: string };
  ar: { title: string; sub: string };
};

export const heroImage = hero;
export const childrenImage = children;
export const adultImage = adult;
export const womenImage = women;
export const menImage = men;

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const categories: Category[] = [
  {
    key: "training",
    icon: GraduationCap,
    en: { title: "Training Services", sub: "Riding programs for every age and level." },
    ar: { title: "خدمات التدريب", sub: "برامج ركوب لكل الأعمار والمستويات." },
  },
  {
    key: "boarding",
    icon: Home,
    en: { title: "Boarding Services", sub: "A safe, comfortable home for your horse, with daily professional care." },
    ar: { title: "خدمات الإيواء", sub: "مكان آمن ومريح لحصانك مع رعاية يومية احترافية." },
  },
  {
    key: "breeding",
    icon: Dna,
    en: { title: "Breeding & Production Services", sub: "Responsible breeding and horse production, from mare to foal." },
    ar: { title: "خدمات التربية والإنتاج", sub: "تربية وإنتاج خيول بمسؤولية، من الفرس حتى المهر." },
  },
];

export const services: Service[] = [
  // ───────────── Training ─────────────
  {
    slug: "children-training",
    category: "training",
    icon: Baby,
    image: childrenImage,
    en: {
      name: "Children’s Training",
      tagline: "Fun, safe first steps",
      description:
        "A gentle introduction to horses for young riders. Sessions are playful and patient, so children build trust with the horse before they build skill.",
      points: ["Meeting and grooming the horse", "Safe mounting and balance basics", "Small groups with close supervision", "Helmets and safety gear included"],
      benefits: ["Builds confidence and responsibility", "Improves balance and coordination", "Teaches kindness and patience with animals"],
      facts: [["Ages", "5 to 14"], ["Session", "45 minutes"], ["Format", "Small group or private"]],
    },
    ar: {
      name: "تدريب الأطفال",
      tagline: "خطوات أولى ممتعة وآمنة",
      description: "مقدمة لطيفة لعالم الخيول للفرسان الصغار. الحصص مرحة وهادئة، فيبني الطفل الثقة مع الحصان قبل أن يبني المهارة.",
      points: ["التعرف على الحصان والعناية به", "أساسيات الركوب الآمن والتوازن", "مجموعات صغيرة وإشراف مباشر", "الخوذة ومعدات الأمان متوفرة"],
      benefits: ["ينمّي الثقة والمسؤولية", "يحسّن التوازن والتناسق الحركي", "يعلّم اللطف والصبر مع الحيوانات"],
      facts: [["الأعمار", "من 5 إلى 14 سنة"], ["مدة الحصة", "45 دقيقة"], ["النظام", "مجموعة صغيرة أو فردي"]],
    },
  },
  {
    slug: "adult-training",
    category: "training",
    icon: Users,
    image: adultImage,
    en: {
      name: "Adult Training",
      tagline: "Confidence and connection",
      description:
        "Whether you’re starting from zero or returning to the saddle, we help you ride with confidence and build a real connection with your horse.",
      points: ["Beginner to advanced levels", "Posture, balance and control", "Walk, trot and canter progression", "Flexible weekday and weekend slots"],
      benefits: ["A calm break from screens and stress", "Full-body fitness and core strength", "Steady, measurable progress"],
      facts: [["Ages", "18 and above"], ["Session", "60 minutes"], ["Format", "Private or group"]],
    },
    ar: {
      name: "تدريب الكبار",
      tagline: "ثقة وتواصل مع الحصان",
      description: "سواء بدأت من الصفر أو عدت إلى السرج بعد انقطاع، نساعدك على الركوب بثقة وبناء علاقة حقيقية مع حصانك.",
      points: ["مستويات من المبتدئ إلى المتقدم", "وضعية الجسم والتوازن والتحكم", "التدرج بين المشي والخبب والعدو", "مواعيد مرنة خلال الأسبوع ونهايته"],
      benefits: ["استراحة هادئة بعيداً عن الشاشات والضغط", "لياقة بدنية وقوة في عضلات الجذع", "تقدم ثابت يمكن قياسه"],
      facts: [["الأعمار", "18 سنة فأكثر"], ["مدة الحصة", "60 دقيقة"], ["النظام", "فردي أو مجموعة"]],
    },
  },
  {
    slug: "womens-training",
    category: "training",
    icon: Venus,
    image: womenImage,
    en: {
      name: "Women’s Training",
      tagline: "Dedicated female trainers",
      description:
        "A comfortable, women-only setting led by female trainers, so you can learn and progress at your own pace.",
      points: ["Female trainers only", "Women-only sessions", "Beginner to advanced programs", "Relaxed, supportive atmosphere"],
      benefits: ["A private, comfortable environment", "Coaching that moves at your pace", "A community of women riders"],
      facts: [["Ages", "16 and above"], ["Session", "60 minutes"], ["Format", "Private or women-only group"]],
    },
    ar: {
      name: "تدريب السيدات",
      tagline: "مدربات متخصصات",
      description: "أجواء مريحة خاصة بالسيدات بقيادة مدربات، لتتعلمي وتتقدمي بالسرعة التي تناسبك.",
      points: ["مدربات فقط", "حصص خاصة بالسيدات", "برامج من المبتدئ إلى المتقدم", "أجواء هادئة وداعمة"],
      benefits: ["بيئة خاصة ومريحة", "تدريب يسير بالسرعة التي تناسبك", "مجتمع من الفارسات"],
      facts: [["الأعمار", "16 سنة فأكثر"], ["مدة الحصة", "60 دقيقة"], ["النظام", "فردي أو مجموعة للسيدات"]],
    },
  },
  {
    slug: "mens-training",
    category: "training",
    icon: Mars,
    image: menImage,
    en: {
      name: "Men’s Training",
      tagline: "Expert, personal guidance",
      description:
        "Focused one-on-one coaching that meets you at your level and builds real riding skill, from fundamentals to advanced technique.",
      points: ["Personal coaching plan", "Fundamentals to advanced technique", "Clear feedback every session", "Flexible scheduling"],
      benefits: ["Direct, practical coaching", "Faster progress through personal plans", "Strength, balance and focus"],
      facts: [["Ages", "16 and above"], ["Session", "60 minutes"], ["Format", "Private or group"]],
    },
    ar: {
      name: "تدريب الرجال",
      tagline: "إرشاد شخصي من خبراء",
      description: "تدريب مركّز يناسب مستواك ويبني مهارة ركوب حقيقية، من الأساسيات إلى التقنيات المتقدمة.",
      points: ["خطة تدريب شخصية", "من الأساسيات إلى التقنيات المتقدمة", "ملاحظات واضحة في كل حصة", "مواعيد مرنة"],
      benefits: ["تدريب مباشر وعملي", "تقدم أسرع بخطط شخصية", "قوة وتوازن وتركيز"],
      facts: [["الأعمار", "16 سنة فأكثر"], ["مدة الحصة", "60 دقيقة"], ["النظام", "فردي أو مجموعة"]],
    },
  },

  // ───────────── Boarding ─────────────
  {
    slug: "full-boarding",
    category: "boarding",
    icon: Warehouse,
    en: {
      name: "Full Boarding",
      tagline: "Your horse, fully cared for",
      description:
        "A clean, spacious stall and complete daily care for your horse, so you can enjoy riding without the daily workload.",
      points: ["Spacious, clean stalls", "Quality feed and fresh water", "Daily cleaning and bedding", "Round-the-clock supervision"],
      benefits: ["Peace of mind while you are away", "Consistent routine for your horse", "Ready to ride whenever you visit"],
      facts: [["Stall", "Private box"], ["Care", "Daily, full service"], ["Term", "Monthly"]],
    },
    ar: {
      name: "الإيواء الكامل",
      tagline: "حصانك في رعاية كاملة",
      description: "اسطبل نظيف وواسع مع رعاية يومية متكاملة لحصانك، لتستمتع بالركوب دون عبء المتابعة اليومية.",
      points: ["اسطبلات واسعة ونظيفة", "علف عالي الجودة ومياه نظيفة", "تنظيف وفرش يومي", "إشراف على مدار الساعة"],
      benefits: ["راحة بال أثناء غيابك", "روتين ثابت لحصانك", "جاهز للركوب كلما زرتنا"],
      facts: [["الاسطبل", "بوكس خاص"], ["الرعاية", "يومية وكاملة"], ["المدة", "شهري"]],
    },
  },
  {
    slug: "paddock-turnout",
    category: "boarding",
    icon: Trees,
    en: {
      name: "Paddock & Turnout",
      tagline: "Space to move and relax",
      description:
        "Daily time in open paddocks so your horse can move freely, socialise and stay happy and healthy.",
      points: ["Open, secure paddocks", "Daily turnout schedule", "Safe grouping by temperament", "Shade and fresh water"],
      benefits: ["Better physical and mental health", "Less stress and stable vices", "Natural movement every day"],
      facts: [["Turnout", "Daily"], ["Grouping", "By temperament"], ["Term", "Monthly"]],
    },
    ar: {
      name: "المراح والخروج اليومي",
      tagline: "مساحة للحركة والاسترخاء",
      description: "وقت يومي في مراحات مفتوحة ليتحرك حصانك بحرية ويختلط بغيره ويظل سعيداً وبصحة جيدة.",
      points: ["مراحات مفتوحة وآمنة", "جدول خروج يومي", "تجميع آمن حسب طباع الخيول", "ظل ومياه نظيفة"],
      benefits: ["صحة جسدية ونفسية أفضل", "توتر أقل وعادات سيئة أقل", "حركة طبيعية كل يوم"],
      facts: [["الخروج", "يومياً"], ["التجميع", "حسب الطباع"], ["المدة", "شهري"]],
    },
  },
  {
    slug: "health-care",
    category: "boarding",
    icon: Stethoscope,
    en: {
      name: "Health & Grooming Care",
      tagline: "Routine care that keeps horses well",
      description:
        "Regular grooming and health follow-up, with coordination of veterinary visits, farrier work and vaccinations.",
      points: ["Daily grooming and hoof checks", "Veterinary visit coordination", "Farrier and vaccination schedule", "Health records kept for each horse"],
      benefits: ["Early detection of health issues", "Healthy coat, hooves and condition", "Clear records you can follow"],
      facts: [["Grooming", "Daily"], ["Vet", "On schedule"], ["Records", "Per horse"]],
    },
    ar: {
      name: "الرعاية الصحية والعناية",
      tagline: "رعاية منتظمة تحافظ على صحة الخيل",
      description: "عناية وتنظيف منتظم ومتابعة صحية، مع تنسيق زيارات الطبيب البيطري والحدّاد والتطعيمات.",
      points: ["تنظيف يومي وفحص للحوافر", "تنسيق زيارات الطبيب البيطري", "جدول للحدّاد والتطعيمات", "سجل صحي لكل حصان"],
      benefits: ["اكتشاف مبكر للمشكلات الصحية", "شعر وحوافر ولياقة بحالة جيدة", "سجلات واضحة يمكنك متابعتها"],
      facts: [["العناية", "يومية"], ["الطبيب", "حسب الجدول"], ["السجل", "لكل حصان"]],
    },
  },

  // ───────────── Breeding & Production ─────────────
  {
    slug: "breeding-stud",
    category: "breeding",
    icon: Dna,
    en: {
      name: "Breeding & Stud Services",
      tagline: "Planned, responsible breeding",
      description:
        "Carefully planned breeding with attention to lineage, health and temperament, to produce strong, well-balanced foals.",
      points: ["Pairing based on lineage and health", "Veterinary checks before breeding", "Natural or assisted breeding", "Full breeding records"],
      benefits: ["Better chances of healthy foals", "Quality bloodlines preserved", "Professional guidance at every step"],
      facts: [["Method", "Natural or assisted"], ["Checks", "Veterinary"], ["Records", "Documented"]],
    },
    ar: {
      name: "خدمات التربية والتلقيح",
      tagline: "تربية مدروسة ومسؤولة",
      description: "تربية مخططة بعناية مع الاهتمام بالنسب والصحة والطباع، لإنتاج مهور قوية ومتوازنة.",
      points: ["اختيار الأزواج حسب النسب والصحة", "فحوصات بيطرية قبل التلقيح", "تلقيح طبيعي أو مساعد", "سجلات كاملة للتربية"],
      benefits: ["فرص أفضل لمهور سليمة", "الحفاظ على الأنساب الجيدة", "إرشاد احترافي في كل خطوة"],
      facts: [["الطريقة", "طبيعي أو مساعد"], ["الفحوصات", "بيطرية"], ["السجلات", "موثقة"]],
    },
  },
  {
    slug: "mare-foaling",
    category: "breeding",
    icon: Sprout,
    en: {
      name: "Mare Care & Foaling",
      tagline: "Safe care through pregnancy and birth",
      description:
        "Close monitoring and specialised care for mares during pregnancy, foaling and the first weeks afterwards.",
      points: ["Pregnancy monitoring and nutrition", "Supervised foaling", "Postnatal care for mare and foal", "Veterinary support on call"],
      benefits: ["Safer pregnancies and births", "Healthy start for the foal", "Constant attention when it matters"],
      facts: [["Monitoring", "Throughout pregnancy"], ["Foaling", "Supervised"], ["Vet", "On call"]],
    },
    ar: {
      name: "رعاية الفرس والولادة",
      tagline: "رعاية آمنة أثناء الحمل والولادة",
      description: "متابعة دقيقة ورعاية متخصصة للفرس أثناء الحمل والولادة والأسابيع الأولى بعدها.",
      points: ["متابعة الحمل والتغذية", "ولادة تحت الإشراف", "رعاية ما بعد الولادة للفرس والمهر", "دعم بيطري عند الحاجة"],
      benefits: ["حمل وولادة أكثر أماناً", "بداية صحية للمهر", "متابعة مستمرة في الوقت المهم"],
      facts: [["المتابعة", "طوال الحمل"], ["الولادة", "تحت الإشراف"], ["الطبيب", "عند الطلب"]],
    },
  },
  {
    slug: "foal-raising",
    category: "breeding",
    icon: Trophy,
    en: {
      name: "Foal Raising & Production",
      tagline: "From foal to a well-trained horse",
      description:
        "We raise foals with proper nutrition, handling and early training, producing calm, healthy horses ready for riding or sale.",
      points: ["Balanced nutrition and growth tracking", "Gentle handling from an early age", "Early groundwork and training", "Horses available for sale"],
      benefits: ["Calm, well-mannered young horses", "Strong foundation for future training", "Horses raised with known history"],
      facts: [["Handling", "From early age"], ["Training", "Step by step"], ["Sales", "Available"]],
    },
    ar: {
      name: "تربية المهور والإنتاج",
      tagline: "من مهر صغير إلى حصان مدرّب",
      description: "نربّي المهور بتغذية سليمة وتعامل لطيف وتدريب مبكر، لننتج خيولاً هادئة وصحية جاهزة للركوب أو البيع.",
      points: ["تغذية متوازنة ومتابعة النمو", "تعامل لطيف منذ سن مبكرة", "تدريب أرضي مبكر", "خيول متاحة للبيع"],
      benefits: ["خيول صغيرة هادئة ومهذبة", "أساس قوي للتدريب مستقبلاً", "خيول معروفة التاريخ والنشأة"],
      facts: [["التعامل", "من سن مبكرة"], ["التدريب", "خطوة بخطوة"], ["البيع", "متاح"]],
    },
  },
];

export const getService = (slug?: string) => services.find((s) => s.slug === slug);

type Props = { src?: string; alt: string; icon: LucideIcon; className?: string; eager?: boolean };

export default function ServiceImage({ src, alt, icon: Icon, className = "", eager }: Props) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return <div className={`grid place-items-center bg-gradient-to-br from-card to-secondary/40 text-primary ${className}`} role="img" aria-label={alt}>
      <Icon className="size-14 opacity-70" />
    </div>;
  }
  return <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}