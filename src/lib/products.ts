import beans from "@/assets/beans.jpg";
import bag from "@/assets/bag.jpg";
import cherry from "@/assets/cherry.jpg";
import pour from "@/assets/pour.jpg";

export type Product = {
  id: string;
  name: string;
  origin: string;
  process: string;
  altitude: string;
  notes: string[];
  roast: "فاتحة" | "متوسطة" | "داكنة";
  price: number;
  weight: string;
  image: string;
  story: string;
};

export const products: Product[] = [
  {
    id: "yirgacheffe",
    name: "يرغاتشيف",
    origin: "إثيوبيا · كوتشيري",
    process: "مغسولة",
    altitude: "٢٠٥٠ م",
    notes: ["ياسمين", "بيرغموت", "شاي أسود"],
    roast: "فاتحة",
    price: 22,
    weight: "٢٥٠ غ",
    image: beans,
    story: "من مرتفعات كوتشيري، حبة رقيقة تفتح على رائحة الياسمين ثم تهدأ في نفس من بيرغموت. نحمصها فاتحة لنبقي الضوء داخلها.",
  },
  {
    id: "sidra",
    name: "سدرة",
    origin: "كولومبيا · هويلا",
    process: "لاهوائية",
    altitude: "١٨٠٠ م",
    notes: ["فراولة ناضجة", "كاكاو", "عسل"],
    roast: "متوسطة",
    price: 26,
    weight: "٢٥٠ غ",
    image: bag,
    story: "تخمير لاهوائي بطيء يعيد رسم الحلاوة. الفراولة أولا، ثم يهبط الكاكاو كخلفية دافئة.",
  },
  {
    id: "geisha",
    name: "غيشا",
    origin: "بنما · بوكيته",
    process: "طبيعية",
    altitude: "١٦٥٠ م",
    notes: ["ليمون", "زهر البرتقال", "عسل أبيض"],
    roast: "فاتحة",
    price: 42,
    weight: "١٥٠ غ",
    image: cherry,
    story: "غيشا لا تحتاج تعريفا. جرعة صغيرة تكفي لتذكرك لماذا نصحو مبكرا.",
  },
  {
    id: "harrar",
    name: "هرر",
    origin: "إثيوبيا · هرر الشرقية",
    process: "طبيعية",
    altitude: "١٩٠٠ م",
    notes: ["توت أزرق", "نبيذ", "كاكاو داكن"],
    roast: "متوسطة",
    price: 24,
    weight: "٢٥٠ غ",
    image: pour,
    story: "قهوة لها ذاكرة. توت داكن يذوب في نبيذ خفيف، وينتهي بكاكاو يبقى على اللسان.",
  },
  {
    id: "house",
    name: "خلطة البيت",
    origin: "البرازيل + إثيوبيا",
    process: "مزيج",
    altitude: "١٤٠٠ – ١٩٠٠ م",
    notes: ["شوكولاتة حليب", "بندق", "كراميل"],
    roast: "داكنة",
    price: 18,
    weight: "٢٥٠ غ",
    image: bag,
    story: "خلطتنا اليومية. كثيفة كحليب ساخن، مؤنسة كأصدقاء قدماء.",
  },
  {
    id: "decaf",
    name: "منزوعة الكافيين",
    origin: "كولومبيا · سويسرية الماء",
    process: "منزوعة بالماء",
    altitude: "١٧٠٠ م",
    notes: ["كراميل", "لوز", "تمر"],
    roast: "متوسطة",
    price: 20,
    weight: "٢٥٠ غ",
    image: beans,
    story: "لأولئك الذين يريدون الطقس دون الحماس. حلاوة تمر ولوز بلا سهر طويل.",
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const menu = {
  espresso: [
    { name: "إسبريسو", ar: "جرعة مركزة", price: 3 },
    { name: "دوبيو", ar: "جرعتان", price: 4 },
    { name: "ماكياتو", ar: "قطرة حليب", price: 4 },
    { name: "كورتادو", ar: "توازن الحليب والقهوة", price: 5 },
    { name: "كابتشينو", ar: "رغوة كثيفة", price: 6 },
    { name: "لاتيه", ar: "حليب دافئ", price: 6 },
    { name: "فلات وايت", ar: "حليب مخملي", price: 6 },
    { name: "موكا", ar: "شوكولاتة داكنة", price: 7 },
  ],
  brew: [
    { name: "في ٦٠ (V60)", ar: "تقطير يدوي، فنجان واحد", price: 8 },
    { name: "كيمكس", ar: "لثلاثة فناجين", price: 14 },
    { name: "أيروبريس", ar: "مركز نظيف", price: 7 },
    { name: "قهوة باردة (Cold Brew)", ar: "منقوعة ١٦ ساعة", price: 8 },
    { name: "إسبريسو تونيك", ar: "منعش صيفي", price: 9 },
  ],
  food: [
    { name: "كرواسان زبدة", ar: "من فرننا اليومي", price: 5 },
    { name: "بان أو شوكولا", ar: "شوكولاتة داكنة ٧٠٪", price: 6 },
    { name: "كيك التمر واللوز", ar: "بدون سكر مضاف", price: 7 },
    { name: "توست الأفوكادو", ar: "خبز حامض، ليمون، فلفل", price: 12 },
    { name: "بيض مسلوق برفق", ar: "مع خبز الشعير", price: 10 },
  ],
};
